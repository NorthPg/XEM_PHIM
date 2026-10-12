import React, { useState, useEffect } from 'react';
import { Beat, InviteSelection } from './types';
import Header from './components/Header';
import Beat1Unboxing from './components/Beat1Unboxing';
import Beat2ChatRecap from './components/Beat2ChatRecap';
import Beat3MiniQuiz from './components/Beat3MiniQuiz';
import Beat4PeakPhoto from './components/Beat4PeakPhoto';
import Beat5MovieInvite from './components/Beat5MovieInvite';
import Beat6Celebration from './components/Beat6Celebration';
import LyTuanHeart from './components/LyTuanHeart';

const App: React.FC = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat>(Beat.UNBOXING);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inviteSelection, setInviteSelection] = useState<InviteSelection>({
    genre: 'Hài hước xả stress',
    popcorn: 'Phô mai béo ngậy',
    confirmed: false,
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const nextBeat = () => {
    if (currentBeat < Beat.CELEBRATION) {
      setCurrentBeat((prev) => (prev + 1) as Beat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevBeat = () => {
    if (currentBeat > Beat.UNBOXING) {
      setCurrentBeat((prev) => (prev - 1) as Beat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const restart = () => {
    setCurrentBeat(Beat.UNBOXING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleConfirmInvite = (selection: InviteSelection) => {
    setInviteSelection(selection);
    setCurrentBeat(Beat.CELEBRATION);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSecretHeart = () => {
    setCurrentBeat(Beat.SECRET_HEART);
  };

  const closeSecretHeart = () => {
    setCurrentBeat(Beat.CELEBRATION);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fffafb] dark:bg-[#120a0e] text-stone-800 dark:text-stone-100 transition-colors duration-500 overflow-x-hidden">
      {/* Decorative ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-rose-200/40 via-pink-100/20 to-transparent dark:from-rose-950/20 dark:via-pink-950/10 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header (Ẩn khi đang mở màn trái tim toàn màn hình) */}
      {currentBeat !== Beat.SECRET_HEART && (
        <Header
          currentBeat={currentBeat}
          onRestart={restart}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleDarkMode}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3">
        {currentBeat === Beat.UNBOXING && (
          <Beat1Unboxing onNext={nextBeat} onRestart={restart} />
        )}
        {currentBeat === Beat.RECAP && (
          <Beat2ChatRecap onNext={nextBeat} onBack={prevBeat} onRestart={restart} />
        )}
        {currentBeat === Beat.QUIZ && (
          <Beat3MiniQuiz onNext={nextBeat} onBack={prevBeat} onRestart={restart} />
        )}
        {currentBeat === Beat.PEAK_PHOTO && (
          <Beat4PeakPhoto onNext={nextBeat} onBack={prevBeat} onRestart={restart} />
        )}
        {currentBeat === Beat.INVITE && (
          <Beat5MovieInvite onConfirm={handleConfirmInvite} onBack={prevBeat} />
        )}
        {currentBeat === Beat.CELEBRATION && (
          <Beat6Celebration
            selection={inviteSelection}
            onRestart={restart}
            onOpenSecretHeart={openSecretHeart}
          />
        )}
        {currentBeat === Beat.SECRET_HEART && (
          <LyTuanHeart onBack={closeSecretHeart} />
        )}
      </main>

      {/* Footer */}
      {currentBeat !== Beat.SECRET_HEART && (
        <footer className="py-5 text-center text-xs text-stone-400 dark:text-stone-600">
          <p>Made with sincere thoughts • Happy Vietnamese Women's Day 20/10 🌸</p>
        </footer>
      )}
    </div>
  );
};

export default App;
