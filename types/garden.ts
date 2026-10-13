export type GardenScreenStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface PhotoReward {
  id: number;
  fileName: string;
  badge: string;
  title: string;
  caption: string;
  note: string;
  isUnlocked: boolean;
  unlockedAtStep: GardenScreenStep;
}

export interface GiftBoxOption {
  id: 'pink' | 'cream' | 'lavender';
  title: string;
  tag: string;
  boxColor: string;
  ribbonColor: string;
  blessingMessage: string;
}

export interface GardenGameState {
  currentStep: GardenScreenStep;
  maxUnlockedStep: GardenScreenStep;
  
  // Game 1: Đánh thức 3 bông hoa
  awakenedFlowers: number[]; // e.g. [0, 1, 2]
  isFlowersCompleted: boolean;
  
  // Game 2: Bắt 5 đom đóm
  collectedFireflies: number; // 0..5
  isFirefliesCompleted: boolean;
  
  // Game 3: Ghép 4 mảnh hoa
  placedPuzzlePieces: number[]; // [0, 1, 2, 3]
  isPuzzleCompleted: boolean;
  
  // Hộp quà may mắn
  selectedGiftBoxId: 'pink' | 'cream' | 'lavender' | null;
  openedGiftBoxes: string[];
  
  // Trạng thái chung
  activeLightboxIndex: number | null;
  isAudioPlaying: boolean;
}

export interface BaseScreenProps {
  onNext: () => void;
  onPrev?: () => void;
  onOpenLightbox?: (photoIndex: number) => void;
}
