import React, { useState, useRef, useEffect } from 'react';
import PrimaryButton from '../common/PrimaryButton';

interface SecretCinemaScreenProps {
  onBack: () => void;
  onProceedToHeart: () => void;
  onPauseBgm: () => void;
  onResumeBgm: () => void;
}

export const SecretCinemaScreen: React.FC<SecretCinemaScreenProps> = ({
  onBack,
  onProceedToHeart,
  onPauseBgm,
  onResumeBgm,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(true);

  // When mounting Cinema Screen: automatically pause background music
  useEffect(() => {
    onPauseBgm();

    // Auto attempt to play acoustic song gently after 600ms
    const autoPlayTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // User interaction required by browser
          setIsPlaying(false);
        });
      }
    }, 600);

    return () => {
      clearTimeout(autoPlayTimer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // When leaving cinema screen: automatically resume background music
      onResumeBgm();
    };
  }, [onPauseBgm, onResumeBgm]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.warn(e));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds)
    );
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBackToGarden = () => {
    if (audioRef.current) audioRef.current.pause();
    onBack();
  };

  const handleGoToHeart = () => {
    if (audioRef.current) audioRef.current.pause();
    onProceedToHeart();
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF9F1] text-[#51433F] animate-fade-in flex flex-col items-center">
      {/* Hidden Acoustic Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        src="/mp3/acoustic_song.mp3"
        onError={() => {
          if (audioRef.current && audioRef.current.src !== window.location.origin + '/mp3/22.44_-17-thg-9__1.mp3') {
            audioRef.current.src = '/mp3/22.44_-17-thg-9__1.mp3';
          }
        }}
      />

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F5DDE5]/50 via-[#FFE17D]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-[#B7C9AE]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FFF9F1]/85 backdrop-blur-md border-b border-[#C9829B]/20 py-2.5 px-4">
        <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToGarden}
            aria-label="Quay lại khu vườn"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#51433F] hover:bg-[#F5DDE5] active:scale-95 transition-all cursor-pointer"
          >
            ←
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[#C9829B] uppercase">
              ✨ GÓC CHIẾU PHIM BÍ MẬT • 20/10 ✨
            </span>
            <span className="font-serif italic font-bold text-sm sm:text-base text-[#51433F]">
              The Little Cinema
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-[#B7C9AE]/30 text-[#3D5A2E]">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-stone-400'}`} />
            <span>{isPlaying ? 'Đang phát' : 'Tạm dừng'}</span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-8 flex flex-col items-center pb-28">
        {/* Milestone Badge */}
        <div className="w-full p-4 rounded-2xl bg-white/70 border border-[#C9829B]/20 shadow-xs backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5DDE5] flex items-center justify-center text-xl">
              🎬
            </div>
            <div className="text-left">
              <span className="text-[10px] sm:text-xs font-bold text-[#C9829B] tracking-wider uppercase block">
                Món Quà Đặc Biệt
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-[#51433F]">
                Khoảnh Khắc Lắng Đọng
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-[#C9829B]/50" />
            <span className="w-3 h-1.5 rounded-full bg-[#C9829B]/50" />
            <span className="w-6 h-1.5 rounded-full bg-[#C9829B]" />
          </div>
        </div>

        {/* 1. SCALLOPED CINEMA TICKET */}
        <section className="relative w-full">
          <div className="relative bg-white rounded-3xl border border-[#C9829B]/40 shadow-xl overflow-hidden">
            {/* Scalloped Notches on Sides */}
            <div className="absolute -left-3 top-36 w-6 h-6 rounded-full bg-[#FFF9F1] border-r border-[#C9829B]/40 z-20" />
            <div className="absolute -right-3 top-36 w-6 h-6 rounded-full bg-[#FFF9F1] border-l border-[#C9829B]/40 z-20" />

            {/* Top Half: Ticket Info & Wax Stamp */}
            <div className="p-5 sm:p-6 pb-4 bg-gradient-to-b from-[#F5DDE5]/40 to-white border-b-2 border-dashed border-[#C9829B]/30 relative text-left">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C9829B] tracking-wider uppercase">
                    <span>🎟️</span> TICKET NO. 2010 • HÀNG GHẾ DUY NHẤT
                  </span>
                  <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#51433F] mt-1 leading-snug">
                    Rạp Chiếu Phim Một Người
                  </h1>
                  <p className="text-xs sm:text-sm text-[#51433F]/75 italic mt-0.5">
                    Bản thu đàn hát mộc mạc dành riêng cho em
                  </p>
                </div>
                {/* Wax Stamp Seal */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C9829B] text-white flex flex-col items-center justify-center shadow-md rotate-6 select-none flex-shrink-0 ml-2">
                  <span className="text-xs sm:text-sm">🌸</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-tighter">20.10</span>
                </div>
              </div>

              {/* Ticket Metadata Ribbons */}
              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-[#C9829B]/15 text-xs sm:text-sm text-[#51433F]/70">
                <span>📅 20 Tháng 10</span>
                <span>•</span>
                <span>🌿 Góc Vườn Hoàng Hôn</span>
                <span>•</span>
                <span className="text-[#C9829B] font-semibold">✨ Đã mở khóa</span>
              </div>
            </div>

            {/* Bottom Half: Cinematic Garden Lofi Artwork */}
            <div className="p-4 sm:p-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[16/10] shadow-inner group bg-stone-100">
                <img
                  src="/images/lofi_cinema.jpg"
                  alt="Khung cảnh rạp chiếu phim lofi hoàng hôn ngoài vườn hoa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* 8mm REC Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>REC • LO-FI 8MM</span>
                </div>
                {/* Bottom caption over image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6 text-white text-left">
                  <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block">
                    Khung hình kỷ niệm
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold drop-shadow-sm">
                    "Giai Điệu Dưới Ánh Hoàng Hôn"
                  </h3>
                </div>
              </div>

              {/* Barcode flair */}
              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-dashed border-[#C9829B]/25 text-[11px] text-[#51433F]/60">
                <span className="font-mono tracking-widest text-xs">||||||| | ||||| |||| ||||||| 2010</span>
                <span className="font-handwriting text-base sm:text-lg text-[#C9829B]">Thước phim chỉ chiếu cho một người 🌸</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ACOUSTIC VINYL / CASSETTE MUSIC PLAYER */}
        <section className="w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 md:p-8 border-2 border-[#C9829B]/30 shadow-lg relative overflow-hidden backdrop-blur-md">
          {/* Top Player Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-base text-[#C9829B]">🎵</span>
              <span className="text-xs sm:text-sm font-bold text-[#C9829B] uppercase tracking-wider">
                BẢN THU GUITAR TỰ ĐỆM MỘC
              </span>
            </div>
            {/* Equalizer animation bars */}
            <div className="flex items-end gap-1 h-5 px-2.5 py-1 rounded-full bg-[#F5DDE5]/40 border border-[#C9829B]/20">
              <span className={`w-1 bg-[#C9829B] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`} />
              <span className={`w-1 bg-[#d893ab] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse delay-75' : 'h-1.5'}`} />
              <span className={`w-1 bg-[#B7C9AE] rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse delay-150' : 'h-1.5'}`} />
              <span className={`w-1 bg-[#C9829B] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse delay-200' : 'h-1.5'}`} />
            </div>
          </div>

          {/* Vinyl & Song Meta */}
          <div className="flex items-center gap-4 sm:gap-6 py-2 text-left">
            {/* Spinning Vinyl Record with Rose Center */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
              <div
                className={`w-full h-full rounded-full bg-[#20151B] border-4 border-white shadow-lg flex items-center justify-center transition-all ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                {/* Vinyl concentric groove lines */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/15 flex items-center justify-center">
                    {/* Rose center label */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#C9829B] border-2 border-white flex items-center justify-center shadow-inner">
                      <span className="text-xs sm:text-sm">🌹</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Song Meta Information */}
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B7C9AE]/40 text-[#3D5A2E] text-[11px] sm:text-xs font-semibold mb-1">
                Acoustic Guitar Cover 🎸
              </span>
              <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#51433F] truncate">
                Khúc Ca Dành Riêng Cho Em
              </h2>
              <p className="text-xs sm:text-sm text-[#51433F]/70 truncate mt-0.5">
                Tự đệm guitar mộc mạc gửi người ghé thăm vườn
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs text-[#C9829B] font-medium">
                <span>🍃</span>
                <span>Âm thanh mộc mạc & chân thành</span>
              </div>
            </div>
          </div>

          {/* Progress Seek Bar */}
          <div className="mt-4 sm:mt-6 space-y-1.5">
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Thanh thời gian bài hát"
                className="w-full h-2 sm:h-2.5 bg-[#F5DDE5] rounded-full appearance-none cursor-pointer accent-[#C9829B]"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] sm:text-xs text-[#51433F]/70 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="font-sans text-[10px] sm:text-xs text-[#C9829B] font-semibold">
                {isPlaying ? 'Đang phát mộc mạc 🎧' : 'Chạm nút play để nghe'}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Transport Controls */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 pt-1">
            {/* Like Heart */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Yêu thích bài hát"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl active:scale-90 transition-transform cursor-pointer hover:bg-[#F5DDE5]/30"
            >
              {isLiked ? '💖' : '🤍'}
            </button>

            {/* Middle playback controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Rewind 10s */}
              <button
                onClick={() => skipTime(-10)}
                aria-label="Lùi lại 10 giây"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-xs sm:text-sm font-bold text-[#51433F] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              >
                -10s
              </button>

              {/* Big Play/Pause Button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Tạm dừng bài hát' : 'Phát bài hát'}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#C9829B] to-[#d893ab] text-white shadow-lg shadow-[#C9829B]/40 flex items-center justify-center text-2xl sm:text-3xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Forward 10s */}
              <button
                onClick={() => skipTime(10)}
                aria-label="Tua tới 10 giây"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5DDE5]/40 hover:bg-[#F5DDE5] text-xs sm:text-sm font-bold text-[#51433F] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              >
                +10s
              </button>
            </div>

            {/* Replay track */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }}
              aria-label="Phát lại từ đầu"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-lg text-[#51433F] hover:bg-[#F5DDE5]/40 active:scale-90 transition-transform cursor-pointer"
            >
              🔄
            </button>
          </div>
        </section>

        {/* 3. POETIC DEDICATION NOTE */}
        <section className="w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#C9829B]/30 shadow-md text-left relative">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C9829B] uppercase tracking-wider mb-2">
            <span>💌</span> TÂM TÌNH MỘC MẠC GỬI EM
          </div>
          <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#51433F] leading-relaxed">
            "Một giai điệu mộc mạc anh tự đàn tự hát gửi tặng em... Không cần phải thật hoàn hảo như phòng thu, chỉ mong những thanh âm chân thành này sẽ mang đến cho em những phút giây thật bình yên, nhẹ nhõm và thư giãn sau những ngày bận rộn. Chúc em một ngày 20/10 ngập tràn niềm vui dịu dàng nhất 🌸"
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#C9829B]/20 text-right">
            <span className="text-xs sm:text-sm italic text-[#C9829B]">
              — Giai điệu mùa thu dành riêng cho em —
            </span>
          </div>
        </section>

        {/* 4. ACTIONS: BACK TO GARDEN OR PROCEED TO FINAL HEART */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton
            onClick={handleBackToGarden}
            variant="secondary"
            size="lg"
            icon={<span>🌿</span>}
            className="w-full sm:w-auto"
          >
            Quay lại khu vườn
          </PrimaryButton>
          <PrimaryButton
            onClick={handleGoToHeart}
            size="lg"
            icon={<span>💖</span>}
            className="w-full sm:w-auto shadow-lg animate-pulse"
          >
            Tiếp tục: Điều bất ngờ cuối cùng ✨
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
};

export default SecretCinemaScreen;
