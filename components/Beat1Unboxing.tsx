import React, { useState } from 'react';
import { BeatProps } from '../types';

const Beat1Unboxing: React.FC<BeatProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3">
      {/* 20/10 Badge */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs">
        <span>🌸</span> 20 Tháng 10 • Ngày Phụ Nữ VN <span>🌸</span>
      </div>

      {!isOpen ? (
        /* Trạng thái chưa mở phong thư */
        <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col items-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 sm:w-40 h-32 sm:h-40 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Phong bì thư với sáp niêm phong */}
          <div className="relative mb-5 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-rose-500/25 rotate-3 hover:rotate-0 transition-transform duration-500">
              💌
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 dark:bg-amber-500 border-2 border-white dark:border-stone-900 flex items-center justify-center text-[10px] sm:text-xs font-bold text-amber-950 shadow-md">
              20.10
            </div>
          </div>

          <h1 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2.5 sm:mb-3 tracking-tight">
            Gửi em, cô gái mới quen 3 tuần...
          </h1>

          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm">
            Hôm nay là 20/10, ngày em xứng đáng nhận được những điều dễ thương nhất. Có một lá thư nhỏ và một bất ngờ anh dành riêng cho em ở đây.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-sm"
          >
            <span>Mở quà 20/10</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>
      ) : (
        /* Sau khi mở thư: Lời chúc & Khung ảnh Polaroid 1 */
        <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center animate-fade-in relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 shadow-inner">
            💐
          </div>

          <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2.5 sm:mb-3 tracking-tight">
            Chúc mừng ngày 20/10 của em!
          </h2>

          <div className="bg-rose-50/70 dark:bg-stone-900/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-left text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed mb-5 sm:mb-6 border border-rose-200/50 dark:border-rose-900/30">
            <p className="mb-2">
              Chúc em hôm nay và cả những ngày sau đều luôn rạng rỡ, xinh đẹp, công việc thuận lợi và cười thật nhiều nhé!
            </p>
            <p className="text-stone-500 dark:text-stone-400 text-[11px] sm:text-xs italic">
              (Tính gửi tin nhắn bình thường thôi, nhưng thấy 20/10 mà nhắn tin chay thì hơi thiếu chỉn chu, nên tự tay gõ chiếc web này cho uy tín ✌️)
            </p>
          </div>

          {/* Polaroid Photo 1 */}
          <div className="w-full max-w-[280px] sm:max-w-sm polaroid-frame rounded-2xl mb-5 sm:mb-6 text-center transform -rotate-1 hover:rotate-0">
            <div className="washi-tape" />
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 relative flex items-center justify-center">
              <span className="text-3xl select-none">🌸</span>
              <img
                src="/images/1791793370024_2068672602398295483_5900182264671411439_42e0d52acf290aa05972c3686f0cb70c.jpg"
                alt="Khoảnh khắc 1"
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 text-[11px] font-semibold mb-1">
              Khoảnh khắc #1: Đón Giáng Sinh 🎄
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 font-medium px-1">
              "Bờm tuần lộc đỏ, áo blazer kẻ bên cây thông Noel... Nhìn tấm này hiền khô dịu dàng, khác hẳn những lúc nhắn tin bắt bẻ anh 😉"
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-xs sm:text-sm"
          >
            <span>Tiếp tục xem có gì nữa không</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Beat1Unboxing;
