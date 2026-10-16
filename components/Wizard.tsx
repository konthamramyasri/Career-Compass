
import React, { useState, useMemo, useEffect } from 'react';
import type { FormData, CareerField } from '../types';
import { CAREER_OPTIONS, SKILLS_DATA, EDUCATION_LEVELS, TIME_DEDICATIONS, WORK_ENVIRONMENTS } from '../constants';
import { Icon } from './Icon';

interface WizardProps {
  onSubmit: (formData: FormData) => void;
  error: string | null;
}

const TOTAL_STEPS = 5;

export const Wizard: React.FC<WizardProps> = ({ onSubmit, error }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    careerInterest: '' as CareerField,
    studyField: '',
    educationLevel: '',
    academicPerformance: '',
    careerGoal: '',
    timeDedication: '',
    workEnvironment: '',
    currentSkills: [],
  });
  
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // This is needed because some components might render icons dynamically
    if (window.feather) {
      window.feather.replace();
    }
  }, [currentStep, formData.careerInterest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newSkills = checked
        ? [...prev.currentSkills, value]
        : prev.currentSkills.filter(skill => skill !== value);
      return { ...prev, currentSkills: newSkills };
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.careerInterest) {
          setValidationError('Please select a career field.');
          return false;
        }
        break;
      case 2:
        if (!formData.studyField || !formData.educationLevel || !formData.academicPerformance) {
           setValidationError('Please fill in all education fields.');
           return false;
        }
        break;
      case 3:
        if (!formData.careerGoal || !formData.timeDedication || !formData.workEnvironment) {
          setValidationError('Please fill in all career goal fields.');
          return false;
        }
        break;
      default:
        break;
    }
    setValidationError(null);
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;
  
  const reviewSummary = useMemo(() => {
    if (currentStep !== 5) return [];
    return [
        { label: 'Career Field', value: CAREER_OPTIONS.find(c => c.id === formData.careerInterest)?.title || 'N/A' },
        { label: 'Study Field', value: formData.studyField },
        { label: 'Education Level', value: EDUCATION_LEVELS.find(e => e.value === formData.educationLevel)?.label || 'N/A' },
        { label: 'Academic Performance', value: formData.academicPerformance },
        { label: 'Career Goal', value: formData.careerGoal },
        { label: 'Time Dedication', value: TIME_DEDICATIONS.find(t => t.value === formData.timeDedication)?.label || 'N/A' },
        { label: 'Preferred Work Environment', value: formData.workEnvironment },
        { label: 'Selected Skills', value: formData.currentSkills.length > 0 ? formData.currentSkills.join(', ') : 'None selected' },
    ];
  }, [formData, currentStep]);


  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-2">Career Compass Wizard</h1>
      <p className="text-lg text-gray-700 mb-8">Your AI-powered guide to career success. Follow the wizard to generate your personalized career roadmap.</p>

      <div className="mb-8">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="flex justify-center mt-4 mb-8">
            {[...Array(TOTAL_STEPS)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full mx-2 transition-colors ${i + 1 <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {validationError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{validationError}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <div className={currentStep === 1 ? 'block' : 'hidden'}>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">What career field interests you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {CAREER_OPTIONS.map(option => (
              <div key={option.id}
                onClick={() => setFormData(prev => ({ ...prev, careerInterest: option.id }))}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.careerInterest === option.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'}`}>
                <div className="flex items-center">
                  <Icon name={option.icon} className="h-6 w-6 text-indigo-600 mr-3" />
                  <h3 className="font-semibold text-gray-800">{option.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={currentStep === 2 ? 'block' : 'hidden'}>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Tell us about your education</h2>
          <div className="space-y-6">
            <div>
              {/* FIX: Changed id and htmlFor to camelCase to match state key */}
              <label htmlFor="studyField" className="block text-gray-700 font-medium mb-2">What's your current study field?</label>
              <input type="text" id="studyField" value={formData.studyField} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. B.Tech CSE, MBA, etc." />
            </div>
            <div>
              {/* FIX: Changed id and htmlFor to camelCase to match state key */}
              <label htmlFor="educationLevel" className="block text-gray-700 font-medium mb-2">Current education level?</label>
              <select id="educationLevel" value={formData.educationLevel} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select your level</option>
                {EDUCATION_LEVELS.map(level => <option key={level.value} value={level.value}>{level.label}</option>)}
              </select>
            </div>
            <div>
              {/* FIX: Changed id and htmlFor to camelCase to match state key */}
              <label htmlFor="academicPerformance" className="block text-gray-700 font-medium mb-2">Academic Performance (GPA/Percentage)</label>
              <input type="text" id="academicPerformance" value={formData.academicPerformance} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. 3.5 or 85%" />
            </div>
          </div>
        </div>

        <div className={currentStep === 3 ? 'block' : 'hidden'}>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">What are your career goals?</h2>
            <div className="space-y-6">
                <div>
                    {/* FIX: Changed id and htmlFor to camelCase to match state key */}
                    <label htmlFor="careerGoal" className="block text-gray-700 font-medium mb-2">What's your specific career goal?</label>
                    <input type="text" id="careerGoal" value={formData.careerGoal} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Machine Learning Engineer, Cybersecurity Analyst" />
                </div>
                <div>
                    {/* FIX: Changed id and htmlFor to camelCase to match state key */}
                    <label htmlFor="timeDedication" className="block text-gray-700 font-medium mb-2">How much time can you dedicate to skill development?</label>
                    <select id="timeDedication" value={formData.timeDedication} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select duration</option>
                        {TIME_DEDICATIONS.map(time => <option key={time.value} value={time.value}>{time.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">What's your preferred work environment?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {WORK_ENVIRONMENTS.map(env => (
                             <div key={env.value} onClick={() => setFormData(prev => ({...prev, workEnvironment: env.value}))} className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-center ${formData.workEnvironment === env.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'}`}>
                                 <Icon name={env.icon} className="h-6 w-6 text-indigo-600 mb-2" />
                                 <h3 className="font-semibold text-gray-800 text-sm">{env.value}</h3>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        <div className={currentStep === 4 ? 'block' : 'hidden'}>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">What are your current skills?</h2>
            <p className="text-gray-600 mb-6">Select the skills you already have experience with from the list related to your chosen field:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {formData.careerInterest && SKILLS_DATA[formData.careerInterest] ? (
                    SKILLS_DATA[formData.careerInterest].map(skill => (
                        <div key={skill} className="flex items-center">
                            <input type="checkbox" id={`skill-${skill}`} value={skill} checked={formData.currentSkills.includes(skill)} onChange={handleSkillChange} className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                            <label htmlFor={`skill-${skill}`} className="ml-3 text-gray-700">{skill}</label>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">Please select a career interest in Step 1 to see relevant skills.</p>
                )}
            </div>
        </div>

        <div className={currentStep === 5 ? 'block' : 'hidden'}>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Review your information</h2>
            <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-indigo-800 mb-4">Your Career Profile</h3>
                <div className="space-y-3">
                    {reviewSummary.map(item => (
                        <div key={item.label} className="flex flex-col sm:flex-row justify-between">
                            <span className="font-medium text-gray-700">{item.label}:</span>
                            <span className="text-gray-900 text-left sm:text-right">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className={`bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors ${currentStep === 1 ? 'invisible' : 'visible'}`}>
                Back
            </button>
            {currentStep < TOTAL_STEPS ? (
                <button type="button" onClick={nextStep} className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                    Next
                </button>
            ) : (
                <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                    Generate Career Plan
                </button>
            )}
        </div>
      </form>
    </>
  );
};
