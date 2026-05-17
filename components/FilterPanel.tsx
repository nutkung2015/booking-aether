'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, BedDouble, Mountain, Waves } from 'lucide-react';

const AMENITY_FILTERS = [
  { label: 'สระว่ายน้ำ', icon: Waves },
  { label: 'วิวภูเขา', icon: Mountain },
  { label: 'เตียงคิงไซส์', icon: BedDouble },
];

const PRICE_RANGES = [
  { label: 'ทุกราคา', min: 0, max: Infinity },
  { label: '< ฿30,000', min: 0, max: 30000 },
  { label: '฿30,000 - ฿40,000', min: 30000, max: 40000 },
  { label: '> ฿40,000', min: 40000, max: Infinity },
];

interface FilterPanelProps {
  onFilterChange?: (filters: { priceRange: number; amenities: string[] }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (label: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handleApply = () => {
    onFilterChange?.({ priceRange: selectedPrice, amenities: selectedAmenities });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedPrice(0);
    setSelectedAmenities([]);
    onFilterChange?.({ priceRange: 0, amenities: [] });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-on-surface hover:text-acid-lime transition-colors cursor-pointer"
        aria-label="ตัวกรอง"
      >
        <SlidersHorizontal size={20} />
        {(selectedPrice > 0 || selectedAmenities.length > 0) && (
          <span className="w-2 h-2 bg-acid-lime rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-10 z-40 glass-panel rounded-lg p-6 w-72 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <span className="text-label-sm text-acid-lime uppercase tracking-widest">ตัวกรอง</span>
                <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-acid-lime transition-colors cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-3">
                <span className="text-label-sm text-on-surface-variant uppercase">ช่วงราคา</span>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPrice(i)}
                      className={`text-label-sm px-3 py-1.5 border rounded-sm transition-all duration-200 cursor-pointer ${
                        selectedPrice === i
                          ? 'bg-acid-lime text-ink-black border-acid-lime'
                          : 'border-outline-variant/50 text-on-surface-variant hover:border-acid-lime/50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-col gap-3">
                <span className="text-label-sm text-on-surface-variant uppercase">สิ่งอำนวยความสะดวก</span>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_FILTERS.map((amenity) => (
                    <button
                      key={amenity.label}
                      onClick={() => toggleAmenity(amenity.label)}
                      className={`flex items-center gap-1.5 text-label-sm px-3 py-1.5 border rounded-sm transition-all duration-200 cursor-pointer ${
                        selectedAmenities.includes(amenity.label)
                          ? 'bg-acid-lime text-ink-black border-acid-lime'
                          : 'border-outline-variant/50 text-on-surface-variant hover:border-acid-lime/50'
                      }`}
                    >
                      <amenity.icon size={14} />
                      {amenity.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-outline-variant/20">
                <button
                  onClick={handleReset}
                  className="flex-1 text-label-sm py-2 text-on-surface-variant hover:text-acid-lime border border-outline-variant/30 rounded-sm transition-colors cursor-pointer"
                >
                  ล้างทั้งหมด
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 text-label-sm py-2 bg-acid-lime text-ink-black rounded-sm hover:bg-acid-lime/90 transition-colors cursor-pointer font-semibold"
                >
                  ใช้ตัวกรอง
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
