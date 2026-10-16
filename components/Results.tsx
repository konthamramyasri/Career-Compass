import React, { useEffect } from 'react';
import type { CareerPlan } from '../types';
import { Icon } from './Icon';

interface ResultsProps {
  plan: CareerPlan;
  onStartOver: () => void;
}

const SkillBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">{children}</span>
);

export const Results: React.FC<ResultsProps> = ({ plan, onStartOver }) => {
  useEffect(() => {
    // Icons are rendered dynamically, so we need to re-run feather.
    if (window.feather) {
      window.feather.replace();
    }
  }, [plan]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fade-in visible">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2 sm:mb-0">Your Career Compass</h2>
        <div className="flex space-x-2 print:hidden">
            <button onClick={handlePrint} className="bg-white border border-indigo-600 text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors flex items-center">
                <Icon name="printer" className="h-4 w-4 mr-2" />
                Print
            </button>
            <button onClick={onStartOver} className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                <Icon name="refresh-cw" className="h-4 w-4 mr-2" />
                Start Over
            </button>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 mb-8 break-inside-avoid">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Icon name="user" className="h-5 w-5 mr-2" />
          Personalized Summary
        </h3>
        <p className="text-gray-700">{plan.summary}</p>
      </div>

      <div className="mb-8 break-inside-avoid">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Icon name="briefcase" className="h-5 w-5 mr-2" />
          Recommended Job Roles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(plan.jobRecommendations || []).map((job, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-indigo-700 mb-2">{job.title}</h4>
              <p className="text-gray-600 mb-3 text-sm">{job.description}</p>
              <div className="mb-3">
                <h5 className="font-medium text-gray-700 text-sm mb-1">Top Companies:</h5>
                <p className="text-gray-600 text-sm">{(job.companies || []).join(', ')}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-green-600">{job.salary}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 break-inside-avoid">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Icon name="map" className="h-5 w-5 mr-2" />
          Learning Pathway
        </h3>
        <div className="border-l-3 border-indigo-500 pl-6 ml-1.5">
          {(plan.learningPathway || []).map((phase, index) => (
            <div key={index} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-indigo-500 rounded-full"></div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">{phase.title}</h4>
              <p className="text-gray-600 mb-2">{phase.description}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {(phase.tasks || []).map((task, i) => <li key={i}>{task}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8 break-inside-avoid">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Icon name="award" className="h-5 w-5 mr-2" />
          Skills to Develop
        </h3>
        <div>
          {(plan.skillsToDevelop || []).map((skill, index) => <SkillBadge key={index}>{skill}</SkillBadge>)}
        </div>
      </div>

      <div className="mb-8 break-inside-avoid">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Icon name="book-open" className="h-5 w-5 mr-2" />
          Recommended Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(plan.recommendedResources || []).map((resource, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 pr-2">{resource.title}</h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded flex-shrink-0">{resource.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{resource.platform}</span>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View →</a>
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 break-inside-avoid">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
          <Icon name="file-text" className="h-5 w-5 mr-2" />
          Resume Enhancement Tips
        </h3>
        <ul className="space-y-2">
            {(plan.resumeTips || []).map((tip, index) => (
                <li key={index} className="text-yellow-800 flex items-start">
                    <Icon name="check-circle" className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                    <span>{tip}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};