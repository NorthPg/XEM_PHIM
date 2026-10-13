import React, { useRef, useState, useEffect } from 'react';
import { AUDIO_TRACK_URL, AUDIO_TRACK_NAME } from '../../constants/gardenData';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented or network error, user interaction required:', err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleAudioError = () => {
    // If original unicode url fails on specific browser engine, try normalized bgm.mp3
    if (audioRef.current && audioRef.current.src !== window.location.origin + '/mp3/bgm.mp3') {
      audioRef.current.src = '/mp3/bgm.mp3';
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      setLoadError(true);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <audio
        ref={audioRef}
        src={AUDIO_TRACK_URL}
        loop
        preload="auto"
        onError={handleAudioError}
      />
      <button
        onClick={onToggle}
        title={AUDIO_TRACK_NAME}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền: ' + AUDIO_TRACK_NAME}
        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer ${
          isPlaying
            ? 'bg-[#C9829B] text-white border-[#C9829B] shadow-sm shadow-[#C9829B]/30'
            : 'bg-[#FFF9F1]/90 text-[#51433F] border-[#C9829B]/30 hover:border-[#C9829B]/60'
        }`}
      >
        <span
          className={`inline-block transition-transform duration-700 ${
            isPlaying ? 'rotate-12 scale-110' : 'group-hover:rotate-6'
          }`}
        >
          {isPlaying ? '🎵' : '🔇'}
        </span>
        <span className="hidden sm:inline truncate max-w-[140px]">
          {isPlaying ? 'Bật nhạc OST 🌸' : 'Phát nhạc'}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="w-0.5 h-2 bg-white animate-pulse" />
            <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
          </span>
        )}
      </button>
      {loadError && (
        <span className="sr-only">Không thể tải file âm thanh</span>
      )}
    </div>
  );
};

export default AudioPlayer;
