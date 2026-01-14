
import React, { useState, useRef, useEffect } from 'react';
import { StepProps } from '../types';

const Step4OfficialInvite: React.FC<StepProps> = ({ onNext }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    const margin = 100;
    const maxX = window.innerWidth - (noBtnRef.current?.offsetWidth || 200) - margin;
    const maxY = window.innerHeight - (noBtnRef.current?.offsetHeight || 60) - margin;
    
    const x = Math.max(margin, Math.random() * maxX);
    const y = Math.max(margin, Math.random() * maxY);
    
    setNoButtonPos({ x, y });
    setIsMoved(true);
  };

  return (
    <div className="step-active flex flex-col items-center w-full min-h-[60vh] relative">
      <div className="mb-6 bg-primary/5 p-6 rounded-full animate-bounce">
        <span className="material-symbols-outlined text-primary text-6xl">movie_edit</span>
      </div>
      
      <h1 className="text-[#1b0d12] dark:text-white tracking-tight text-[32px] md:text-[42px] font-bold leading-tight px-4 text-center pb-4 max-w-3xl">
        Cuối tuần này em có muốn đi xem phim với anh không?
      </h1>
      
      <p className="text-[#1b0d12] dark:text-gray-300 text-lg md:text-xl font-medium leading-normal pb-2 pt-1 px-4 text-center">
        Thứ 7 tuần này, suất tối nhé?
      </p>
      
      <p className="text-primary text-base font-normal leading-normal pb-8 pt-1 px-4 text-center">
        Mình chọn rạp gần nhà em cho tiện nè.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 px-4 py-3 w-full max-w-[480px] justify-center items-center mt-10">
        <button 
          onClick={onNext}
          className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform duration-200 z-10"
        >
          <span className="truncate">Đi chứ!</span>
        </button>
        
        <button 
          ref={noBtnRef}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
          style={isMoved ? { position: 'fixed', left: `${noButtonPos.x}px`, top: `${noButtonPos.y}px` } : {}}
          className={`flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-gray-200 dark:bg-gray-700 text-[#1b0d12] dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-all duration-300 ${isMoved ? 'z-[100]' : ''}`}
        >
          <span className="truncate">Không đâu...</span>
        </button>
      </div>

      {/* Background decorations */}
      <div className="fixed top-20 right-[10%] opacity-20 pointer-events-none select-none hidden lg:block">
        <span className="material-symbols-outlined text-primary text-9xl">bubbles</span>
      </div>
      <div className="fixed bottom-20 left-[10%] opacity-20 pointer-events-none select-none hidden lg:block">
        <span className="material-symbols-outlined text-primary text-9xl">theater_comedy</span>
      </div>
    </div>
  );
};

export default Step4OfficialInvite;
