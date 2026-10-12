export enum Beat {
  UNBOXING = 1,      // Chặng 1: Mở thiệp 20/10 & Hé lộ Ảnh 1
  RECAP = 2,         // Chặng 2: 21 ngày chat & Hé lộ Ảnh 2
  QUIZ = 3,          // Chặng 3: Mini quiz tương tác & Hé lộ Ảnh 3, 4
  PEAK_PHOTO = 4,    // Chặng 4: Mở khóa Ảnh 5 tò mò
  INVITE = 5,        // Chặng 5: Cú chốt rủ xem phim & xác nhận
  CELEBRATION = 6,   // Chặng 6: Chiếc vé xem phim VIP
  SECRET_HEART = 7   // Màn bí mật: Trái tim hạt Lý Tuân Canvas
}

export interface BeatProps {
  onNext: () => void;
  onBack?: () => void;
  onRestart: () => void;
}

export interface InviteSelection {
  genre: string;
  popcorn: string;
  confirmed: boolean;
}
