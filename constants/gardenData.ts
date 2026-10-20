import { PhotoReward, GiftBoxOption } from '../types/garden';

export const GARDEN_PHOTOS: PhotoReward[] = [
  {
    id: 1,
    fileName: "/images/1792425597436_2068672602398295483_5900182264671411439_30e1bc93cbfdf158b7376d3172594cf1.jpg",
    badge: "#01 • Trong Trẻo & Tươi Sáng",
    title: "Nắng Sớm Bên Rặng Thông",
    caption: "Croptop trắng năng động, quả dừa tươi mát và vạt nắng sớm xiên qua rặng cây",
    note: "Bông hoa tươi tắn nhất trong khu vườn hôm nay... hóa ra lại chính là nét trong trẻo, rạng rỡ này.",
    isUnlocked: false,
    unlockedAtStep: 3,
  },
  {
    id: 2,
    fileName: "/images/1792425597408_2068672602398295483_5900182264671411439_42e6dbe004c6f760a6b0ae1011ed369f.jpg",
    badge: "#02 • Tự Nhiên & Có Gu",
    title: "Góc Nghiêng Tinh Tế",
    caption: "Kính râm cài tóc, cardigan be nhẹ nhàng và góc nghiêng tự nhiên trước gương retro",
    note: "Ánh sáng đẹp nhất không nằm ở ngọn đèn, mà nằm ở sự tự tin và phong thái cuốn hút rất riêng của em.",
    isUnlocked: false,
    unlockedAtStep: 4,
  },
  {
    id: 3,
    fileName: "/images/1792425597459_2068672602398295483_5900182264671411439_9653291e532397f07f7c88f8773a6388.jpg",
    badge: "#03 • Dịu Dàng & Thơ Mộng",
    title: "Ráng Chiều Hoàng Hôn",
    caption: "Áo trễ vai, chân váy trắng và bóng dáng thướt tha giữa khung trời hoàng hôn rực đỏ ven hồ",
    note: "Dịu dàng, yên bình và luôn mang lại cảm giác nhẹ nhõm, êm đềm đến lạ kỳ.",
    isUnlocked: false,
    unlockedAtStep: 4, // Game đom đóm mở khóa cả ảnh 2 và 3 theo yêu cầu
  },
  {
    id: 4,
    fileName: "/images/1792425597480_2068672602398295483_5900182264671411439_28a04ca73abf33aa4d3b2178896aee90.jpg",
    badge: "#04 • Thanh Xuân & Tự Do",
    title: "Nụ Cười Vùng Cao",
    caption: "Khăn thổ cẩm hồng rực rỡ, lá cờ tung bay và nụ cười thanh xuân giữa đất trời Tây Bắc",
    note: "Mong nụ cười này sẽ luôn tràn đầy sức sống và đồng hành cùng em trên mọi chặng đường tươi đẹp phía trước.",
    isUnlocked: false,
    unlockedAtStep: 5, // Ghép hoa mở khóa ảnh 4
  },
  {
    id: 5,
    fileName: "/images/1792425597502_2068672602398295483_5900182264671411439_b8edc17e8846ef44f213dc8a0ee106e8.jpg",
    badge: "#05 • Bông Hoa Hoàn Hảo Nhất",
    title: "Nàng Thơ Kiêu Kỳ & Ấm Áp",
    caption: "Set dạ tweed màu kem sang trọng bên ánh đèn vàng ấm cúng, thần thái cuốn hút và kiêu sa nhất",
    note: "Giữa một vườn hoa ngát hương, điều tuyệt vời và đáng nâng niu nhất vẫn là sự hiện diện của em.",
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
    "Mấy tuần vừa qua tuy chưa dài, nhưng những lần trò chuyện cùng em luôn mang lại cho anh nhiều niềm vui và những năng lượng rất tích cực. Cảm ơn em vì sự dịu dàng, những mẩu chuyện dễ thương và nụ cười luôn ấm áp ấy.",
    "Nhân ngày Phụ nữ Việt Nam 20/10, góc vườn nhỏ này là món quà tinh thần anh dành tặng riêng cho em. Chúc em:",
    "• Luôn luôn xinh đẹp, rạng rỡ và tự tin theo cách riêng của mình.\n• Mỗi ngày trôi qua đều có thật nhiều niềm vui nhỏ xíu và những điều ngọt ngào.\n• Luôn được nâng niu, trân trọng và an yên trong từng khoảnh khắc.",
    "Mong rằng góc vườn nhỏ này đã mang lại cho em một nụ cười thật tươi trong ngày hôm nay!",
  ],
  closing: "Chúc em một ngày 20/10 thật hạnh phúc và trọn vẹn nhé! ✨",
  signature: "— From someone who wishes you the best —",
};

export const AUDIO_TRACK_URL = "/mp3/bgm.mp3";
export const AUDIO_TRACK_NAME = "Vòng Tuần Hoàn Của Tình Yêu • 恋爱循环";
