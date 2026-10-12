import React, { useState } from 'react';
import { InviteSelection } from '../types';

interface Beat5Props {
  onConfirm: (selection: InviteSelection) => void;
  onBack?: () => void;
}

const Beat5MovieInvite: React.FC<Beat5Props> = ({ onConfirm, onBack }) => {
  const [selectedGenre, setSelectedGenre] = useState('Hài hước xả stress');
  const [selectedPopcorn, setSelectedPopcorn] = useState('Phô mai béo ngậy');
  const [teaseMessage, setTeaseMessage] = useState<string | null>(null);

  const genres = [
    { label: 'Hài hước xả stress', icon: '😂' },
    { label: 'Hoạt hình / Anime dễ thương', icon: '🎨' },
    { label: 'Kinh dị (nếu em dũng cảm)', icon: '👻' },
    { label: 'Hành động / Trinh thám gay cấn', icon: '🕵️' },
  ];

  const popcorns = [
    { label: 'Phô mai béo ngậy', icon: '🧀' },
    { label: 'Bắp ngọt truyền thống', icon: '🍿' },
    { label: 'Caramel ngọt ngào', icon: '🍯' },
  ];

  const handleHesitate = () => {
    setTeaseMessage(
      'Cam kết thái độ phục vụ 5 sao: đưa đón tận nơi (nếu em tiện), bao trọn bắp nước và tuyệt đối không spoil phim!'
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-3 sm:py-6 px-3">
      {/* Badge Món quà 20/10 */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs">
        <span>🎟️</span> Món Quà 20/10 Chính Thức <span>🎁</span>
      </div>

      <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center">
        <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 sm:mb-3 tracking-tight">
          Tấm vé xem phim ngày 20/10
        </h2>

        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-sm">
          Sau 3 tuần trò chuyện qua màn hình điện thoại 6 inch, nhân ngày 20/10, anh muốn tặng em một buổi tối thư giãn và xem phim trên màn ảnh rộng 500 inch cùng nhau!
        </p>

        {/* Khảo sát vị bắp & thể loại phim */}
        <div className="w-full bg-rose-50/60 dark:bg-stone-900/70 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-rose-200/50 dark:border-rose-950/60 text-left mb-5 sm:mb-6 space-y-3.5 sm:space-y-4 shadow-xs">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              1. Em thích xem thể loại gì nè?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {genres.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => setSelectedGenre(g.label)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2 text-left transition-all ${
                    selectedGenre === g.label
                      ? 'border-rose-500 bg-white dark:bg-stone-800 text-rose-600 dark:text-rose-400 shadow-sm ring-2 ring-rose-400/40'
                      : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="text-base shrink-0">{g.icon}</span>
                  <span className="truncate">{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              2. Vị bắp rang bơ chân ái của em:
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {popcorns.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSelectedPopcorn(p.label)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    selectedPopcorn === p.label
                      ? 'border-rose-500 bg-white dark:bg-stone-800 text-rose-600 dark:text-rose-400 shadow-sm ring-2 ring-rose-400/40'
                      : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="text-base">{p.icon}</span>
                  <span className="text-center text-[10px] sm:text-[11px] font-semibold leading-tight">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Thông báo trêu nếu bấm xem xét */}
        {teaseMessage && (
          <div className="w-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 text-xs text-amber-800 dark:text-amber-200 mb-4 sm:mb-5 animate-fade-in text-left shadow-xs">
            ⭐ {teaseMessage}
          </div>
        )}

        {/* 2 Nút hành động */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <button
            onClick={() =>
              onConfirm({
                genre: selectedGenre,
                popcorn: selectedPopcorn,
                confirmed: true,
              })
            }
            className="w-full sm:flex-1 py-3.5 px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <span>Đi chớ, quà 20/10 tội gì từ chối! 🍿</span>
          </button>

          <button
            type="button"
            onClick={handleHesitate}
            className="w-full sm:w-auto py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs sm:text-sm font-medium transition-colors"
          >
            Để xem thái độ đã... 🧐
          </button>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-3.5 sm:mt-4 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
          >
            Quay lại bước trước
          </button>
        )}
      </div>
    </div>
  );
};

export default Beat5MovieInvite;
