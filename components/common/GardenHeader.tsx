import React from 'react';
import { GardenScreenStep } from '../../types/garden';
import AudioPlayer from './AudioPlayer';

interface GardenHeaderProps {
  currentStep: GardenScreenStep;
  maxUnlockedStep: GardenScreenStep;
  onGoToStep?: (step: GardenScreenStep) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onStartAudio?: () => void;
  onRestart?: () => void;
}

const STEP_LABELS: Record<GardenScreenStep, string> = {
  1: 'Cánh Cổng',
  2: 'Đánh Thức Hoa',
  3: 'Ảnh Đầu Tiên',
  4: 'Đom Đóm',
  5: 'Ghép Mảnh Hoa',
  6: 'Hộp Quà May Mắn',
  7: 'Bức Thư 20.10',
};

export const GardenHeader: React.FC<GardenHeaderProps> = ({
  currentStep,
  maxUnlockedStep,
  onGoToStep,
  isAudioPlaying,
  onToggleAudio,
  onStartAudio,
  onRestart,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9F1]/85 backdrop-blur-md border-b border-[#C9829B]/20 py-2.5 px-4 transition-all">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Logo / Garden Badge */}
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={onRestart}>
          <span className="text-xl">🌸</span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wide text-[#51433F] leading-tight">
              The Little Garden
            </span>
            <span className="text-[10px] text-[#C9829B] font-medium tracking-wider">
              20 • 10 SURPRISE
            </span>
          </div>
        </div>

        {/* Stepper capsule pill */}
        <div className="flex items-center gap-1 bg-[#F5DDE5]/50 px-2.5 py-1 rounded-full border border-[#C9829B]/20">
          <div className="flex items-center gap-1">
            {([1, 2, 3, 4, 5, 6, 7] as GardenScreenStep[]).map((step) => {
              const isActive = step === currentStep;
              const isPassed = step < currentStep;
              const isAccessible = step <= maxUnlockedStep;

              return (
                <button
                  key={step}
                  onClick={() => isAccessible && onGoToStep && onGoToStep(step)}
                  disabled={!isAccessible}
                  aria-label={`Đi tới bước ${step}: ${STEP_LABELS[step]}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-5 bg-[#C9829B]'
                      : isPassed
                      ? 'w-2 bg-[#C9829B]/60 hover:bg-[#C9829B]'
                      : 'w-2 bg-stone-300'
                  } ${!isAccessible ? 'cursor-default' : 'cursor-pointer'}`}
                />
              );
            })}
          </div>
          <span className="text-[11px] font-medium text-[#51433F] ml-1.5 hidden xs:inline">
            {currentStep}/7
          </span>
        </div>

        {/* Audio Controller */}
        <div className="flex items-center">
          <AudioPlayer
            isPlaying={isAudioPlaying}
            onToggle={onToggleAudio}
            onStartAudio={onStartAudio}
            currentStep={currentStep}
          />
        </div>
      </div>
    </header>
  );
};

export default GardenHeader;
