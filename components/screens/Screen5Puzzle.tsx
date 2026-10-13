import React, { useState } from 'react';
import { BaseScreenProps } from '../../types/garden';
import { GARDEN_PHOTOS } from '../../constants/gardenData';
import PuzzleGrid from '../widgets/PuzzleGrid';
import PrimaryButton from '../common/PrimaryButton';

interface Screen5PuzzleProps extends BaseScreenProps {
  onPuzzleCompleted?: () => void;
  isAlreadyCompleted?: boolean;
}

export const Screen5Puzzle: React.FC<Screen5PuzzleProps> = ({
  onNext,
  onOpenLightbox,
  onPuzzleCompleted,
  isAlreadyCompleted = false,
}) => {
  const [isFinished, setIsFinished] = useState(isAlreadyCompleted);
  const photo4 = GARDEN_PHOTOS[3]; // Graduation Photo 4

  const handleComplete = () => {
    setIsFinished(true);
    if (onPuzzleCompleted) onPuzzleCompleted();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 py-6 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7C9AE]/40 border border-[#B7C9AE] text-xs font-semibold text-[#3D5A2E] tracking-wider uppercase mb-3">
        <span>🧩</span> Mini-Game 3 • Mảnh Ghép Hoàn Mỹ
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#51433F]">
        Ghép Đóa Hoa Hoàn Hảo
      </h2>
      <p className="text-xs sm:text-sm text-[#51433F]/75 mt-1 max-w-xs sm:max-w-sm">
        Chạm chọn một mảnh rồi chạm ô khác để hoán đổi vị trí. Khi 4 mảnh ghép khớp nhau, bí mật thứ tư sẽ hé mở!
      </p>

      {/* Interactive Puzzle Grid */}
      <div className="my-5 w-full flex justify-center">
        <PuzzleGrid onComplete={handleComplete} />
      </div>

      {/* Completion Banner & Unlocked Photo 4 */}
      {isFinished && (
        <div className="w-full max-w-md p-5 rounded-2xl bg-gradient-to-r from-[#FFF9F1] via-[#F5DDE5]/90 to-[#FFF9F1] border-2 border-[#C9829B]/40 shadow-lg animate-fade-in flex flex-col items-center mt-3">
          <span className="text-3xl animate-bounce">🎓✨</span>
          <h3 className="font-serif text-lg font-bold text-[#51433F] mt-1">
            Mở khóa thành công: {photo4.title}!
          </h3>
          <p className="text-xs text-[#C9829B] font-medium mt-0.5">
            "{photo4.note}"
          </p>

          {/* Photo 4 Preview Card */}
          <div
            onClick={() => onOpenLightbox && onOpenLightbox(3)}
            className="my-4 p-2.5 bg-white rounded-xl shadow-md border border-[#C9829B]/30 cursor-pointer max-w-xs w-full flex items-center gap-3 hover:scale-102 transition-transform"
          >
            <img
              src={photo4.fileName}
              alt={photo4.title}
              className="w-16 h-20 object-cover rounded-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="text-left flex-1">
              <span className="text-[10px] font-semibold text-[#C9829B] uppercase">
                {photo4.badge}
              </span>
              <h4 className="font-serif text-sm font-bold text-[#51433F] mt-0.5">
                {photo4.title}
              </h4>
              <p className="text-[11px] text-[#51433F]/70 font-sans line-clamp-2 mt-0.5">
                {photo4.caption}
              </p>
            </div>
            <span className="text-xs text-[#C9829B]">🔍</span>
          </div>

          <PrimaryButton
            onClick={onNext}
            size="lg"
            className="w-full max-w-xs shadow-md mt-2"
            icon={<span>🎁</span>}
          >
            Nhận chiếc hộp may mắn 🎀
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Screen5Puzzle;
