
import React, { useState } from 'react';
import { StepProps } from '../types';

const Step1Intro: React.FC<StepProps> = ({ onNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Sử dụng ảnh local từ public/images
  const imageUrl = "/images/539641144_122230811342164967_3983958908900038601_n.jpg";

  return (
    <div className="step-active flex w-full max-w-[480px] flex-col items-center justify-center space-y-12">
      <div className="flex flex-col items-center text-center space-y-8 w-full">
        <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
          <span className="material-symbols-outlined text-primary text-4xl fill-1">favorite</span>
        </div>
        
        <div className="flex flex-col gap-3">
          <p className="text-[#9a4c66] dark:text-[#d199ac] text-lg font-medium tracking-wide">
            Này em...
          </p>
          <h1 className="text-[#2d161d] dark:text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.03em]">
            Anh có điều này muốn hỏi em...
          </h1>
        </div>
        
        <div className="w-full px-4">
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-primary/5">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-5xl animate-pulse">movie</span>
                  <p className="text-primary/60 text-sm font-medium">Đang tải...</p>
                </div>
              </div>
            )}
            
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex flex-col items-center gap-3 text-center p-6">
                  <span className="material-symbols-outlined text-primary text-5xl">movie</span>
                  <p className="text-primary text-lg font-bold">Mời em đi xem phim</p>
                  <p className="text-primary/70 text-sm">🎬 ✨ ❤️</p>
                </div>
              </div>
            ) : (
              <img 
                src={imageUrl}
                alt="Mời em đi xem phim"
                className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} hover:scale-110`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  setImageError(true);
                  setImageLoaded(false);
                }}
              />
            )}
            
            {/* Hiệu ứng gradient nhẹ đè lên ảnh cho nghệ thuật */}
            {imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <button 
          onClick={onNext}
          className="animate-soft-pulse flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
        >
          <span className="truncate">Tiếp tục</span>
        </button>
        
        <div className="flex items-center gap-2">
          <p className="text-[#9a4c66] dark:text-[#d199ac] text-sm font-normal leading-normal">
            Dành riêng cho em
          </p>
          <span className="material-symbols-outlined text-primary text-xs">auto_awesome</span>
        </div>
      </div>
    </div>
  );
};

export default Step1Intro;
