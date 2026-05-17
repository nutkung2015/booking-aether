'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { Compass, CalendarDays, ArrowRight, Users, MapPin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const THAILAND_PROVINCES = [
  "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
  "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ",
  "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
  "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
  "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี",
  "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา",
  "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่",
  "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา",
  "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน",
  "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ",
  "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี",
  "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย",
  "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์",
  "อุทัยธานี", "อุบลราชธานี"
];

const MONTHS_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];
const DAYS_TH = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

/* ── Shared style constants ──────────────────────── */
const LABEL_CLS = "text-label-sm text-on-surface-variant/70 block mb-2.5 uppercase tracking-widest";
const FIELD_WRAPPER = "relative flex items-center border-b border-outline-variant/40 hover:border-acid-lime/60 focus-within:border-acid-lime transition-colors duration-300 pb-3 cursor-pointer";
const ICON_CLS = "text-on-surface-variant/50 mr-3 shrink-0 transition-colors duration-300 group-hover:text-acid-lime/70 group-focus-within:text-acid-lime";
const INPUT_BASE = "w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none font-noto text-lg font-medium tracking-tight";
const PLACEHOLDER_CLR = "text-on-surface-variant/40";

/* ── Date formatting helper ──────────────────────── */
const formatThaiDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split('-').map(Number);
  const monthAbbr = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  return `${d} ${monthAbbr[m - 1]} ${y + 543}`;
};

/* ── Reusable, Isolated Calendar dropdown Component ─ */
function CalendarDropdown({
  value,
  onChange,
  onClose,
  minDateStr
}: {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  minDateStr?: string;
}) {
  const today = new Date();
  const initialDate = value ? new Date(value) : today;
  
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  
  // Previous month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      month: currentMonth === 0 ? 11 : currentMonth - 1,
      year: currentMonth === 0 ? currentYear - 1 : currentYear,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: currentMonth,
      year: currentYear,
      isCurrentMonth: true
    });
  }

  // Next month padding to make full 6 rows
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      month: currentMonth === 11 ? 0 : currentMonth + 1,
      year: currentMonth === 11 ? currentYear + 1 : currentYear,
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDay = (d: { day: number; month: number; year: number }, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formatted = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    onChange(formatted);
    onClose();
  };

  const isSelected = (d: { day: number; month: number; year: number }) => {
    if (!value) return false;
    const [vy, vm, vd] = value.split('-').map(Number);
    return d.day === vd && d.month === vm - 1 && d.year === vy;
  };

  const isToday = (d: { day: number; month: number; year: number }) => {
    return d.day === today.getDate() && d.month === today.getMonth() && d.year === today.getFullYear();
  };

  const isDisabled = (d: { day: number; month: number; year: number }) => {
    const checkDate = new Date(d.year, d.month, d.day);
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (checkDate < compareToday) return true;

    if (minDateStr) {
      const [my, mm, md] = minDateStr.split('-').map(Number);
      const compareMin = new Date(my, mm - 1, md);
      if (checkDate < compareMin) return true;
    }
    return false;
  };

  return (
    <div className="absolute top-full left-0 mt-3 p-4 bg-surface-container/95 border border-outline-variant/30 rounded-md shadow-2xl backdrop-blur-2xl w-80 z-30 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-white/10 rounded-sm text-on-surface transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-body-md font-bold text-on-surface tracking-wide">
          {MONTHS_TH[currentMonth]} {currentYear + 543}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-white/10 rounded-sm text-on-surface transition-colors cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center gap-1">
        {DAYS_TH.map((d) => (
          <span key={d} className="text-label-sm text-on-surface-variant/40 font-semibold uppercase">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => {
          const selected = isSelected(d);
          const activeToday = isToday(d);
          const disabled = isDisabled(d);
          
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={(e) => handleSelectDay(d, e)}
              className={`
                aspect-square flex items-center justify-center text-label-md rounded-sm transition-all duration-200 cursor-pointer
                ${!d.isCurrentMonth ? 'text-on-surface-variant/20' : 'text-on-surface/80'}
                ${selected ? 'bg-acid-lime text-ink-black font-bold scale-105 shadow-lg shadow-acid-lime/20' : ''}
                ${!selected && activeToday ? 'border border-acid-lime/50 text-acid-lime font-medium' : ''}
                ${!selected && !activeToday && !disabled ? 'hover:bg-white/10 hover:text-on-surface' : ''}
                ${disabled ? 'text-on-surface-variant/10 cursor-not-allowed line-through' : ''}
              `}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchForm() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (checkInRef.current && !checkInRef.current.contains(e.target as Node)) {
        setShowCheckInPicker(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(e.target as Node)) {
        setShowCheckOutPicker(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredSuggestions = destination
    ? THAILAND_PROVINCES.filter(h => h.includes(destination))
    : THAILAND_PROVINCES;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    // Save to localStorage so it can be retrieved onInit if needed
    localStorage.setItem('booking_dest', destination);
    localStorage.setItem('booking_checkIn', checkIn);
    localStorage.setItem('booking_checkOut', checkOut);
    localStorage.setItem('booking_guests', guests);

    const params = new URLSearchParams();
    if (destination) params.set('dest', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    router.push(`/discovery?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-8 w-full">
      {/* ── Row 1: Destination ──────────────────────── */}
      <div ref={destRef} className="w-full relative group z-20">
        <label className={LABEL_CLS} htmlFor="search-destination">
          จุดหมายปลายทาง
        </label>
        <div className={FIELD_WRAPPER} onClick={() => setShowSuggestions(true)}>
          <MapPin size={18} className={ICON_CLS} />
          <input
            className={`${INPUT_BASE} placeholder:${PLACEHOLDER_CLR} ${destination ? 'text-on-surface' : 'text-on-surface-variant/40'}`}
            placeholder="เลือกจังหวัด..."
            type="text"
            id="search-destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            autoComplete="off"
          />
        </div>

        {/* Dropdown suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline-variant/30 rounded-md shadow-2xl max-h-60 overflow-y-auto no-scrollbar backdrop-blur-xl">
            {filteredSuggestions.map((province) => (
              <div
                key={province}
                className="px-4 py-3 cursor-pointer hover:bg-acid-lime/10 text-body-md text-on-surface/80 hover:text-on-surface transition-colors duration-200 flex items-center gap-3"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDestination(province);
                  setShowSuggestions(false);
                }}
              >
                <Compass size={14} className="text-on-surface-variant/40 shrink-0" />
                {province}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Row 2: Dates + Guests + CTA ────────────── */}
      <div className="flex flex-col md:flex-row items-end gap-8 w-full">

        {/* Check-in */}
        <div ref={checkInRef} className="w-full md:flex-1 relative group">
          <label className={LABEL_CLS} htmlFor="search-checkin">
            เช็คอิน
          </label>
          <div className={FIELD_WRAPPER} onClick={() => setShowCheckInPicker(!showCheckInPicker)}>
            <CalendarDays size={18} className={ICON_CLS} />
            <span className={`${INPUT_BASE} ${checkIn ? 'text-on-surface' : PLACEHOLDER_CLR}`}>
              {checkIn ? formatThaiDate(checkIn) : 'วันเช็คอิน'}
            </span>
          </div>
          {showCheckInPicker && (
            <CalendarDropdown
              value={checkIn}
              onChange={(val) => {
                setCheckIn(val);
                if (checkOut && new Date(val) >= new Date(checkOut)) {
                  setCheckOut('');
                }
              }}
              onClose={() => setShowCheckInPicker(false)}
            />
          )}
        </div>

        {/* Check-out */}
        <div ref={checkOutRef} className="w-full md:flex-1 relative group">
          <label className={LABEL_CLS} htmlFor="search-checkout">
            เช็คเอาท์
          </label>
          <div className={FIELD_WRAPPER} onClick={() => setShowCheckOutPicker(!showCheckOutPicker)}>
            <CalendarDays size={18} className={ICON_CLS} />
            <span className={`${INPUT_BASE} ${checkOut ? 'text-on-surface' : PLACEHOLDER_CLR}`}>
              {checkOut ? formatThaiDate(checkOut) : 'วันเช็คเอาท์'}
            </span>
          </div>
          {showCheckOutPicker && (
            <CalendarDropdown
              value={checkOut}
              onChange={setCheckOut}
              onClose={() => setShowCheckOutPicker(false)}
              minDateStr={checkIn || undefined}
            />
          )}
        </div>

        {/* Guests */}
        <div className="w-full md:w-40 relative group">
          <label className={LABEL_CLS} htmlFor="search-guests">
            ผู้เข้าพัก
          </label>
          <div className={FIELD_WRAPPER}>
            <Users size={18} className={ICON_CLS} />
            <select
              className={`${INPUT_BASE} text-on-surface cursor-pointer appearance-none pr-6`}
              id="search-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-surface-container text-on-surface">
                  {n} คน
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 text-on-surface-variant/40 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-acid-lime text-ink-black text-label-sm px-10 py-4.5 border-2 border-acid-lime hover:bg-transparent hover:text-acid-lime transition-all duration-300 flex items-center justify-center gap-3 shrink-0 group cursor-pointer rounded-md font-bold uppercase tracking-widest"
        >
          <span>ค้นหาที่พัก</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </form>
  );
}
