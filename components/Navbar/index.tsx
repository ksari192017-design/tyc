import React from 'react';

export const Navbar = ({ currentSection, setSection }: any) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          {currentSection === 'home' && 'Home'}
          {currentSection === 'courses' && 'Courses'}
          {currentSection === 'materials' && 'Materials'}
          {currentSection === 'jobs' && 'Jobs'}
          {currentSection === 'freelance' && 'Freelance'}
          {currentSection === 'webinars' && 'Webinars'}
          {currentSection === 'resume' && 'Resume Builder'}
          {currentSection === 'ai_lab' && 'AI Lab'}
          {currentSection === 'skillloop' && 'SkillLoop - Morning Brief'}
          {currentSection === 'login' && 'Login'}
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
