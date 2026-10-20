import React, { useState, useEffect } from 'react';
import { BaseScreenProps, GiftBoxOption } from '../../types/garden';
import { GARDEN_PHOTOS, GIFT_BOX_OPTIONS } from '../../constants/gardenData';
import GiftBox3D from '../widgets/GiftBox3D';
import PrimaryButton from '../common/PrimaryButton';

interface Screen6GiftBoxProps extends BaseScreenProps {
  onGiftBoxSelected?: (boxId: string) => void;
  selectedBoxId?: string | null;
}

export const Screen6GiftBox: React.FC<Screen6GiftBoxProps> = ({
  onNext,
  onOpenLightbox,
  onGiftBoxSelected,
  selectedBoxId: externalSelectedBoxId,
}) => {
  const [chosenBox, setChosenBox] = useState<GiftBoxOption | null>(() => {
    if (externalSelectedBoxId) {
      return GIFT_BOX_OPTIONS.find((b) => b.id === externalSelectedBoxId) || null;
    }
    return null;
  });
  const photo5 = GARDEN_PHOTOS[4]; // Hero Photo 5

  const handleSelect = (box: GiftBoxOption) => {
    setChosenBox(box);
    if (onGiftBoxSelected) onGiftBoxSelected(box.id);
  };

  useEffect(() => {
    if (chosenBox) {
      // Smoothly scroll down to the revealed blessing note & Photo 5
      const timer = setTimeout(() => {
        const el = document.getElementById('gift-blessing-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [chosenBox]);

  return (
    <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center text-center px-4 py-6 md:py-10 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8DEF8]/60 border border-[#C9829B]/30 text-xs font-semibold text-[#6750A4] tracking-wider uppercase mb-3">
        <span>🎀</span> Bước 6/7 • Chiếc Hộp May Mắn
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#51433F]">
        Chọn Một Món Quà May Mắn
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-[#51433F]/75 mt-1 max-w-sm sm:max-w-md">
        Có ba chiếc hộp bí mật ẩn chứa những lời chúc ngọt ngào nhất. Không có lựa chọn nào sai cả, em thích chiếc hộp nào nhất? 🎁
      </p>

      {/* 3 Gift Boxes Widget */}
      <div className="my-6 w-full">
        <GiftBox3D
          onSelectBox={handleSelect}
          selectedBoxId={externalSelectedBoxId || chosenBox?.id || null}
        />
      </div>

      {/* Hero Photo 5 Unlock Preview */}
      {chosenBox && (
        <div className="w-full max-w-md sm:max-w-lg p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FFF9F1] via-[#F5DDE5]/90 to-[#FFF9F1] border-2 border-[#C9829B]/40 shadow-lg animate-fade-in flex flex-col items-center mt-5">
          <span className="text-3xl animate-bounce">👑🌸</span>
          <span className="text-[11px] sm:text-xs font-bold text-[#C9829B] tracking-wider uppercase">
            Mở Khóa Bức Ảnh Cuối Cùng
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#51433F] mt-1">
            {photo5.title}
          </h3>

          {/* Photo 5 Card */}
          <div
            onClick={() => onOpenLightbox && onOpenLightbox(4)}
            className="my-3.5 p-2.5 bg-white rounded-2xl shadow-md border border-[#C9829B]/30 cursor-pointer max-w-xs sm:max-w-sm w-full hover:scale-102 transition-transform"
          >
            <img
              src={photo5.fileName}
              alt={photo5.title}
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-inner"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <p className="font-handwriting text-xl text-[#C9829B] text-center mt-2.5">
              "{photo5.note}"
            </p>
          </div>

          <PrimaryButton
            onClick={onNext}
            size="lg"
            className="w-full max-w-xs shadow-md mt-2"
            icon={<span>💌</span>}
          >
            Mở thư chúc mừng 20/10 🌸
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Screen6GiftBox;
