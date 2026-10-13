import React, { useState } from 'react';

interface PuzzleGridProps {
  onComplete: () => void;
  imageUrl?: string;
}

// 4 pieces in 2x2 grid:
// Slot 0: Top-Left (x: 0%, y: 0%)
// Slot 1: Top-Right (x: 100%, y: 0%)
// Slot 2: Bottom-Left (x: 0%, y: 100%)
// Slot 3: Bottom-Right (x: 100%, y: 100%)
const PIECE_OFFSETS = [
  { x: '0%', y: '0%' },
  { x: '100%', y: '0%' },
  { x: '0%', y: '100%' },
  { x: '100%', y: '100%' },
];

export const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  onComplete,
  imageUrl = "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
}) => {
  // Current board state: which piece index is in which slot.
  // Initial scrambled board: e.g. [2, 0, 3, 1]
  const [board, setBoard] = useState<number[]>([2, 0, 3, 1]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Check if current board is solved: [0, 1, 2, 3]
  const checkSolved = (currentBoard: number[]) => {
    const solved = currentBoard.every((val, idx) => val === idx);
    if (solved) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    if (isCompleted) return;

    if (selectedSlot === null) {
      setSelectedSlot(slotIndex);
    } else {
      if (selectedSlot === slotIndex) {
        // Deselect
        setSelectedSlot(null);
      } else {
        // Swap pieces between selectedSlot and slotIndex
        const newBoard = [...board];
        const temp = newBoard[selectedSlot];
        newBoard[selectedSlot] = newBoard[slotIndex];
        newBoard[slotIndex] = temp;
        setBoard(newBoard);
        setSelectedSlot(null);
        checkSolved(newBoard);
      }
    }
  };

  // Hint: Fixes the first misplaced slot
  const handleHint = () => {
    if (isCompleted) return;
    const newBoard = [...board];
    for (let targetSlot = 0; targetSlot < 4; targetSlot++) {
      if (newBoard[targetSlot] !== targetSlot) {
        // Find where target piece is currently placed
        const currentSlotOfTarget = newBoard.indexOf(targetSlot);
        if (currentSlotOfTarget !== -1) {
          // Swap target piece to target slot
          const temp = newBoard[targetSlot];
          newBoard[targetSlot] = targetSlot;
          newBoard[currentSlotOfTarget] = temp;
          setBoard(newBoard);
          checkSolved(newBoard);
          return;
        }
      }
    }
  };

  // Skip / Auto-solve
  const handleAutoSolve = () => {
    const solved = [0, 1, 2, 3];
    setBoard(solved);
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* 2x2 Puzzle Board */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 p-2 bg-[#FFFDF9] rounded-2xl shadow-xl border-2 border-[#C9829B]/30 flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 gap-2 w-full h-full">
          {board.map((pieceId, slotIndex) => {
            const isCorrect = pieceId === slotIndex;
            const isSelected = selectedSlot === slotIndex;
            const offset = PIECE_OFFSETS[pieceId];

            return (
              <button
                key={slotIndex}
                type="button"
                onClick={() => handleSlotClick(slotIndex)}
                aria-label={`Ô số ${slotIndex + 1}, mảnh ${pieceId + 1}`}
                className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'border-[#FFE17D] ring-4 ring-[#FFE17D]/50 scale-95 shadow-md'
                    : isCorrect
                    ? 'border-emerald-400/60 shadow-sm'
                    : 'border-white/80 hover:border-[#C9829B]/60 shadow'
                }`}
              >
                {/* Image snippet using 200% background-size */}
                <div
                  className="w-full h-full transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: '200% 200%',
                    backgroundPosition: `${offset.x} ${offset.y}`,
                  }}
                />

                {/* Badge if correctly placed */}
                {isCorrect && (
                  <span className="absolute bottom-1 right-1 bg-emerald-500/80 text-white text-[9px] px-1 rounded-full">
                    ✓
                  </span>
                )}
                {/* Slot index badge */}
                <span className="absolute top-1 left-1 bg-black/40 text-white text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  {slotIndex + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Success Overlay when completed */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#FFF9F1]/85 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center animate-fade-in p-4 text-center">
            <span className="text-4xl animate-bounce">🎉</span>
            <h4 className="font-serif text-lg font-bold text-[#51433F] mt-2">
              Hoàn thành xuất sắc!
            </h4>
            <p className="text-xs text-[#C9829B] font-medium mt-1">
              Đóa hoa hoàn hảo đã ghép thành công 🌸
            </p>
          </div>
        )}
      </div>

      {/* Control Buttons: Preview, Hint, Auto Solve */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-3 py-1.5 rounded-full bg-[#F5DDE5]/60 hover:bg-[#F5DDE5] text-[#51433F] border border-[#C9829B]/20 transition-all cursor-pointer"
        >
          {showPreview ? '🙈 Ẩn ảnh mẫu' : '👁️ Xem ảnh mẫu'}
        </button>
        {!isCompleted && (
          <>
            <button
              onClick={handleHint}
              className="px-3 py-1.5 rounded-full bg-[#FFF9F1] hover:bg-[#F5DDE5]/40 text-[#51433F] border border-[#C9829B]/30 transition-all cursor-pointer"
            >
              💡 Gợi ý (1 mảnh)
            </button>
            <button
              onClick={handleAutoSolve}
              className="px-3 py-1.5 rounded-full bg-[#FFF9F1] hover:bg-[#F5DDE5]/40 text-[#C9829B] border border-[#C9829B]/30 transition-all cursor-pointer"
            >
              ⚡ Bỏ qua câu đố
            </button>
          </>
        )}
      </div>

      {/* Image Preview Thumbnail Modal */}
      {showPreview && (
        <div className="mt-3 p-2 bg-white rounded-xl border border-[#C9829B]/30 shadow-md animate-fade-in flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Mẫu đóa hoa hoàn chỉnh"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <span className="text-[10px] text-[#51433F]/70 mt-1">
            Hình ảnh mẫu hoàn chỉnh
          </span>
        </div>
      )}
    </div>
  );
};

export default PuzzleGrid;
