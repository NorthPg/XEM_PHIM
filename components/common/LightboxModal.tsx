import React, { useEffect } from 'react';
import { GARDEN_PHOTOS } from '../../constants/gardenData';

interface LightboxModalProps {
  photoIndex: number | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  allowNavigation?: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photoIndex,
  onClose,
  onPrev,
  onNext,
  allowNavigation = true,
}) => {
  useEffect(() => {
    if (photoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (allowNavigation && e.key === 'ArrowLeft' && onPrev) onPrev();
      if (allowNavigation && e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [photoIndex, onClose, onPrev, onNext, allowNavigation]);

  if (photoIndex === null) return null;

  const photo = GARDEN_PHOTOS[photoIndex];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh chi tiết"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl md:max-w-2xl lg:max-w-3xl w-full bg-[#FFF9F1] rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-4 sm:p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Floating Navigation Arrows */}
        {allowNavigation && onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Ảnh trước"
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center text-lg font-bold transition-all cursor-pointer border border-white/30"
          >
            ←
          </button>
        )}
        {allowNavigation && onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Ảnh tiếp theo"
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center text-lg font-bold transition-all cursor-pointer border border-white/30"
          >
            →
          </button>
        )}

        {/* Header / Close button */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#C9829B]/20">
          <span className="text-xs sm:text-sm font-semibold text-[#C9829B] tracking-wider uppercase">
            {photo.badge}
          </span>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ xem ảnh"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5DDE5]/60 hover:bg-[#F5DDE5] text-[#51433F] flex items-center justify-center text-sm font-bold transition-transform active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Photo Container */}
        <div className="relative my-4 w-full flex items-center justify-center max-h-[65vh] md:max-h-[75vh] rounded-2xl overflow-hidden bg-stone-100">
          <img
            src={photo.fileName}
            alt={photo.title}
            className="w-full h-auto max-h-[65vh] md:max-h-[75vh] object-contain rounded-2xl shadow-inner"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Caption & Poetic Note */}
        <div className="w-full text-center px-2">
          <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#51433F]">
            {photo.title}
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-[#51433F]/75 mt-1 font-sans">
            {photo.caption}
          </p>
          <p className="text-sm sm:text-base text-[#C9829B] mt-2 italic font-handwriting">
            "{photo.note}"
          </p>
        </div>

        {/* Navigation arrows if multiple / allowed */}
        {allowNavigation && (onPrev || onNext) ? (
          <div className="w-full flex justify-between items-center mt-3 pt-2.5 border-t border-[#C9829B]/15 text-xs sm:text-sm text-[#51433F]/60">
            {onPrev ? (
              <button
                onClick={onPrev}
                className="px-3.5 py-1 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-[#51433F] transition-all cursor-pointer font-medium"
              >
                ← Ảnh trước
              </button>
            ) : <span />}
            <span className="font-semibold text-[#C9829B]">
              {photoIndex + 1} / {GARDEN_PHOTOS.length}
            </span>
            {onNext ? (
              <button
                onClick={onNext}
                className="px-3.5 py-1 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-[#51433F] transition-all cursor-pointer font-medium"
              >
                Ảnh tiếp →
              </button>
            ) : <span />}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center mt-3 pt-2 border-t border-[#C9829B]/15 text-[11px] sm:text-xs text-[#51433F]/50">
            <span>Bấm ✕ hoặc phím Esc để đóng</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
