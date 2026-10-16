
import React from 'react';
import { Icon } from './Icon';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Icon name="compass" className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Career Compass Wizard</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
