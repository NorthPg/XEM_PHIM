
import React from 'react';
import { Step } from '../types';

interface HeaderProps {
  onRestart: () => void;
  currentStep: Step;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRestart, currentStep, onToggleTheme, isDarkMode }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-40 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 text-primary transition-transform hover:scale-105 cursor-default">
        <span className="material-symbols-outlined text-3xl fill-1">favorite</span>
        <h2 className="text-[#1b0d12] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Romantic Invite</h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          <span className="text-[#1b0d12] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors cursor-pointer">Our Story</span>
          <span className="text-[#1b0d12] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors cursor-pointer">The Date</span>
        </nav>
        
        <button 
          onClick={onToggleTheme}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
          title="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined text-xl">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button 
          onClick={onRestart}
          className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <span className="truncate">Start Over</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
