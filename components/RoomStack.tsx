'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Star } from 'lucide-react';
import { ROOMS } from '@/lib/rooms';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function RoomStack() {
  const searchParams = useSearchParams();
  const dest = searchParams.get('dest') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '2';

  const getBookingLink = (roomId: number) => {
    const params = new URLSearchParams();
    params.set('room', roomId.toString());
    if (dest) params.set('dest', dest);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    return `/checkout?${params.toString()}`;
  };

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-gutter pt-24 pb-32 w-full min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[1440px] mb-12 text-center md:text-left"
      >
        <h2 className="text-display-xl text-primary uppercase tracking-tighter mb-4">
          {dest ? `ห้องพักแนะนำใน ${dest}` : 'ห้องพักที่แนะนำ'}
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          สัมผัสประสบการณ์การพักผ่อนระดับพรีเมียมด้วยตัวเลือกห้องพักที่คัดสรรมาเพื่อคุณโดยเฉพาะ ทุกห้องได้รับการออกแบบมาอย่างพิถีพิถันเพื่อประสบการณ์ที่ยอดเยี่ยมที่สุด
        </p>
      </motion.div>

      {/* Grid Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {ROOMS.map((room) => (
          <motion.div
            key={room.id}
            variants={itemVariants}
            className="flex flex-col glass-card glowing-edge rounded-xl overflow-hidden group border border-outline-variant hover:border-acid-lime/50 transition-colors duration-500 relative"
          >
            {/* Image Area */}
            <div className="relative h-72 w-full bg-surface-variant overflow-hidden">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/20 to-transparent"></div>
              
              <div className="absolute top-4 right-4 bg-acid-lime text-ink-black text-label-sm px-3 py-1.5 rounded-sm font-semibold shadow-[0_0_20px_rgba(204,255,0,0.2)] flex items-center gap-1.5 z-10">
                <Star size={14} className="fill-ink-black" />
                ความเหมาะสม {room.suitability}
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                 <h3 className="text-headline-lg-mobile md:text-[28px] text-paper-white uppercase tracking-tight line-clamp-1 mb-1">
                   {room.name}
                 </h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex flex-col p-6 bg-ink-black/95 relative z-20">
              <div className="flex justify-between items-start mb-4 gap-4 border-b border-outline-variant/30 pb-6">
                <p className="text-body-md text-on-surface-variant line-clamp-3 leading-relaxed w-2/3">
                  {room.desc}
                </p>
                <div className="text-right shrink-0">
                  <span className="block text-label-sm text-acid-lime mb-1 uppercase tracking-widest">ราคาต่อคืน</span>
                  <span className="text-headline-lg-mobile text-paper-white font-light">
                    {room.price}
                  </span>
                </div>
              </div>

              {/* Amenities Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {room.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="bg-surface border border-outline-variant/50 px-3 py-1.5 text-xs text-on-surface-variant rounded-sm whitespace-nowrap group-hover:border-acid-lime/30 transition-colors"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Spacer to push button to bottom if desc is short */}
              <div className="mt-auto">
                <Link
                  href={getBookingLink(room.id)}
                  className="w-full bg-transparent text-acid-lime py-4 border border-acid-lime hover:bg-acid-lime hover:text-ink-black transition-all duration-300 text-center uppercase tracking-widest cursor-pointer flex items-center justify-center gap-3 rounded-sm font-semibold group/btn"
                >
                  ดำเนินการจอง
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
