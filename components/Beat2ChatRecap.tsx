import React, { useState } from 'react';
import { BeatProps } from '../types';

const Beat2ChatRecap: React.FC<BeatProps> = ({ onNext, onBack }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3">
      {/* Badge 21 ngày */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs">
        <span>⏱️</span> Tròn 3 Tuần Nhắn Tin <span>💬</span>
      </div>

      <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center">
        <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 sm:mb-3 tracking-tight">
          Nhìn lại 21 ngày qua một chút...
        </h2>

        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-sm">
          Tính ra mới 3 tuần thôi nhưng hai đứa cũng kịp nói đủ thứ chuyện: từ công việc, deadline, đến mấy chuyện linh tinh sau giờ tan làm.
        </p>

        {/* Khung chat mô phỏng */}
        <div className="w-full max-w-xs bg-white/70 dark:bg-stone-900/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-rose-100 dark:border-rose-950/60 text-left mb-5 sm:mb-6 space-y-2 text-xs sm:text-sm shadow-xs">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl rounded-tr-none px-3.5 py-2 ml-auto max-w-[85%] shadow-xs">
            "20/10 có được ai tặng gì chưa đó?"
          </div>
          <div className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-2xl rounded-tl-none px-3.5 py-2 mr-auto max-w-[85%] border border-stone-200/60 dark:border-stone-700">
            "Chưa nha, đang đợi xem ai có lòng nè..."
          </div>
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl rounded-tr-none px-3.5 py-2 ml-auto max-w-[85%] shadow-xs">
            "Thế thì nhận tấm thiệp này trước nhé 😌"
          </div>
        </div>

        {!revealed ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
              Sau 21 ngày nói chuyện, có một điều anh phải công nhận...
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <span>Xem điều công nhận là gì 👀</span>
            </button>
          </div>
        ) : (
          /* Polaroid Photo 2 */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-[280px] sm:max-w-sm polaroid-frame rounded-2xl mb-5 sm:mb-6 text-center transform rotate-1 hover:rotate-0">
              <div className="washi-tape !bg-amber-400/30 !border-amber-500/40" />
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 relative flex items-center justify-center">
                <span className="text-3xl select-none">✨</span>
                <img
                  src="/images/1791793370116_2068672602398295483_5900182264671411439_ac3098f29e337619f9854e92c42ab10e.jpg"
                  alt="Khoảnh khắc 2"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-semibold mb-1">
                Khoảnh khắc #2
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 font-medium px-1">
                "Phong cách rất có gu, 10 điểm thanh lịch. Nhìn là thấy năng lượng tích cực rồi ✨"
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
                className="flex-1 sm:flex-initial px-6 sm:px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm group"
              >
                <span>Chặng tiếp theo</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beat2ChatRecap;
