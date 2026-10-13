import React from 'react';
import { BaseScreenProps } from '../../types/garden';
import { GARDEN_PHOTOS } from '../../constants/gardenData';
import PolaroidCard from '../widgets/PolaroidCard';
import PrimaryButton from '../common/PrimaryButton';

export const Screen3Polaroid: React.FC<BaseScreenProps> = ({
  onNext,
  onOpenLightbox,
}) => {
  const photo1 = GARDEN_PHOTOS[0];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 py-6 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5DDE5]/60 border border-[#C9829B]/20 text-xs font-semibold text-[#C9829B] tracking-wider uppercase mb-3">
        <span>✨</span> Phần Thưởng 01 • Bức Ảnh Đầu Tiên
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#51433F]">
        {photo1.title}
      </h2>
      <p className="text-xs sm:text-sm text-[#51433F]/75 mt-1 max-w-xs">
        Bông hoa rực rỡ nhất trong khu vườn sáng nay...
      </p>

      {/* Polaroid Card */}
      <div className="my-6 w-full flex justify-center">
        <PolaroidCard
          photo={photo1}
          onOpenLightbox={() => onOpenLightbox && onOpenLightbox(0)}
        />
      </div>

      {/* Poetic description */}
      <div className="max-w-sm mx-auto p-4 rounded-2xl bg-white/60 border border-[#C9829B]/20 shadow-xs mb-6">
        <p className="font-handwriting text-xl text-[#C9829B] leading-snug">
          "{photo1.note}"
        </p>
        <span className="text-[11px] text-[#51433F]/60 block mt-2 font-sans">
          Em có thể chạm vào ảnh để phóng to, hoặc lật xem mặt sau nhé!
        </span>
      </div>

      {/* Continue CTA */}
      <PrimaryButton
        onClick={onNext}
        size="lg"
        icon={<span>🌙</span>}
        className="w-full max-w-xs shadow-md"
      >
        Khám phá góc vườn đêm 🌌
      </PrimaryButton>
    </div>
  );
};

export default Screen3Polaroid;
