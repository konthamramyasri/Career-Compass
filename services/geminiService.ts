
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, CareerPlan } from '../types';
import { CAREER_OPTIONS, EDUCATION_LEVELS, TIME_DEDICATIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getLabelFromValue(options: {value: string; label: string}[], value: string) {
    return options.find(o => o.value === value)?.label || value;
}

export async function generateCareerPlan(formData: FormData): Promise<CareerPlan> {
  const careerTitle = CAREER_OPTIONS.find(c => c.id === formData.careerInterest)?.title || formData.careerInterest;
  const educationLabel = getLabelFromValue(EDUCATION_LEVELS, formData.educationLevel);
  const timeLabel = getLabelFromValue(TIME_DEDICATIONS, formData.timeDedication);
  
  const prompt = `
    You are an expert career advisor named 'Career Compass Wizard'. A user has provided the following information:
    - Career Field of Interest: ${careerTitle}
    - Current Study Field: ${formData.studyField}
    - Current Education Level: ${educationLabel}
    - Academic Performance: ${formData.academicPerformance}
    - Specific Career Goal: ${formData.careerGoal}
    - Time dedicated to skill development: ${timeLabel}
    - Preferred Work Environment: ${formData.workEnvironment}
    - Current Skills: ${formData.currentSkills.join(', ') || 'None specified'}

    Based on this profile, generate a comprehensive and personalized career plan. The plan should be structured as a JSON object.
    1.  **summary**: Write a short, encouraging personalized summary for the user, referencing their inputs.
    2.  **jobRecommendations**: Recommend 3 specific job roles. For each, provide a description, required skills, top hiring companies, an estimated salary range, and growth outlook.
    3.  **learningPathway**: Create a detailed learning pathway broken down into logical phases based on their dedicated timeline (${timeLabel}). For each phase, provide a title, a brief description, and a list of specific tasks or learning goals.
    4.  **skillsToDevelop**: List the most important technical and soft skills the user should focus on developing.
    5.  **recommendedResources**: Suggest 6 diverse learning resources (e.g., specific online courses, books, platforms, communities). For each resource, provide a title, type (e.g., 'Course', 'Book'), platform (e.g., 'Coursera', 'O'Reilly'), a placeholder link ('#'), and a brief description.
    6.  **resumeTips**: Provide 5 actionable resume enhancement tips tailored to their career goal.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      jobRecommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            companies: { type: Type.ARRAY, items: { type: Type.STRING } },
            salary: { type: Type.STRING },
            growth: { type: Type.STRING },
          },
        },
      },
      learningPathway: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
      skillsToDevelop: { type: Type.ARRAY, items: { type: Type.STRING } },
      recommendedResources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            platform: { type: Type.STRING },
            link: { type: Type.STRING },
            description: { type: Type.STRING },
          },
        },
      },
      resumeTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as CareerPlan;
}
