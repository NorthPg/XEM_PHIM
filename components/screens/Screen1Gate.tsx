import React from 'react';
import { BaseScreenProps } from '../../types/garden';
import PrimaryButton from '../common/PrimaryButton';

interface Screen1GateProps extends BaseScreenProps {
  isAudioPlaying?: boolean;
  onStartAudio?: () => void;
}

export const Screen1Gate: React.FC<Screen1GateProps> = ({
  onNext,
  isAudioPlaying,
  onStartAudio,
}) => {
  return (
    <div
      onClick={() => {
        if (!isAudioPlaying && onStartAudio) {
          onStartAudio();
        }
      }}
      className="w-full max-w-lg md:max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-8 md:py-12 animate-fade-in"
    >
      {/* Decorative Gate Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5DDE5]/60 border border-[#C9829B]/30 text-xs font-semibold text-[#C9829B] tracking-wider uppercase mb-5">
        <span>✨</span> Chào mừng em đến với
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#51433F] leading-tight">
        The Little Garden
      </h1>
      <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#C9829B] mt-1.5">
        A Little Surprise for You 🌸
      </p>

      {/* Fairytale Arched Gate Illustration Card */}
      <div
        className="relative my-6 w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 p-2.5 bg-gradient-to-b from-[#FFF9F1] via-[#F5DDE5]/40 to-[#FFF9F1] flex flex-col items-center justify-center transition-transform active:scale-[0.99]"
      >
        {/* Arch Frame with Vines & Roses */}
        <div className="relative w-full h-full rounded-2xl border-2 border-[#B7C9AE]/60 flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-xs">
          {/* Climbing Roses Arch Top */}
          <div className="absolute top-3 text-3xl select-none">
            🌿 🌹 🌸 🌹 🌿
          </div>

          {/* Wooden Gate Texture */}
          <div className="w-44 sm:w-48 h-56 sm:h-64 rounded-t-full border-4 border-[#C39B77] bg-gradient-to-b from-[#D4AF8B] to-[#B38562] shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
            {/* Gate Planks */}
            <div className="absolute inset-y-0 w-0.5 bg-[#8E5E3A]/40 left-1/4" />
            <div className="absolute inset-y-0 w-0.5 bg-[#8E5E3A]/40 left-1/2" />
            <div className="absolute inset-y-0 w-0.5 bg-[#8E5E3A]/40 left-3/4" />

            {/* Glowing Golden Flower Keyhole */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-[#FFE17D] border-2 border-amber-300 shadow-[0_0_24px_#FFE17D] flex flex-col items-center justify-center animate-pulse">
              <span className="text-2xl">🗝️</span>
              <div className="w-1.5 h-3 bg-[#51433F] rounded-full mt-0.5" />
            </div>

            <span className="relative z-10 text-[11px] sm:text-xs font-medium text-[#FFF9F1] mt-3 tracking-wider uppercase drop-shadow-sm">
              Cổng Khu Vườn
            </span>
          </div>

          {/* Floating Spores */}
          <div className="absolute bottom-4 text-xs sm:text-sm text-[#51433F]/70 flex items-center gap-1">
            <span>🌸</span> Hương hoa thoang thoảng đón chào
          </div>
        </div>
      </div>

      {/* Touch to play music indicator badge */}
      {!isAudioPlaying ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onStartAudio) onStartAudio();
          }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#C9829B] bg-[#F5DDE5]/70 hover:bg-[#F5DDE5] border border-[#C9829B]/35 px-4 py-2 rounded-full animate-pulse my-3 cursor-pointer transition-all shadow-sm active:scale-95"
        >
          <span className="text-sm">🎵</span>
          <span>Chạm vào màn hình để nghe giai điệu</span>
          <span className="text-[11px]">✨</span>
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#51433F] bg-[#FFF9F1] border border-[#C9829B]/30 px-4 py-2 rounded-full my-3 shadow-sm animate-fade-in">
          <span className="animate-spin text-sm">🌸</span>
          <span className="font-serif italic text-[#C9829B]">Giai điệu lãng mạn đang phát...</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-2 bg-[#C9829B] animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#C9829B] animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-[#C9829B] animate-pulse delay-150" />
          </span>
        </div>
      )}

      {/* Description copy */}
      <div className="max-w-md md:max-w-lg mx-auto space-y-2 mb-8">
        <p className="text-sm sm:text-base md:text-lg text-[#51433F] leading-relaxed">
          Một góc vườn nhỏ, bình yên và ngập tràn sắc hoa được chuẩn bị riêng cho em nhân ngày <strong>Phụ nữ Việt Nam 20/10</strong>.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[#C9829B] font-medium">
          Mỗi bước chân qua khu vườn sẽ hé lộ những món quà bất ngờ...
        </p>
      </div>

      {/* Primary CTA */}
      <PrimaryButton
        onClick={onNext}
        size="lg"
        icon={<span className="text-lg">🌿</span>}
        className="w-full max-w-xs shadow-lg"
      >
        Mình vào xem nhé 🌷
      </PrimaryButton>

      <span className="text-[11px] text-[#51433F]/50 mt-4">
        Khám phá 7 chặng dịu dàng • Không áp lực • Hoàn toàn thư giãn
      </span>
    </div>
  );
};

export default Screen1Gate;
