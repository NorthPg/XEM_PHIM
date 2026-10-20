import React, { useState, useEffect } from 'react';
import { BaseScreenProps } from '../../types/garden';
import { GARDEN_PHOTOS } from '../../constants/gardenData';
import FireflyJar from '../widgets/FireflyJar';
import PrimaryButton from '../common/PrimaryButton';

interface Screen4FirefliesProps extends BaseScreenProps {
  onFirefliesCompleted?: () => void;
  isAlreadyCompleted?: boolean;
}

interface FireflyItem {
  id: number;
  top: number;
  left: number;
  caught: boolean;
}

export const Screen4Fireflies: React.FC<Screen4FirefliesProps> = ({
  onNext,
  onOpenLightbox,
  onFirefliesCompleted,
  isAlreadyCompleted = false,
}) => {
  const [fireflies, setFireflies] = useState<FireflyItem[]>(() => [
    { id: 0, top: 18, left: 15, caught: isAlreadyCompleted },
    { id: 1, top: 28, left: 78, caught: isAlreadyCompleted },
    { id: 2, top: 52, left: 22, caught: isAlreadyCompleted },
    { id: 3, top: 68, left: 82, caught: isAlreadyCompleted },
    { id: 4, top: 82, left: 45, caught: isAlreadyCompleted },
  ]);

  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const caughtCount = fireflies.filter((f) => f.caught).length;
  const isCompleted = caughtCount >= 5;

  const handleCatch = (id: number) => {
    setFireflies((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, caught: true } : f));
      const newlyCaught = next.filter((f) => f.caught).length;
      if (newlyCaught >= 5 && onFirefliesCompleted) {
        onFirefliesCompleted();
      }
      return next;
    });
  };

  const handleCatchAll = () => {
    setFireflies((prev) => {
      const allCaught = prev.map((f) => ({ ...f, caught: true }));
      if (onFirefliesCompleted) onFirefliesCompleted();
      return allCaught;
    });
  };

  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 md:py-10 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE17D]/30 border border-[#FFE17D]/60 text-xs font-semibold text-[#8B6E16] tracking-wider uppercase mb-3">
        <span>✨</span> Mini-Game 2 • Đom Đóm Hoàng Hôn
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#51433F]">
        Thu Thập 5 Đốm Sáng Lung Linh
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-[#51433F]/75 mt-1 max-w-sm sm:max-w-md">
        Trời đã về chiều, khu vườn tối dần rồi... Em bắt giúp anh… à nhầm, giúp khu vườn 5 đốm sáng nhé! 🌿
      </p>

      {/* Interactive Meadow Area */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] my-5 rounded-3xl overflow-hidden bg-gradient-to-b from-[#2B1B2D] via-[#3E243A] to-[#1F1420] border-2 border-purple-900/40 shadow-xl flex items-center justify-center p-4">
        {/* Firefly Jar in Center */}
        <div className="z-10 scale-90 sm:scale-100 md:scale-110">
          <FireflyJar collectedCount={caughtCount} targetCount={5} />
        </div>

        {/* 5 Floating Fireflies roaming in the meadow */}
        {fireflies.map((firefly) => {
          if (firefly.caught) return null;

          return (
            <button
              key={firefly.id}
              onClick={() => handleCatch(firefly.id)}
              aria-label={`Bắt chú đom đóm số ${firefly.id + 1}`}
              className="absolute z-20 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center cursor-pointer transition-transform hover:scale-125 active:scale-95 animate-firefly"
              style={{
                top: `${firefly.top}%`,
                left: `${firefly.left}%`,
                animationDelay: `${firefly.id * 0.6}s`,
              }}
            >
              <div className="relative w-5 h-5 rounded-full bg-[#FFE17D] shadow-[0_0_16px_#FFE17D] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            </button>
          );
        })}

        {/* Ambient meadow silhouette bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Completion Banner */}
      {isCompleted ? (
        <div className="w-full max-w-md md:max-w-lg p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FFF9F1] via-[#F5DDE5]/90 to-[#FFF9F1] border-2 border-[#C9829B]/40 shadow-lg animate-fade-in flex flex-col items-center">
          <span className="text-3xl animate-bounce">🌟</span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#51433F] mt-1">
            Bình đom đóm đã phát sáng rực rỡ!
          </h3>
          <p className="text-xs sm:text-sm text-[#C9829B] font-medium mt-0.5">
            Tuyệt vời! Em đã mở khóa cùng lúc 2 bức ảnh mới (#02 và #03)!
          </p>

          {/* 2 Unlocked Photo Previews */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full my-4">
            {[1, 2].map((idx) => {
              const photo = GARDEN_PHOTOS[idx];
              return (
                <div
                  key={photo.id}
                  onClick={() => onOpenLightbox && onOpenLightbox(idx)}
                  className="p-2 bg-white rounded-xl shadow-xs border border-[#C9829B]/30 cursor-pointer hover:scale-102 transition-transform"
                >
                  <img
                    src={photo.fileName}
                    alt={photo.title}
                    className="w-full aspect-[4/5] object-cover rounded-lg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <span className="text-[10px] font-semibold text-[#51433F] block mt-1 truncate">
                    {photo.title}
                  </span>
                </div>
              );
            })}
          </div>

          <PrimaryButton
            onClick={onNext}
            size="lg"
            className="w-full max-w-xs shadow-md mt-2"
            icon={<span>🧩</span>}
          >
            Giải câu đố ghép hoa 🌸
          </PrimaryButton>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2">
          {showHint && (
            <p className="text-xs text-[#C9829B] italic animate-fade-in">
              💡 Gợi ý: Hãy chạm vào những đốm vàng đang lập lòe bay lượn trên nền trời đêm!
            </p>
          )}
          <button
            onClick={handleCatchAll}
            className="text-xs text-[#51433F]/60 hover:text-[#C9829B] underline cursor-pointer mt-1"
          >
            ⚡ Bỏ qua thử thách này (Thu thập cả 5 chú đom đóm)
          </button>
        </div>
      )}
    </div>
  );
};

export default Screen4Fireflies;
