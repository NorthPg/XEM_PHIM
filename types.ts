
export enum Step {
  INTRO = 1,
  REASONS = 2,
  PROBE = 3,
  INVITATION = 4,
  CONFIRMATION = 5
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  onRestart: () => void;
}
