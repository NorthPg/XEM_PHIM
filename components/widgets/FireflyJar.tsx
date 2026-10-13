import React from 'react';

interface FireflyJarProps {
  collectedCount: number; // 0..5
  targetCount: number;    // 5
}

export const FireflyJar: React.FC<FireflyJarProps> = ({
  collectedCount,
  targetCount,
}) => {
  const isCompleted = collectedCount >= targetCount;

  return (
    <div className="relative flex flex-col items-center">
      {/* Glass Jar Outer Frame */}
      <div
        className={`relative w-28 h-40 sm:w-32 sm:h-44 rounded-b-3xl rounded-t-xl border-4 transition-all duration-700 flex flex-col items-center justify-end overflow-hidden ${
          isCompleted
            ? 'border-[#FFE17D] shadow-[0_0_35px_rgba(255,225,125,0.7)] bg-[#FFE17D]/20'
            : collectedCount > 0
            ? 'border-white/80 shadow-[0_0_20px_rgba(255,225,125,0.3)] bg-white/20'
            : 'border-white/60 bg-white/10 shadow-md'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Cork Lid & Ribbon */}
        <div className="absolute top-0 w-20 h-5 bg-[#C39B77] rounded-t-lg border-b-2 border-[#9D7654] shadow-sm flex items-center justify-center">
          <div className="w-24 h-1.5 bg-[#B7C9AE] rounded-full -bottom-1 absolute shadow-sm" />
        </div>

        {/* Captured Fireflies inside Jar */}
        <div className="relative w-full h-full flex items-center justify-center">
          {Array.from({ length: collectedCount }).map((_, i) => {
            // Distribute captured fireflies inside jar
            const positions = [
              { top: '35%', left: '40%' },
              { top: '55%', left: '25%' },
              { top: '65%', left: '60%' },
              { top: '45%', left: '70%' },
              { top: '75%', left: '45%' },
            ];
            const pos = positions[i] || { top: '50%', left: '50%' };

            return (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-[#FFE17D] animate-ping opacity-90 shadow-[0_0_12px_#FFE17D]"
                style={{
                  top: pos.top,
                  left: pos.left,
                  animationDuration: `${1.8 + i * 0.3}s`,
                }}
              />
            );
          })}

          {/* Ambient Warm Glow if any fireflies inside */}
          {collectedCount > 0 && (
            <div
              className="absolute inset-0 bg-radial from-[#FFE17D]/35 to-transparent pointer-events-none transition-opacity duration-500"
              style={{ opacity: collectedCount * 0.2 }}
            />
          )}

          {collectedCount === 0 && (
            <span className="text-[11px] text-[#51433F]/50 text-center px-2 font-sans">
              Bình đang trống...
            </span>
          )}
        </div>
      </div>

      {/* Counter Pill */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#C9829B]/30 shadow-sm">
        <span className="text-xs">✨</span>
        <span className="text-xs font-bold text-[#51433F]">
          Đom đóm: <span className="text-[#C9829B]">{collectedCount}</span>/{targetCount}
        </span>
      </div>
    </div>
  );
};

export default FireflyJar;
