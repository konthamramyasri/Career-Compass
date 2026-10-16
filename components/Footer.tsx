
import React from 'react';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 print:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Icon name="compass" className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-lg font-bold">Career Compass Wizard</span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">AI-powered career guidance for students and professionals</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Career Compass Wizard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
