import React, { useState } from 'react';
import { PhotoReward } from '../../types/garden';

interface PolaroidCardProps {
  photo: PhotoReward;
  onOpenLightbox?: () => void;
  className?: string;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  onOpenLightbox,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative max-w-xs sm:max-w-sm w-full mx-auto perspective-1000 ${className}`}>
      {/* Washi Tape Accent */}
      <div className="washi-tape" aria-hidden="true" />

      {/* 3D Flip Container */}
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ minHeight: '380px' }}
      >
        {/* FRONT OF POLAROID */}
        <div
          className="polaroid-frame w-full h-full flex flex-col backface-hidden absolute inset-0 bg-white"
          onClick={() => {
            if (onOpenLightbox) onOpenLightbox();
          }}
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#C9829B] tracking-wide">
              {photo.badge}
            </span>
            <span className="text-xs text-stone-400">🔍 Chạm để phóng to</span>
          </div>

          {/* Photo Frame */}
          <div className="relative w-full aspect-[4/5] bg-stone-100 rounded overflow-hidden shadow-inner group">
            <img
              src={photo.fileName}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Handwritten Caption at Bottom */}
          <div className="mt-3 text-center">
            <h4 className="font-serif text-base font-medium text-[#51433F]">
              {photo.title}
            </h4>
            <p className="font-handwriting text-lg text-[#C9829B] leading-snug mt-0.5">
              "{photo.note}"
            </p>
          </div>

          {/* Flip trigger button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="mt-2 text-xs text-[#51433F]/70 hover:text-[#C9829B] underline text-center self-center"
          >
            🔄 Lật xem mặt sau ảnh
          </button>
        </div>

        {/* BACK OF POLAROID */}
        <div
          className="polaroid-frame w-full h-full flex flex-col justify-between backface-hidden absolute inset-0 bg-[#FFFDF9] rotate-y-180 border border-[#F5DDE5]"
          onClick={() => setIsFlipped(false)}
        >
          <div className="flex flex-col items-center pt-4 px-2 text-center">
            <span className="text-2xl mb-2">💌</span>
            <span className="text-xs font-semibold text-[#C9829B] tracking-wider uppercase">
              Mặt sau của bức ảnh
            </span>
            <div className="w-12 h-0.5 bg-[#C9829B]/30 my-3" />
            <p className="font-handwriting text-xl text-[#51433F] leading-relaxed">
              "Khu vườn này ghi lại những khoảnh khắc đẹp nhất. Mong em luôn giữ được nụ cười rực rỡ và ấm áp như thế này nhé!"
            </p>
            <p className="text-xs text-[#51433F]/60 mt-4 font-sans">
              — Góc nhỏ 20/10 —
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="text-xs text-[#C9829B] font-medium text-center pb-2 underline"
          >
            ↩ Lật lại mặt trước
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolaroidCard;
