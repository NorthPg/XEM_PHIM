import React from 'react';

interface SleepingFlowerProps {
  index: number;
  isAwakened: boolean;
  onAwaken: (index: number) => void;
  flowerName: string;
}

export const SleepingFlower: React.FC<SleepingFlowerProps> = ({
  index,
  isAwakened,
  onAwaken,
  flowerName,
}) => {
  const handleClick = () => {
    if (!isAwakened) {
      onAwaken(index);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isAwakened}
        aria-label={`Chạm để đánh thức đóa ${flowerName}`}
        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer select-none ${
          isAwakened
            ? 'animate-bloom scale-105 shadow-lg shadow-[#C9829B]/30'
            : 'hover:scale-105 active:scale-95 animate-breathing'
        }`}
        style={{
          background: isAwakened
            ? 'radial-gradient(circle, #FFEBF0 0%, #F5DDE5 65%, #C9829B 100%)'
            : 'radial-gradient(circle, #FFF9F1 0%, #E2DDD5 70%, #C3BDB3 100%)',
        }}
      >
        {/* Flower SVG Art */}
        {isAwakened ? (
          <div className="relative flex items-center justify-center">
            {/* Blooming flower petals */}
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9829B] drop-shadow-md animate-spin-slow"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <g transform="translate(50,50)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-26"
                    rx="14"
                    ry="24"
                    fill={i % 2 === 0 ? '#C9829B' : '#E5A9BC'}
                    transform={`rotate(${angle})`}
                    opacity="0.9"
                  />
                ))}
                <circle cx="0" cy="0" r="14" fill="#FFE17D" />
                <circle cx="-4" cy="-2" r="2" fill="#51433F" />
                <circle cx="4" cy="-2" r="2" fill="#51433F" />
                <path d="M -3 3 Q 0 6 3 3" stroke="#51433F" strokeWidth="1.5" fill="none" />
              </g>
            </svg>
            <span className="absolute -top-1 -right-1 text-sm animate-bounce">✨</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center">
            {/* Sleeping bud */}
            <div className="w-12 h-14 bg-[#B7C9AE] rounded-t-full rounded-b-2xl flex flex-col items-center justify-center border-2 border-[#8EAE82] shadow-inner">
              <span className="text-xs text-[#51433F] font-bold mt-2">u_u</span>
              <span className="text-[10px] text-[#51433F]/70 font-sans">zzz</span>
            </div>
            <div className="w-2 h-4 bg-[#8EAE82] rounded-b-full" />
            <span className="text-[10px] text-[#51433F]/60 mt-1">Chạm nhẹ</span>
          </div>
        )}
      </button>

      {/* Flower Name & Status */}
      <span className="mt-2.5 text-xs sm:text-sm font-medium text-[#51433F] text-center">
        {flowerName}
      </span>
      <span className="text-[11px] text-[#C9829B]">
        {isAwakened ? 'Đã thức giấc 🌸' : 'Đang ngái ngủ...'}
      </span>
    </div>
  );
};

export default SleepingFlower;
