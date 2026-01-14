
import React from 'react';
import { StepProps } from '../types';

const Step2Reasons: React.FC<StepProps> = ({ onNext }) => {
  const reasons = [
    "Xem phim một mình buồn lắm...",
    "Đi xem phim cùng em chắc vui hơn nhiều.",
    "Anh muốn ngồi cạnh em trong rạp tối ✨"
  ];

  return (
    <div className="step-active flex flex-col max-w-[600px] w-full bg-white/50 dark:bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-sm border border-primary/5">
      <div className="flex justify-center mb-4">
        <span className="material-symbols-outlined text-primary text-5xl opacity-80">movie_filter</span>
      </div>
      
      <h1 className="text-[#1b0d12] dark:text-white tracking-light text-[28px] md:text-[36px] font-bold leading-tight text-center pb-8">
        Lý do anh muốn rủ em đi xem phim là...
      </h1>
      
      <div className="flex flex-col gap-4 mb-10">
        {reasons.map((reason, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 transform transition-all hover:translate-x-2 cursor-default"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex-shrink-0">
              <span className="material-symbols-outlined text-primary fill-1">favorite</span>
            </div>
            <p className="text-[#1b0d12] dark:text-gray-200 text-lg font-medium leading-normal">
              {reason}
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onNext}
          className="flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 group"
        >
          <span className="truncate">Nghe cũng thú vị đó...</span>
          <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Step2Reasons;
