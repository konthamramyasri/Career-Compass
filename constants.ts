
import type { CareerField } from './types';

export const CAREER_OPTIONS: { id: CareerField; title: string; description: string; icon: string }[] = [
    { id: 'ai', title: 'AI/ML Engineering', description: 'Build intelligent systems and algorithms', icon: 'cpu' },
    { id: 'cyber', title: 'Cybersecurity', description: 'Protect systems and data from threats', icon: 'shield' },
    { id: 'software', title: 'Software Engineering', description: 'Develop applications and systems', icon: 'code' },
    { id: 'data', title: 'Data Science', description: 'Extract insights from complex data', icon: 'bar-chart-2' },
];

export const SKILLS_DATA: Record<CareerField, string[]> = {
    ai: ["Python", "Machine Learning", "Deep Learning", "Statistics", "Linear Algebra", "Data Structures", "TensorFlow/PyTorch", "Natural Language Processing", "Computer Vision"],
    cyber: ["Network Security", "Ethical Hacking", "Cryptography", "Risk Management", "Incident Response", "Security Frameworks", "Python Scripting", "Cloud Security", "Vulnerability Assessment"],
    software: ["Data Structures & Algorithms", "System Design", "Version Control (Git)", "Testing", "Agile Methodology", "Database Management", "Cloud Computing", "API Development", "Problem Solving"],
    data: ["Python/R", "SQL", "Statistics", "Data Visualization", "Machine Learning", "Data Wrangling", "A/B Testing", "Business Acumen", "Data Storytelling"],
};

export const EDUCATION_LEVELS = [
    { value: "highschool", label: "High School" },
    { value: "undergrad-1", label: "Undergraduate 1st Year" },
    { value: "undergrad-2", label: "Undergraduate 2nd Year" },
    { value: "undergrad-3", label: "Undergraduate 3rd Year" },
    { value: "undergrad-4", label: "Undergraduate 4th Year" },
    { value: "grad", label: "Graduate" },
    { value: "working", label: "Working Professional" },
];

export const TIME_DEDICATIONS = [
    { value: "6-months", label: "6 Months" },
    { value: "1-year", label: "1 Year" },
    { value: "2-years", label: "2 Years" },
    { value: "3-years", label: "3 Years" },
];

export const WORK_ENVIRONMENTS = [
    { value: "Remote", icon: "home" },
    { value: "Office", icon: "briefcase" },
    { value: "Hybrid", icon: "git-branch" },
    { value: "International", icon: "globe" },
];
