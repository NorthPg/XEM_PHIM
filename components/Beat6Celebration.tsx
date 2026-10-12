import React, { useEffect, useState } from 'react';
import { InviteSelection } from '../types';

interface CelebrationProps {
  selection: InviteSelection;
  onRestart: () => void;
  onOpenSecretHeart: () => void;
}

const Beat6Celebration: React.FC<CelebrationProps> = ({
  selection,
  onRestart,
  onOpenSecretHeart,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate simple confetti in DOM
    const colors = ['#f43f5e', '#fb7185', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'];
    const container = document.body;
    const pieces: HTMLDivElement[] = [];

    for (let i = 0; i < 45; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = `${2.2 + Math.random() * 2}s`;
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      container.appendChild(piece);
      pieces.push(piece);
    }

    const cleanupTimer = setTimeout(() => {
      pieces.forEach((p) => p.remove());
    }, 4500);

    return () => {
      clearTimeout(cleanupTimer);
      pieces.forEach((p) => p.remove());
    };
  }, []);

  const handleCopy = async () => {
    const text = `Deal xem phim 20/10! 🎟️\nThể loại: ${selection.genre}\nBắp: ${selection.popcorn}\nChốt lịch anh đón em nhé!`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard failed, showing prompt:', err);
      window.prompt('Sao chép nội dung tin nhắn để gửi cho anh:', text);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3 animate-fade-in">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-xl shadow-rose-500/25 animate-bounce">
        🎉
      </div>

      <h1 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1.5 sm:mb-2 tracking-tight">
        Kèo xem phim đã được chốt!
      </h1>

      <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mb-5 sm:mb-6 max-w-xs">
        Vé xem phim và combo bắp nước 20/10 của em đã sẵn sàng.
      </p>

      {/* Chiếc vé xem phim VIP độc quyền với khuyết răng cưa 2 bên */}
      <div className="w-full max-w-sm cinema-ticket p-4 sm:p-6 shadow-2xl relative text-left mb-5 sm:mb-6">
        {/* Scalloped notches */}
        <div className="ticket-notch-left" />
        <div className="ticket-notch-right" />

        {/* Header vé */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-dashed border-rose-200 dark:border-rose-900/60 mb-3.5 sm:mb-4">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-rose-500 block">
              ★ OFFICIAL VIP PREMIERE PASS ★
            </span>
            <span className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 gold-shimmer">
              Buổi Hẹn Ngày 20/10
            </span>
          </div>
          <span className="text-2xl sm:text-3xl animate-pulse">🍿</span>
        </div>

        {/* Thông tin vé */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs mb-4 sm:mb-5">
          <div className="bg-rose-50/70 dark:bg-stone-900/80 p-2 sm:p-2.5 rounded-xl border border-rose-100 dark:border-rose-950/60">
            <span className="text-stone-400 dark:text-stone-500 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Khách mời VIP</span>
            <span className="font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm truncate block">Cô gái dễ thương</span>
          </div>
          <div className="bg-rose-50/70 dark:bg-stone-900/80 p-2 sm:p-2.5 rounded-xl border border-rose-100 dark:border-rose-950/60">
            <span className="text-stone-400 dark:text-stone-500 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Thời gian</span>
            <span className="font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm truncate block">Dịp 20/10 (Giờ linh hoạt)</span>
          </div>
          <div className="bg-rose-50/70 dark:bg-stone-900/80 p-2 sm:p-2.5 rounded-xl border border-rose-100 dark:border-rose-950/60">
            <span className="text-stone-400 dark:text-stone-500 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Thể loại phim</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm truncate block">{selection.genre}</span>
          </div>
          <div className="bg-rose-50/70 dark:bg-stone-900/80 p-2 sm:p-2.5 rounded-xl border border-rose-100 dark:border-rose-950/60">
            <span className="text-stone-400 dark:text-stone-500 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Combo bắp nước</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 text-xs sm:text-sm truncate block">{selection.popcorn}</span>
          </div>
        </div>

        {/* Barcode & Verified Seal */}
        <div className="pt-2.5 sm:pt-3 border-t-2 border-dashed border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs text-stone-500">
          <div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-stone-400">||| | |||| | ||| |||| |</div>
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-700 dark:text-stone-300">#2010-OCT-VIP-PASS</span>
          </div>
          <span className="text-[10px] sm:text-[11px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold shadow-xs">
            ✓ Đã xác nhận 100%
          </span>
        </div>
      </div>

      {/* Nút quà bí mật: Trái tim Lý Tuân */}
      <div className="w-full mb-4 sm:mb-5 flex justify-center">
        <button
          onClick={onOpenSecretHeart}
          className="w-full sm:w-auto px-6 sm:px-7 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl shadow-rose-500/25 text-xs sm:text-sm transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 animate-soft-pulse border border-amber-300/40"
        >
          <span>✨ Mở món quà bí mật của dân IT 💖</span>
        </button>
      </div>

      {/* Hành động copy & xem lại */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold rounded-xl sm:rounded-2xl border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
        >
          <span>{copied ? 'Đã sao chép nội dung! ✓' : 'Sao chép tin nhắn gửi cho anh 📋'}</span>
        </button>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-5 py-3 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs sm:text-sm font-medium transition-colors"
        >
          Xem lại từ đầu 🔄
        </button>
      </div>

      <p className="text-[11px] sm:text-xs text-stone-400 mt-4 sm:mt-5">
        (Chụp màn hình chiếc vé này gửi cho anh để chốt rạp và giờ anh đón em nhé!)
      </p>
    </div>
  );
};

export default Beat6Celebration;
