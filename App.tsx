
import React, { useState, useEffect } from 'react';
import { Step } from './types';
import Header from './components/Header';
import Step1Intro from './components/Step1Intro';
import Step2Reasons from './components/Step2Reasons';
import Step3Probe from './components/Step3Probe';
import Step4OfficialInvite from './components/Step4OfficialInvite';
import Step5Confirmation from './components/Step5Confirmation';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const restart = () => {
    setCurrentStep(Step.INTRO);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="relative min-h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors duration-500">
      <Header 
        onRestart={restart} 
        currentStep={currentStep} 
        onToggleTheme={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-4">
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          {currentStep === Step.INTRO && <Step1Intro onNext={nextStep} onRestart={restart} />}
          {currentStep === Step.REASONS && <Step2Reasons onNext={nextStep} onRestart={restart} />}
          {currentStep === Step.PROBE && <Step3Probe onNext={nextStep} onRestart={restart} />}
          {currentStep === Step.INVITATION && <Step4OfficialInvite onNext={nextStep} onRestart={restart} />}
          {currentStep === Step.CONFIRMATION && <Step5Confirmation onRestart={restart} />}
        </div>
      </main>

      <footer className="py-6 text-center opacity-40">
        <p className="text-xs tracking-widest uppercase font-medium text-primary">
          Step {currentStep} of 5 • {getStepSubtitle(currentStep)}
        </p>
      </footer>
    </div>
  );
};

function getStepSubtitle(step: Step): string {
  switch (step) {
    case Step.INTRO: return "The Hook";
    case Step.REASONS: return "The Sweet Reasons";
    case Step.PROBE: return "The Soft Inquiry";
    case Step.INVITATION: return "The Official Question";
    case Step.CONFIRMATION: return "The Celebration";
    default: return "";
  }
}

export default App;
