import React, { useEffect } from 'react';
import { GARDEN_PHOTOS } from '../../constants/gardenData';

interface LightboxModalProps {
  photoIndex: number | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photoIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (photoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [photoIndex, onClose, onPrev, onNext]);

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
        className="relative max-w-xl w-full bg-[#FFF9F1] rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-3 sm:p-5 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Close button */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#C9829B]/20">
          <span className="text-xs font-semibold text-[#C9829B] tracking-wider uppercase">
            {photo.badge}
          </span>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ xem ảnh"
            className="w-8 h-8 rounded-full bg-[#F5DDE5]/60 hover:bg-[#F5DDE5] text-[#51433F] flex items-center justify-center text-sm font-bold transition-transform active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Photo Container */}
        <div className="relative my-4 w-full flex items-center justify-center max-h-[65vh] rounded-lg overflow-hidden bg-stone-100">
          <img
            src={photo.fileName}
            alt={photo.title}
            className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-inner"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Caption & Poetic Note */}
        <div className="w-full text-center px-2">
          <h4 className="font-serif text-lg font-semibold text-[#51433F]">
            {photo.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#51433F]/75 mt-1 font-sans">
            {photo.caption}
          </p>
          <p className="text-xs sm:text-sm text-[#C9829B] mt-2 italic font-handwriting text-base">
            "{photo.note}"
          </p>
        </div>

        {/* Navigation arrows if multiple */}
        <div className="w-full flex justify-between items-center mt-3 pt-2 border-t border-[#C9829B]/15 text-xs text-[#51433F]/60">
          {onPrev ? (
            <button
              onClick={onPrev}
              className="px-3 py-1 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-[#51433F] transition-all"
            >
              ← Ảnh trước
            </button>
          ) : <span />}
          <span>{photoIndex + 1} / {GARDEN_PHOTOS.length}</span>
          {onNext ? (
            <button
              onClick={onNext}
              className="px-3 py-1 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-[#51433F] transition-all"
            >
              Ảnh tiếp →
            </button>
          ) : <span />}
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
