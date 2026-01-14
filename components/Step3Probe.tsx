
import React from 'react';
import { StepProps } from '../types';

const Step3Probe: React.FC<StepProps> = ({ onNext }) => {
  return (
    <div className="step-active flex flex-col max-w-[960px] flex-1 px-4 items-center">
      <div className="flex w-full justify-center mb-10">
        <div className="flex flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2 group">
            <div 
              className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnMQCN4x86wiHnlP49pfnAD29v5JX58USKAji6IfRRIxAWbTi8QXtCZnOER_9kUtKbvtFbTpX0Tx-cvS8dnCrX0TPcmt1ev-6r9zsFcCe8ofsm4GtAV1ePlWN8qtHzBU8OeNwbAUJV1Jjxy5KCQq-OQMNAs1OLz5qBUYynK-vi8KYQj7PRpgTKXHEnzt9lHEpfuWCVEInm9wSDiVxNZcE60n-xQvsamOKKDIEpnqVzEN1I0JFUAdolAQ0AZQAsBLgS7FnwwmKHlDx-")` }}
            />
            <p className="text-[#1b0d12] dark:text-gray-300 text-[13px] font-medium">Fun</p>
          </div>
          
          <div className="flex flex-col items-center gap-2 group">
            <div 
              className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-full border-4 border-primary/30 shadow-xl group-hover:scale-110 transition-transform"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDywcy6qruX4riYtlYiwt_h8goBlb_dBWKa4m4EwRfUdkhtfix8t3HoreZ0ueYZrfWhRXpMOwF7z4qP4PHzpDaSYbo5Lo7g6UBXDB33C_nOBfbjlZ9hLfGAqPjmxpYjGd9cvXNTy0zvbBrtDwGK0wLwWWClrqArJ3Uw0TqDHKSmIi61vpMWYtCtruijxPjc5mvwa0GPCsxhoqJrcQw7e9nI1s_SSYwbZGwHI4RIEf8GbBlNfsGqHDUgwGufAMaq44Df3HxcPLs98akB")` }}
            />
            <p className="text-primary text-[13px] font-bold">Romance</p>
          </div>
          
          <div className="flex flex-col items-center gap-2 group">
            <div 
              className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgTgT0mGbltBqS-lwijet69gFJYglKWwGZwWWFZQZNxhf590CzjK1-luZdgEzEgY5CJ9GQoD_CmJONbe2XKyzN5WhVvjBQiN4isZFaGLp-cjTZDFi-CutF38oZXJIm5EhiqcSoJVS_Iksko4m58dSege2dOwOp7uxsPlhMd2cnhxVvhORLqsTro6fHVjZNj3rVGAEekFFooo0DcnPMgfktdSdPJCDI23iayUbDjuibuTy6OOP5nIJNJ8yolxPK26EZbLaSMoZIGNSl")` }}
            />
            <p className="text-[#1b0d12] dark:text-gray-300 text-[13px] font-medium">Comfort</p>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <span className="material-symbols-outlined text-primary">movie</span>
        </div>
        <h1 className="text-[#1b0d12] dark:text-white tracking-tight text-[32px] md:text-[42px] font-extrabold leading-tight px-4 max-w-2xl mx-auto">
          Thế... em có thích đi xem phim không?
        </h1>
      </div>
      
      <div className="flex justify-center mt-10 w-full">
        <div className="flex flex-col sm:flex-row gap-4 px-4 py-3 max-w-[520px] w-full justify-center items-center">
          <button 
            onClick={onNext}
            className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
          >
            <span className="truncate">Có chứ! ❤️</span>
          </button>
          
          <button 
            onClick={onNext}
            className="shake-on-hover flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary/10 dark:bg-white/10 text-primary dark:text-primary text-lg font-bold hover:bg-primary/20 transition-all w-full sm:w-auto"
          >
            <span className="truncate">Không thích lắm</span>
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-primary/80 dark:text-primary text-base font-medium italic text-center px-4">
          Ôi... để anh cố thuyết phục em thêm nha 🥺
        </p>
      </div>
      
      <div className="mt-16 flex justify-center gap-2 opacity-30 dark:opacity-20">
        <span className="material-symbols-outlined">circle</span>
        <span className="material-symbols-outlined text-primary fill-1">favorite</span>
        <span className="material-symbols-outlined">circle</span>
      </div>
    </div>
  );
};

export default Step3Probe;
