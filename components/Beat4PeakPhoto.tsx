import React, { useState } from 'react';
import { BeatProps } from '../types';

const Beat4PeakPhoto: React.FC<BeatProps> = ({ onNext, onBack }) => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3">
      {/* Badge Bức ảnh đặc biệt */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs">
        <span>🔒</span> Bức Ảnh Đặc Biệt Nhất <span>✨</span>
      </div>

      <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center">
        {!unlocked ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl sm:text-3xl shadow-xl shadow-emerald-500/25 mb-4 sm:mb-5 hover:scale-105 transition-transform">
              🔐
            </div>

            <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
              Bức ảnh thứ 5 đang được bảo mật
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-xs">
              Đây là tấm ảnh mà anh ưng ý nhất trong suốt 3 tuần qua. Cần có sự đồng ý của chính chủ mới mở được nè.
            </p>

            <button
              onClick={() => setUnlocked(true)}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <span>Cho phép anh mở khóa bức ảnh này 🔓</span>
            </button>
          </div>
        ) : (
          /* Mở khóa Polaroid #5 với viền vàng champagne */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1 tracking-tight">
              Khoảnh khắc ấn tượng nhất ✨
            </h2>

            <p className="text-stone-500 dark:text-stone-400 text-[11px] sm:text-xs mb-4 sm:mb-5">
              Được bảo lưu độc quyền từ bộ sưu tập 20/10
            </p>

            <div className="w-full max-w-[280px] sm:max-w-sm polaroid-frame rounded-2xl mb-5 sm:mb-6 text-center ring-2 ring-amber-400/50 shadow-2xl">
              <div className="washi-tape !bg-amber-400/40 !border-amber-500/50" />
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 relative flex items-center justify-center">
                <span className="text-3xl select-none">👑</span>
                <img
                  src="/images/1791793370533_2068672602398295483_5900182264671411439_55fe58dfa23c011e051bcf4bab44d619.jpg"
                  alt="Khoảnh khắc 5"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-bold mb-1 shadow-xs">
                ⭐ Top Favorite Moment
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 font-medium px-1">
                "Chốt lại là ảnh nào em cũng xinh xắn, nhưng nghe bảo gặp ngoài đời còn cuốn hút hơn nhiều..."
              </p>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs sm:text-sm font-medium transition-colors"
                >
                  Quay lại
                </button>
              )}
              <button
                onClick={onNext}
                className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm group"
              >
                <span>Nhận món quà 20/10 quan trọng nhất</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beat4PeakPhoto;
