import React, { useState } from 'react';
import { BeatProps } from '../types';

const Beat3MiniQuiz: React.FC<BeatProps> = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: 'A', text: 'Được nhận hoa và nhiều lời chúc xinh đẹp 💐' },
    { id: 'B', text: 'Được về sớm, không bị ai dí deadline 🏃‍♀️' },
    { id: 'C', text: 'Được anh rủ đi chơi và bao trọn gói bắp nước 🍿' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3">
      {/* Badge Mini Quiz */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-100/80 dark:bg-violet-950/70 border border-violet-200 dark:border-violet-900/60 text-violet-700 dark:text-violet-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs">
        <span>🎯</span> Thử Thách Nhỏ Ngày 20/10 <span>🤔</span>
      </div>

      <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center">
        <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
          Khảo sát nhanh dành riêng cho em
        </h2>

        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-sm">
          Theo kinh nghiệm của em, điều gì sẽ khiến ngày 20/10 của một cô gái trở nên trọn vẹn nhất?
        </p>

        {/* Danh sách lựa chọn */}
        <div className="w-full space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2.5 ${
                selectedOption === opt.id
                  ? 'border-violet-500 bg-violet-50/90 dark:bg-violet-950/50 text-violet-900 dark:text-violet-200 shadow-md ring-2 ring-violet-400 dark:ring-violet-700'
                  : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span>{opt.text}</span>
              <span className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 font-bold shrink-0">
                {opt.id}
              </span>
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-900/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-violet-800 dark:text-violet-200 mb-5 sm:mb-6 shadow-xs">
              {selectedOption === 'C' ? (
                <span>🎉 <strong>Đáp án hoàn hảo!</strong> Rất có tầm nhìn và thực tế. Mở khóa thêm 2 khoảnh khắc nè!</span>
              ) : (
                <span>✨ <strong>Quá chuẩn!</strong> Nhưng bật mí thêm: Nếu kết hợp thêm đáp án C nữa thì điểm 10 luôn đó. Xem tiếp nè!</span>
              )}
            </div>

            {/* Mở khóa 2 Polaroid: Ảnh 3 và Ảnh 4 so le */}
            <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-4 mb-5 sm:mb-6">
              {/* Ảnh 3 */}
              <div className="polaroid-frame rounded-xl sm:rounded-2xl text-center transform sm:-rotate-1 hover:rotate-0 p-2.5 sm:p-3.5">
                <div className="washi-tape !w-12 sm:!w-16" />
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2 relative flex items-center justify-center">
                  <span className="text-2xl select-none">😊</span>
                  <img
                    src="/images/1791793370229_2068672602398295483_5900182264671411439_efd2ec05a90f66cae482122334369e5b.jpg"
                    alt="Khoảnh khắc 3"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 text-[10px] sm:text-[11px] font-semibold mb-1">
                  Khoảnh khắc #3
                </div>
                <p className="text-[11px] sm:text-xs text-stone-700 dark:text-stone-200 font-medium leading-snug">
                  "Nụ cười tươi tắn, nhiều năng lượng tích cực 😊"
                </p>
              </div>

              {/* Ảnh 4 */}
              <div className="polaroid-frame rounded-xl sm:rounded-2xl text-center transform sm:rotate-1 hover:rotate-0 p-2.5 sm:p-3.5">
                <div className="washi-tape !w-12 sm:!w-16 !bg-violet-400/30 !border-violet-500/40" />
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2 relative flex items-center justify-center">
                  <span className="text-2xl select-none">💫</span>
                  <img
                    src="/images/1791793370412_2068672602398295483_5900182264671411439_9b0b7219c1d8d384070231e4c3f2c332.jpg"
                    alt="Khoảnh khắc 4"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 text-[10px] sm:text-[11px] font-semibold mb-1">
                  Khoảnh khắc #4
                </div>
                <p className="text-[11px] sm:text-xs text-stone-700 dark:text-stone-200 font-medium leading-snug">
                  "Thần thái cô gái bận rộn nhưng vẫn nhớ rep tin nhắn 👏"
                </p>
              </div>
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
                <span>Mở khóa ảnh cuối cùng</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beat3MiniQuiz;
