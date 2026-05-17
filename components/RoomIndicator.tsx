import { motion } from 'framer-motion';

interface RoomIndicatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function RoomIndicator({ total, current, onSelect }: RoomIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative cursor-pointer p-1 group"
          aria-label={`ห้องพักที่ ${i + 1}`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-acid-lime scale-125'
                : 'bg-outline-variant/50 group-hover:bg-on-surface-variant/70'
            }`}
          />
          {i === current && (
            <motion.div
              layoutId="room-indicator-ring"
              className="absolute inset-0 border border-acid-lime/50 rounded-full"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </button>
      ))}
      <span className="text-label-sm text-on-surface-variant ml-2">
        {current + 1}/{total}
      </span>
    </div>
  );
}
