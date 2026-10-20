import React, { useState } from 'react';
import { GardenScreenStep } from './types/garden';
import { GARDEN_PHOTOS } from './constants/gardenData';

// Common Components
import GardenHeader from './components/common/GardenHeader';
import FallingPetals from './components/common/FallingPetals';
import LightboxModal from './components/common/LightboxModal';

// Screen Components
import Screen1Gate from './components/screens/Screen1Gate';
import Screen2Flowers from './components/screens/Screen2Flowers';
import Screen3Polaroid from './components/screens/Screen3Polaroid';
import Screen4Fireflies from './components/screens/Screen4Fireflies';
import Screen5Puzzle from './components/screens/Screen5Puzzle';
import Screen6GiftBox from './components/screens/Screen6GiftBox';
import Screen7Letter from './components/screens/Screen7Letter';
import SecretCinemaScreen from './components/screens/SecretCinemaScreen';
import LyTuanHeart from './components/LyTuanHeart';

export const App: React.FC = () => {
  // Navigation & Progress State
  const [currentStep, setCurrentStep] = useState<GardenScreenStep>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<GardenScreenStep>(1);

  // Mini-Game State Containers
  const [awakenedFlowers, setAwakenedFlowers] = useState<number[]>([]);
  const [isFirefliesCompleted, setIsFirefliesCompleted] = useState<boolean>(false);
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState<boolean>(false);
  const [selectedGiftBoxId, setSelectedGiftBoxId] = useState<string | null>(null);

  // Common UI State: Lightbox, Music & Secret Easter Eggs
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isSecretCinemaOpen, setIsSecretCinemaOpen] = useState<boolean>(false);
  const [isSecretHeartOpen, setIsSecretHeartOpen] = useState<boolean>(false);

  // Step advancement logic
  const goToStep = (step: GardenScreenStep) => {
    setCurrentStep(step);
    if (step > maxUnlockedStep) {
      setMaxUnlockedStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep < 7) {
      const next = (currentStep + 1) as GardenScreenStep;
      goToStep(next);
      // Automatically attempt gentle audio playback on first interaction if not playing yet
      if (!isAudioPlaying && currentStep === 1) {
        setIsAudioPlaying(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prev = (currentStep - 1) as GardenScreenStep;
      goToStep(prev);
    }
  };

  const restartGarden = () => {
    setCurrentStep(1);
    setMaxUnlockedStep(1);
    setAwakenedFlowers([]);
    setIsFirefliesCompleted(false);
    setIsPuzzleCompleted(false);
    setSelectedGiftBoxId(null);
    setIsSecretCinemaOpen(false);
    setIsSecretHeartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightboxPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => ((prev! + 1) % GARDEN_PHOTOS.length));
    }
  };

  const prevLightboxPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev! === 0 ? GARDEN_PHOTOS.length - 1 : prev! - 1
      );
    }
  };

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  // Game specific callbacks
  const handleFlowerAwakened = (idx: number) => {
    if (!awakenedFlowers.includes(idx)) {
      setAwakenedFlowers((prev) => [...prev, idx]);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFF9F1] text-[#51433F] overflow-x-hidden selection:bg-[#C9829B] selection:text-white">
      {/* Ambient background glows for magical garden atmosphere */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1100px] h-[400px] lg:h-[550px] bg-gradient-to-b from-[#F5DDE5]/40 via-[#FFEBF0]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] lg:w-[800px] h-[350px] lg:h-[500px] bg-gradient-to-t from-[#B7C9AE]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Petals ambient particle overlay */}
      <FallingPetals />

      {/* Top Garden Header */}
      <GardenHeader
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        onGoToStep={goToStep}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onStartAudio={() => setIsAudioPlaying(true)}
        onRestart={restartGarden}
      />

      {/* Main Content Area: 7 Screens */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 md:py-10 px-3 sm:px-6 md:px-8 max-w-5xl xl:max-w-6xl mx-auto w-full transition-all">
        {currentStep === 1 && (
          <Screen1Gate
            onNext={nextStep}
            isAudioPlaying={isAudioPlaying}
            onStartAudio={() => setIsAudioPlaying(true)}
          />
        )}

        {currentStep === 2 && (
          <Screen2Flowers
            onNext={nextStep}
            onPrev={prevStep}
            onFlowerAwakened={handleFlowerAwakened}
            awakenedFlowers={awakenedFlowers}
          />
        )}

        {currentStep === 3 && (
          <Screen3Polaroid
            onNext={nextStep}
            onPrev={prevStep}
            onOpenLightbox={openLightbox}
          />
        )}

        {currentStep === 4 && (
          <Screen4Fireflies
            onNext={nextStep}
            onPrev={prevStep}
            onOpenLightbox={openLightbox}
            isAlreadyCompleted={isFirefliesCompleted}
            onFirefliesCompleted={() => setIsFirefliesCompleted(true)}
          />
        )}

        {currentStep === 5 && (
          <Screen5Puzzle
            onNext={nextStep}
            onPrev={prevStep}
            onOpenLightbox={openLightbox}
            isAlreadyCompleted={isPuzzleCompleted}
            onPuzzleCompleted={() => setIsPuzzleCompleted(true)}
          />
        )}

        {currentStep === 6 && (
          <Screen6GiftBox
            onNext={nextStep}
            onPrev={prevStep}
            onOpenLightbox={openLightbox}
            onGiftBoxSelected={(boxId) => setSelectedGiftBoxId(boxId)}
            selectedBoxId={selectedGiftBoxId}
          />
        )}

        {currentStep === 7 && (
          <Screen7Letter
            onRestart={restartGarden}
            onOpenLightbox={openLightbox}
            onOpenSecretCinema={() => setIsSecretCinemaOpen(true)}
            onOpenSecretHeart={() => setIsSecretHeartOpen(true)}
          />
        )}
      </main>

      {/* Secret Easter Egg 1: Lofi Cinema & Acoustic Guitar Singing */}
      {isSecretCinemaOpen && (
        <SecretCinemaScreen
          onBack={() => setIsSecretCinemaOpen(false)}
          onProceedToHeart={() => {
            setIsSecretCinemaOpen(false);
            setIsSecretHeartOpen(true);
          }}
          onPauseBgm={() => setIsAudioPlaying(false)}
          onResumeBgm={() => setIsAudioPlaying(true)}
        />
      )}

      {/* Secret Easter Egg 2: Ly Tuan Beating Heart */}
      {isSecretHeartOpen && (
        <LyTuanHeart onBack={() => setIsSecretHeartOpen(false)} />
      )}

      {/* Fullscreen Photo Lightbox Modal (Only allow browsing between photos on Screen 7 Album) */}
      <LightboxModal
        photoIndex={activeLightboxIndex}
        onClose={closeLightbox}
        onNext={currentStep === 7 ? nextLightboxPhoto : undefined}
        onPrev={currentStep === 7 ? prevLightboxPhoto : undefined}
        allowNavigation={currentStep === 7}
      />

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#51433F]/60 border-t border-[#C9829B]/15">
        <p className="font-serif">The Little Garden • A Little Surprise for You</p>
        <p className="mt-0.5 text-[11px] text-[#C9829B]">
          Happy Vietnamese Women's Day 20/10 🌸
        </p>
      </footer>
    </div>
  );
};

export default App;
