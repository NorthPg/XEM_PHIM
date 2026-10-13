import React, { useState } from 'react';
import { GARDEN_PHOTOS, FINAL_LETTER_CONTENT } from '../../constants/gardenData';
import PolaroidCard from '../widgets/PolaroidCard';
import PrimaryButton from '../common/PrimaryButton';

interface Screen7LetterProps {
  onRestart: () => void;
  onOpenLightbox?: (index: number) => void;
  onOpenSecretCinema?: () => void;
  onOpenSecretHeart?: () => void;
}

export const Screen7Letter: React.FC<Screen7LetterProps> = ({
  onRestart,
  onOpenLightbox,
  onOpenSecretCinema,
  onOpenSecretHeart,
}) => {
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(true);
  const heroPhoto = GARDEN_PHOTOS[4]; // Photo 5

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center px-4 py-8 animate-fade-in space-y-8">
      {/* Top Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5DDE5]/80 border border-[#C9829B]/40 text-xs font-semibold text-[#C9829B] tracking-wider uppercase">
        <span>🌷</span> 20 • 10 • HAPPY VIETNAMESE WOMEN'S DAY
      </div>

      <div className="space-y-1">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#51433F]">
          Món Quà Hoàn Chỉnh Dành Cho Em
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#C9829B]">
          Khu vườn nhỏ đã nở trọn vẹn 5 sắc hoa ✨
        </p>
      </div>

      {/* HERO PHOTO 5 SHOWCASE */}
      <div className="w-full max-w-sm mx-auto p-4 rounded-3xl bg-white shadow-xl border-2 border-[#C9829B]/30 relative group">
        <div className="washi-tape" />
        <span className="text-[11px] font-bold text-[#C9829B] uppercase tracking-wider block mb-2">
          {heroPhoto.badge}
        </span>
        <div
          onClick={() => onOpenLightbox && onOpenLightbox(4)}
          className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 cursor-pointer shadow-inner"
        >
          <img
            src={heroPhoto.fileName}
            alt={heroPhoto.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-medium drop-shadow-sm">
              🔍 Chạm để xem ảnh lớn
            </span>
          </div>
        </div>
        <p className="font-handwriting text-2xl text-[#C9829B] mt-3">
          "{heroPhoto.note}"
        </p>
      </div>

      {/* WAX-SEALED LETTER CARD */}
      <div className="w-full rounded-3xl bg-[#FFFDF9] border-2 border-[#C9829B]/30 shadow-2xl p-6 sm:p-8 text-left relative overflow-hidden">
        {/* Decorative corner ribbons */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#F5DDE5] to-transparent pointer-events-none" />

        {/* Envelope Seal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C9829B]/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💌</span>
            <span className="font-serif font-bold text-lg text-[#51433F]">
              Bức Thư Chúc Mừng 20/10
            </span>
          </div>
          <button
            onClick={() => setIsLetterOpen(!isLetterOpen)}
            className="text-xs px-3 py-1 rounded-full bg-[#F5DDE5]/60 hover:bg-[#F5DDE5] text-[#51433F] transition-all cursor-pointer"
          >
            {isLetterOpen ? 'Thu gọn thư ∧' : 'Đọc bức thư ∨'}
          </button>
        </div>

        {/* Letter Body */}
        {isLetterOpen && (
          <div className="mt-6 space-y-4 text-sm sm:text-base text-[#51433F] leading-relaxed animate-fade-in font-sans">
            <h3 className="font-serif font-bold text-xl text-[#C9829B]">
              {FINAL_LETTER_CONTENT.salutation}
            </h3>

            {FINAL_LETTER_CONTENT.paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line text-[#51433F]/90">
                {p}
              </p>
            ))}

            <div className="pt-4 border-t border-[#C9829B]/20 text-center sm:text-right space-y-1">
              <p className="font-serif font-semibold text-base text-[#C9829B]">
                {FINAL_LETTER_CONTENT.closing}
              </p>
              <p className="font-handwriting text-xl text-[#51433F]/80">
                {FINAL_LETTER_CONTENT.signature}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FULL 5-PHOTO ALBUM GALLERY */}
      <div className="w-full pt-4 space-y-5">
        <div className="text-center">
          <span className="text-xs font-semibold text-[#C9829B] tracking-wider uppercase">
            Album Kỷ Niệm 5 Bông Hoa
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#51433F] mt-1">
            Góc Lưu Giữ Những Nụ Cười
          </h3>
          <p className="text-xs text-[#51433F]/60 mt-0.5">
            Chạm vào bất kỳ ảnh nào để xem phóng to chi tiết
          </p>
        </div>

        {/* 5-Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GARDEN_PHOTOS.map((photo, index) => (
            <div key={photo.id} className="flex justify-center">
              <PolaroidCard
                photo={photo}
                onOpenLightbox={() => onOpenLightbox && onOpenLightbox(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECRET EASTER EGG: RẠP CHIẾU PHIM & ACOUSTIC (BEFORE LY TUAN HEART) */}
      {(onOpenSecretCinema || onOpenSecretHeart) && (
        <div className="w-full max-w-md mx-auto p-5 rounded-3xl bg-gradient-to-r from-[#2A1622] via-[#3B1C2E] to-[#20101A] border-2 border-[#C9829B]/40 shadow-xl flex flex-col items-center text-center animate-breathing my-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFE17D] tracking-wider uppercase mb-1">
            <span>✨</span> MÓN QUÀ BÍ MẬT DÀNH RIÊNG CHO EM <span>✨</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-white mt-1">
            Góc Chiếu Phim & Bản Acoustic Bí Mật
          </h4>
          <p className="text-xs text-rose-200/80 mt-1 max-w-xs leading-relaxed">
            Một tấm vé đặc biệt đưa em đến rạp phim Lofi ấm cúng cùng giai điệu tiếng đàn mộc mạc...
          </p>
          <button
            onClick={onOpenSecretCinema || onOpenSecretHeart}
            className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9829B] to-rose-500 text-white font-medium text-sm shadow-lg shadow-rose-900/50 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
          >
            <span>Nhận vé vào rạp phim bí mật</span>
            <span className="text-base animate-pulse">🎬🎸</span>
          </button>
        </div>
      )}

      {/* REPLAY ACTION */}
      <div className="pt-4 pb-4 flex flex-col items-center space-y-3">
        <PrimaryButton
          onClick={onRestart}
          variant="secondary"
          size="lg"
          icon={<span>🔄</span>}
          className="shadow-sm"
        >
          Khám phá lại khu vườn từ đầu
        </PrimaryButton>
        <span className="text-xs text-[#51433F]/50">
          The Little Garden • Chúc em luôn rạng rỡ và hạnh phúc 🌸
        </span>
      </div>
    </div>
  );
};

export default Screen7Letter;
