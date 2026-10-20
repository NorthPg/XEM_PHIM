import React, { useState, useEffect } from 'react';
import { BaseScreenProps } from '../../types/garden';
import SleepingFlower from '../widgets/SleepingFlower';
import PrimaryButton from '../common/PrimaryButton';

const FLOWER_NAMES = [
  'Đóa Hoa Hồng E Ấp',
  'Cúc Họa Mi Ban Mai',
  'Đóa Mẫu Đơn Dịu Dàng',
];

interface Screen2FlowersProps extends BaseScreenProps {
  onFlowerAwakened?: (index: number) => void;
  awakenedFlowers?: number[];
}

export const Screen2Flowers: React.FC<Screen2FlowersProps> = ({
  onNext,
  onFlowerAwakened,
  awakenedFlowers: externalAwakened,
}) => {
  const [internalAwakened, setInternalAwakened] = useState<number[]>(
    externalAwakened || []
  );
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const awakened = externalAwakened || internalAwakened;
  const isCompleted = awakened.length >= 3;

  const handleAwaken = (index: number) => {
    if (!awakened.includes(index)) {
      const nextList = [...awakened, index];
      setInternalAwakened(nextList);
      if (onFlowerAwakened) onFlowerAwakened(index);
    }
  };

  const handleWakeAll = () => {
    setInternalAwakened([0, 1, 2]);
    [0, 1, 2].forEach((idx) => {
      if (onFlowerAwakened) onFlowerAwakened(idx);
    });
  };

  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 md:py-10 animate-fade-in">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5DDE5]/60 border border-[#C9829B]/20 text-xs font-semibold text-[#C9829B] tracking-wider uppercase mb-3">
        <span>🌸</span> Mini-Game 1 • Đánh Thức Nụ Hoa
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#51433F]">
        Ba Đóa Hoa Đang Ngủ Say
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-[#51433F]/75 mt-1 max-w-xs sm:max-w-md">
        Sáng sớm trong vườn, có 3 nụ hoa vẫn còn ngái ngủ. Em hãy chạm nhẹ vào từng nụ hoa để đánh thức chúng nhé!
      </p>

      {/* Counter Pill */}
      <div className="my-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9F1] border-2 border-[#C9829B]/30 shadow-xs">
        <span className="text-sm">🌷</span>
        <span className="text-xs sm:text-sm font-semibold text-[#51433F]">
          Nụ hoa đã nở: <strong className="text-[#C9829B]">{awakened.length}</strong> / 3
        </span>
      </div>

      {/* Flower Bed: 3 Flowers */}
      <div className="w-full py-5 md:py-8 px-3 md:px-8 my-4 rounded-3xl bg-white/50 border border-[#B7C9AE]/50 backdrop-blur-xs flex items-center justify-around gap-3 md:gap-8 shadow-sm">
        {FLOWER_NAMES.map((name, i) => (
          <SleepingFlower
            key={i}
            index={i}
            flowerName={name}
            isAwakened={awakened.includes(i)}
            onAwaken={handleAwaken}
          />
        ))}
      </div>

      {/* Completion Banner */}
      {isCompleted ? (
        <div className="w-full max-w-md md:max-w-lg p-5 md:p-6 my-6 rounded-3xl bg-gradient-to-r from-[#FFF9F1] via-[#F5DDE5]/80 to-[#FFF9F1] border-2 border-[#C9829B]/40 shadow-md animate-fade-in flex flex-col items-center">
          <span className="text-3xl animate-bounce">🎉</span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#51433F] mt-1">
            Khu vườn đã nở rộ tuyệt đẹp!
          </h3>
          <p className="text-xs sm:text-sm text-[#C9829B] font-medium mt-0.5">
            Phần thưởng đầu tiên: Một bức ảnh rất xinh đã được mở khóa!
          </p>
          <PrimaryButton
            onClick={onNext}
            size="lg"
            className="mt-4 w-full max-w-xs shadow-md"
            icon={<span>📸</span>}
          >
            Xem ảnh mở khóa ngay ✨
          </PrimaryButton>
        </div>
      ) : (
        /* Hint & Skip Controls */
        <div className="mt-6 flex flex-col items-center gap-2">
          {showHint && (
            <p className="text-xs text-[#C9829B] italic animate-fade-in">
              💡 Gợi ý: Chạm lần lượt vào từng nụ hoa màu xanh lá để hoa bung nở rực rỡ!
            </p>
          )}
          <button
            onClick={handleWakeAll}
            className="text-xs text-[#51433F]/60 hover:text-[#C9829B] underline cursor-pointer mt-1"
          >
            ⚡ Bỏ qua thử thách này (Đánh thức tất cả)
          </button>
        </div>
      )}
    </div>
  );
};

export default Screen2Flowers;
