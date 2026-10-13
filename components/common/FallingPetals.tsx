import React, { useMemo } from 'react';

interface PetalItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
}

export const FallingPetals: React.FC = () => {
  const petals = useMemo<PetalItem[]>(() => {
    const colors = [
      '#F5DDE5', // blush pink
      '#FCDDEC', // peachy pink
      '#C9829B', // dusty rose
      '#FFEBF0', // soft cream-pink
      '#EBD7E0', // delicate petal
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.floor((i * 7.1) + (Math.random() * 5)), // spread evenly across 0-100%
      delay: Math.random() * 8,
      duration: 9 + Math.random() * 7,
      size: 14 + Math.random() * 10,
      color: colors[i % colors.length],
      rotation: Math.floor(Math.random() * 360),
    }));
  }, []);

  return (
    <div className="floating-petals-container" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              opacity: 0.65,
            }}
          >
            <path
              d="M12 0C7 8 0 16 0 22C0 27.5 5.4 32 12 32C18.6 32 24 27.5 24 22C24 16 17 8 12 0Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
