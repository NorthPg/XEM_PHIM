import React from 'react';
import { Beat } from '../types';

interface HeaderProps {
  currentBeat: Beat;
  onRestart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentBeat,
  onRestart,
  isDarkMode,
  onToggleTheme,
}) => {
  const steps = [
    { id: 1, label: 'Mở quà' },
    { id: 2, label: '21 Ngày' },
    { id: 3, label: 'Thử thách' },
    { id: 4, label: 'Bí mật' },
    { id: 5, label: 'Tấm vé' },
  ];

  return (
    <header className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-2 border-b border-rose-200/40 dark:border-rose-950/40">
      {/* Brand & Logo */}
      <div 
        className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
        onClick={onRestart}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform text-base sm:text-lg">
          🎬
        </div>
        <div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-serif font-bold text-sm sm:text-lg text-rose-600 dark:text-rose-400 tracking-tight">
              Oct 20 Premiere
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 uppercase tracking-wider">
              VIP
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 block -mt-0.5">
            20/10 Gift for her
          </span>
        </div>
      </div>

      {/* Progress: Desktop Dots & Mobile Pill */}
      {currentBeat <= 5 && (
        <>
          {/* Desktop Dots */}
          <nav aria-label="Tiến trình máy tính" className="hidden sm:flex items-center gap-1.5">
            {steps.map((s) => {
              const isCompleted = currentBeat > s.id;
              const isCurrent = currentBeat === s.id;
              return (
                <div key={s.id} className="flex items-center gap-1">
                  <div
                    className={`flex items-center justify-center text-xs font-semibold rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 h-7 bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-2 ring-rose-300 dark:ring-rose-800 scale-105'
                        : isCompleted
                        ? 'w-6 h-6 bg-rose-200 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        : 'w-6 h-6 bg-stone-100 dark:bg-stone-800/80 text-stone-400'
                    }`}
                  >
                    {isCompleted ? '✓' : s.id}
                  </div>
                  {s.id < 5 && (
                    <div
                      className={`w-3.5 h-0.5 rounded transition-colors ${
                        isCompleted ? 'bg-rose-400 dark:bg-rose-800' : 'bg-stone-200 dark:bg-stone-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Step Badge */}
          <div className="flex sm:hidden items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100/90 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 text-xs font-bold shadow-xs">
            <span>Chặng {currentBeat}/5</span>
          </div>
        </>
      )}

      {/* Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onToggleTheme}
          aria-label="Đổi giao diện sáng/tối"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-stone-800 transition-colors border border-stone-200/60 dark:border-stone-800 text-sm"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {currentBeat > 1 && (
          <button
            onClick={onRestart}
            className="text-[11px] sm:text-xs font-medium text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-stone-800 transition-colors"
          >
            Làm lại
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
