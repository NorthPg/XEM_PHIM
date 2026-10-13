import React, { useState } from 'react';
import { GIFT_BOX_OPTIONS } from '../../constants/gardenData';
import { GiftBoxOption } from '../../types/garden';

interface GiftBox3DProps {
  onSelectBox: (box: GiftBoxOption) => void;
  selectedBoxId: string | null;
}

export const GiftBox3D: React.FC<GiftBox3DProps> = ({
  onSelectBox,
  selectedBoxId,
}) => {
  const [openedId, setOpenedId] = useState<string | null>(selectedBoxId);

  const handleBoxClick = (box: GiftBoxOption) => {
    setOpenedId(box.id);
    onSelectBox(box);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
        {GIFT_BOX_OPTIONS.map((box) => {
          const isOpened = openedId === box.id;

          return (
            <button
              key={box.id}
              type="button"
              onClick={() => handleBoxClick(box)}
              className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-500 cursor-pointer text-center select-none ${
                isOpened
                  ? 'border-[#C9829B] bg-gradient-to-b from-[#FFF9F1] to-[#F5DDE5] shadow-lg scale-105'
                  : 'border-white/80 bg-white/70 hover:bg-white hover:border-[#C9829B]/40 hover:-translate-y-1 shadow-sm'
              }`}
            >
              {/* Gift Box Graphic */}
              <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                {isOpened ? (
                  <div className="relative animate-bounce">
                    <span className="text-5xl">🎁</span>
                    <span className="absolute -top-2 -right-2 text-xl animate-ping">✨</span>
                  </div>
                ) : (
                  <div className="relative group-hover:scale-110 transition-transform">
                    {/* Box Icon with Ribbons */}
                    <div
                      className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center shadow-md bg-gradient-to-br ${box.boxColor}`}
                    >
                      {/* Ribbon Cross */}
                      <div
                        className="absolute inset-x-0 h-3"
                        style={{ backgroundColor: box.ribbonColor, opacity: 0.85 }}
                      />
                      <div
                        className="absolute inset-y-0 w-3"
                        style={{ backgroundColor: box.ribbonColor, opacity: 0.85 }}
                      />
                      {/* Bow on Top */}
                      <div className="absolute -top-2 text-base">🎀</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Tag */}
              <h4 className="font-serif font-bold text-sm text-[#51433F]">
                {box.title}
              </h4>
              <span className="text-[11px] text-[#C9829B] font-medium mt-0.5">
                {box.tag}
              </span>

              {/* Status Indicator */}
              <div className="mt-3">
                {isOpened ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#C9829B] text-white font-medium shadow-xs">
                    Đã mở hộp ✨
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#F5DDE5]/60 text-[#51433F] group-hover:bg-[#F5DDE5]">
                    Chạm để mở
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Blessing Note Card if opened */}
      {openedId && (
        <div className="mt-6 w-full max-w-md p-5 rounded-2xl bg-[#FFFDF9] border border-[#C9829B]/30 shadow-md text-center animate-fade-in">
          <span className="text-xs font-semibold text-[#C9829B] uppercase tracking-wider">
            Lời chúc đặc biệt dành riêng cho em
          </span>
          <p className="font-handwriting text-2xl text-[#51433F] leading-snug mt-2">
            "{GIFT_BOX_OPTIONS.find((b) => b.id === openedId)?.blessingMessage}"
          </p>
          <span className="text-[11px] text-[#51433F]/60 block mt-2 font-sans">
            Món quà cuối cùng và bức thư chúc mừng 20/10 đã sẵn sàng! 🌸
          </span>
        </div>
      )}
    </div>
  );
};

export default GiftBox3D;
