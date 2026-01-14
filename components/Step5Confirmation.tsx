
import React, { useState, useEffect, useMemo } from 'react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Hàm tính thời gian đến 19h30 thứ 7 tuần này
const getTargetDate = (): Date => {
  const now = new Date();
  const target = new Date();
  
  // Đặt giờ 19:30
  target.setHours(19, 30, 0, 0);
  
  // Tìm thứ 7 gần nhất (19h30)
  const dayOfWeek = now.getDay(); // 0 = Chủ nhật, 6 = Thứ 7
  let daysUntilSaturday: number;
  
  if (dayOfWeek === 6) {
    // Hôm nay là thứ 7
    // Nếu đã qua 19h30 thì tính thứ 7 tuần sau (7 ngày nữa)
    if (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() >= 30)) {
      daysUntilSaturday = 7;
    } else {
      // Chưa qua 19h30, dùng hôm nay
      daysUntilSaturday = 0;
    }
  } else {
    // Tính số ngày đến thứ 7
    daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    if (daysUntilSaturday === 0) daysUntilSaturday = 7;
  }
  
  target.setDate(now.getDate() + daysUntilSaturday);
  
  return target;
};

// Hàm tính countdown từ thời điểm hiện tại đến target
const calculateCountdown = (targetDate: Date): Countdown => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};

const Step5Confirmation: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  // Tính targetDate một lần khi component mount
  const targetDate = useMemo(() => getTargetDate(), []);
  const [countdown, setCountdown] = useState<Countdown>(() => calculateCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="step-active flex flex-col items-center w-full max-w-[1000px]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <span className="material-symbols-outlined text-primary text-4xl">confirmation_number</span>
        </div>
        <h1 className="text-[#1b0d12] dark:text-white tracking-light text-[40px] font-extrabold leading-tight px-4">
          Buổi hẹn xem phim của chúng ta 🎬
        </h1>
        <p className="mt-2 text-[#9a4c66] dark:text-primary/70 text-lg font-medium">Yayy! Vậy là chúng mình đã có hẹn rồi nhé.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* Detail Card */}
        <div className="p-1 rounded-3xl bg-gradient-to-br from-primary to-[#ff85a2] shadow-2xl shadow-primary/20 transform hover:-rotate-1 transition-transform">
          <div className="flex flex-col items-stretch justify-start rounded-[1.5rem] bg-white dark:bg-[#2d161d] overflow-hidden">
            <div className="w-full h-80 overflow-hidden bg-primary/5">
               <img 
                src="/images/539641144_122230811342164967_3983958908900038601_n.jpg" 
                alt="Buổi hẹn xem phim"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col gap-4 p-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event_upcoming</span>
                <p className="text-[#1b0d12] dark:text-white text-2xl font-bold">Chi tiết lịch hẹn</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9a4c66]">calendar_today</span>
                    <p className="text-[#9a4c66] dark:text-primary/70 font-medium">Ngày</p>
                  </div>
                  <p className="text-[#1b0d12] dark:text-white font-bold">Thứ 7 tuần này</p>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9a4c66]">schedule</span>
                    <p className="text-[#9a4c66] dark:text-primary/70 font-medium">Giờ</p>
                  </div>
                  <p className="text-[#1b0d12] dark:text-white font-bold">19:30 or 20:00</p>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9a4c66]">location_on</span>
                    <p className="text-[#9a4c66] dark:text-primary/70 font-medium">Địa điểm</p>
                  </div>
                  <p className="text-[#1b0d12] dark:text-white font-bold">BETA Đan Phượng</p>
                </div>
              </div>
              
              <button className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full h-12 bg-primary text-white font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined">calendar_add_on</span>
                <span>Thêm vào Google Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-center w-full">
            <h4 className="text-[#9a4c66] dark:text-primary/70 text-lg font-bold tracking-[0.1em] uppercase mb-6">Đếm ngược ngày chung đôi</h4>
            
            <div className="grid grid-cols-4 gap-4 w-full max-w-sm mx-auto">
              <TimeBlock value={countdown.days} label="Ngày" />
              <TimeBlock value={countdown.hours} label="Giờ" />
              <TimeBlock value={countdown.minutes} label="Phút" />
              <TimeBlock value={countdown.seconds} label="Giây" />
            </div>
          </div>
          
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center max-w-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary mb-2 animate-pulse">auto_awesome</span>
            <p className="text-[#1b0d12] dark:text-white text-sm font-medium italic">
              "Sẽ là một buổi tối thật tuyệt vời khi có em ở bên cạnh. Anh rất mong chờ tới lúc đó!"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        <p className="text-[#9a4c66] dark:text-primary/70 text-sm font-medium bg-white/50 dark:bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm animate-pulse">
          Nhớ chụp màn hình lại để giữ làm kỷ niệm nha 💖
        </p>
        <button 
          onClick={onRestart}
          className="group flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 decoration-2"
        >
          <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">keyboard_double_arrow_up</span>
          Quay lại đầu trang
        </button>
      </div>
    </div>
  );
};

const TimeBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="bg-white dark:bg-[#2d161d] shadow-xl rounded-2xl w-full aspect-square flex items-center justify-center border-b-4 border-primary transition-transform hover:scale-105">
      <span className="text-primary text-2xl md:text-3xl font-black">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] md:text-xs font-bold uppercase text-[#9a4c66]">{label}</span>
  </div>
);

export default Step5Confirmation;
