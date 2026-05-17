import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, Calendar, Users } from 'lucide-react';
import CheckoutForm from '@/components/CheckoutForm';
import { ROOMS } from '@/lib/rooms';

interface CheckoutPageProps {
  searchParams: Promise<{
    room?: string;
    dest?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

const formatThaiDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split('-').map(Number);
  const monthAbbr = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  return `${d} ${monthAbbr[m - 1]} ${y + 543}`;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const roomId = params.room ? parseInt(params.room) : 1;
  const room = ROOMS.find((r) => r.id === roomId) || ROOMS[0];

  const location = params.dest || room.location;

  // Calculate pricing based on search params check-in / check-out
  let nights = 1;
  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn);
    const end = new Date(params.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) nights = diffDays;
  }

  const guestCount = params.guests ? parseInt(params.guests) : 2;

  const basePrice = room.priceNum * nights;
  const taxRate = 0.07;
  const tax = Math.round(basePrice * taxRate);
  const total = basePrice + tax;

  const formatPrice = (n: number) => `฿${n.toLocaleString('th-TH')}.00`;

  // Preserve search parameters for back/close action
  const backParams = new URLSearchParams();
  if (params.dest) backParams.set('dest', params.dest);
  if (params.checkIn) backParams.set('checkIn', params.checkIn);
  if (params.checkOut) backParams.set('checkOut', params.checkOut);
  if (params.guests) backParams.set('guests', params.guests);
  const backUrl = `/discovery?${backParams.toString()}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative w-full">
      {/* Persistent Close Action */}
      <Link
        href={backUrl}
        className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full glass-panel hover:bg-surface-variant transition-colors group"
        aria-label="ปิด"
      >
        <X size={20} className="text-on-surface group-hover:text-acid-lime transition-colors" />
      </Link>

      {/* Main Checkout Container */}
      <main className="w-full max-w-[1440px] px-4 md:px-margin-page py-24 flex flex-col lg:flex-row gap-gutter lg:gap-section-gap z-10 flex-grow">
        
        {/* Left: Payment Panel */}
        <section className="flex-1 w-full flex flex-col gap-12">
          <header>
            <h1 className="text-display-2xl text-primary mb-4 break-words">
              ดำเนินการชำระเงิน<br />อย่างปลอดภัย
            </h1>
            <div className="text-acid-lime text-body-md mb-4 uppercase tracking-widest">
              SECURE TRANSACTION
            </div>
            <p className="text-body-md text-on-surface-variant max-w-md">
              ตรวจสอบรายละเอียดและยืนยันการจอง ข้อมูลของคุณจะถูกเข้ารหัสเพื่อความปลอดภัยระดับสูงสุด
            </p>
          </header>
          
          <CheckoutForm />
        </section>

        {/* Right: Summary Panel — Dynamic based on selected room */}
        <aside className="w-full lg:w-[400px] flex-shrink-0 mt-12 lg:mt-0">
          <div className="glass-panel p-8 sticky top-24 flex flex-col gap-8 border-l border-outline-variant/30 h-max rounded-lg">
            <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest">
              ที่พักที่คุณเลือก
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="text-headline-lg-mobile text-primary">{room.name}</h4>
              <p className="text-body-md text-on-surface-variant flex items-center gap-2">
                <MapPin size={16} className="text-acid-lime" />
                {location}
              </p>
            </div>
            <div className="w-full h-48 bg-surface-variant relative overflow-hidden border border-outline-variant/20 rounded-sm">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="border border-outline-variant/50 px-2 py-1 text-label-sm text-on-surface-variant rounded-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 py-6 border-y border-outline-variant/30">
              <div className="flex justify-between items-center text-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Calendar size={14} /> ช่วงเวลาที่เข้าพัก
                </span>
                <span className="text-primary font-medium">{nights} คืน</span>
              </div>
              {params.checkIn && params.checkOut && (
                <div className="flex justify-between items-center text-xs text-on-surface-variant/70 pl-5">
                  <span>{formatThaiDate(params.checkIn)} - {formatThaiDate(params.checkOut)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-label-sm border-t border-outline-variant/10 pt-4">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Users size={14} /> จำนวนผู้เข้าพัก
                </span>
                <span className="text-primary font-medium">{guestCount} ท่าน</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-body-md">
                <span className="text-on-surface-variant">
                  ราคาห้องพัก {nights > 1 ? `(${nights} คืน)` : ''}
                </span>
                <span className="text-primary">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between items-center text-body-md">
                <span className="text-on-surface-variant">ภาษีและค่าธรรมเนียม (7%)</span>
                <span className="text-primary">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-acid-lime/30">
              <span className="text-label-sm text-acid-lime uppercase tracking-widest">
                ยอดรวมทั้งสิ้น
              </span>
              <span className="text-headline-lg-mobile text-primary tracking-tighter">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
