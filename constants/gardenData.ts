import { PhotoReward, GiftBoxOption } from '../types/garden';

export const GARDEN_PHOTOS: PhotoReward[] = [
  {
    id: 1,
    fileName: "/images/HienLuong1.jpg",
    badge: "#01 • Nụ Cười Rạng Rỡ",
    title: "Nụ Cười Ban Mai",
    caption: "Bờm tuần lộc & nụ cười tươi tắn bên cây thông ấm áp",
    note: "Bông hoa rực rỡ nhất trong vườn hôm nay... hóa ra lại chính là nụ cười này.",
    isUnlocked: false,
    unlockedAtStep: 3,
  },
  {
    id: 2,
    fileName: "/images/HienLuong2.jpg",
    badge: "#02 • Nét Đẹp Tự Tin & Có Gu",
    title: "Nét Đẹp Tự Tin",
    caption: "Áo khoác da đêm phố, phong thái tự nhiên và rất có gu",
    note: "Ánh sáng đẹp nhất không nằm ở ngọn đèn, mà nằm ở sự tự tin và nét cuốn hút rất riêng của em.",
    isUnlocked: false,
    unlockedAtStep: 4,
  },
  {
    id: 3,
    fileName: "/images/HienLuong3.jpg",
    badge: "#03 • Dịu Dàng & Thơ Mộng",
    title: "Dịu Dàng & Thơ Mộng",
    caption: "Váy yếm bên bờ biển biếc, đóa hoa sứ cài tóc e ấp",
    note: "Dịu dàng, nhẹ nhàng và luôn mang lại cảm giác bình yên đến lạ.",
    isUnlocked: false,
    unlockedAtStep: 4, // Game đom đóm mở khóa cả ảnh 2 và 3 theo yêu cầu
  },
  {
    id: 4,
    fileName: "/images/HienLuong4.jpg",
    badge: "#04 • Thanh Xuân Rực Rỡ",
    title: "Thanh Xuân Rực Rỡ",
    caption: "Mũ cử nhân, dải ruy băng và bó hoa tốt nghiệp rạng ngời",
    note: "Mong nụ cười này sẽ luôn đồng hành cùng em trên mọi nẻo đường tương lai.",
    isUnlocked: false,
    unlockedAtStep: 5, // Ghép hoa mở khóa ảnh 4
  },
  {
    id: 5,
    fileName: "/images/HienLuong5.jpg",
    badge: "#05 • Bông Hoa Rạng Rỡ Nhất",
    title: "Bông Hoa Hoàn Hảo",
    caption: "Đầm trắng bồng bềnh bên biệt thự hoa cổ điển, cuốn hút nhất",
    note: "Giữa một vườn hoa ngát hương, điều tuyệt vời nhất vẫn là sự hiện diện của em.",
    isUnlocked: false,
    unlockedAtStep: 6, // Hộp quà mở khóa ảnh 5 và dẫn đến Album trọn vẹn ở bước 7
  },
];

export const GIFT_BOX_OPTIONS: GiftBoxOption[] = [
  {
    id: 'pink',
    title: 'Hộp Nơ Hồng Phấn',
    tag: 'Ngọt Ngào & Chiều Chuộng',
    boxColor: 'from-pink-100 to-rose-200 border-rose-300 text-rose-800',
    ribbonColor: '#C9829B',
    blessingMessage: 'Hôm nay và cả 364 ngày còn lại, chúc em luôn được yêu thương, chiều chuộng và giữ mãi nét ngọt ngào này nhé! 🌸',
  },
  {
    id: 'cream',
    title: 'Hộp Màu Kem Ấm Áp',
    tag: 'Bình Yên & Năng Lượng',
    boxColor: 'from-amber-50 to-orange-100 border-amber-300 text-amber-900',
    ribbonColor: '#B7C9AE',
    blessingMessage: 'Chúc em luôn giữ được sự an yên trong tâm hồn, gặp toàn những điều êm đềm và nụ cười luôn thường trực! 🌿',
  },
  {
    id: 'lavender',
    title: 'Hộp Oải Hương Nhạt',
    tag: 'Tỏa Sáng & May Mắn',
    boxColor: 'from-purple-50 to-violet-100 border-violet-300 text-violet-900',
    ribbonColor: '#9D85C5',
    blessingMessage: 'Chúc em luôn tỏa sáng rực rỡ, may mắn ngập tràn và mọi điều ước nhỏ xíu đều sớm thành sự thật nhé! ✨',
  },
];

export const FINAL_LETTER_CONTENT = {
  salutation: "Gửi em,",
  paragraphs: [
    "Nhân ngày Phụ nữ Việt Nam 20/10, góc vườn nhỏ ngập tràn sắc hoa này là món quà chân thành anh chuẩn bị dành riêng cho em. Chúc em:",
    "• Luôn luôn xinh đẹp, rạng rỡ và tự tin theo cách riêng của mình.\n• Mỗi ngày trôi qua đều có thật nhiều niềm vui nhỏ xíu và những điều ngọt ngào.\n• Luôn được nâng niu, trân trọng và an yên trong từng khoảnh khắc.",
    "Mong rằng góc vườn nhỏ này đã mang lại cho em những phút giây thật bình yên và một nụ cười thật tươi trong ngày hôm nay!",
  ],
  closing: "Chúc em một ngày 20/10 thật hạnh phúc và trọn vẹn nhé! ✨",
  signature: "— From someone who wishes you the best —",
};

export const AUDIO_TRACK_URL = "/mp3/bgm.mp3";
export const AUDIO_TRACK_NAME = "Vòng Tuần Hoàn Của Tình Yêu • 恋爱循环";
