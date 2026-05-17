'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass, Sparkles, BookOpen } from 'lucide-react';
import MobileDrawer from './MobileDrawer';

interface NavbarProps {
  variant?: 'default' | 'discovery';
}

const NAV_LINKS = [
  { label: 'พื้นที่พักผ่อน', href: '/discovery', icon: Compass },
  { label: 'ประสบการณ์พิเศษ', href: '/discovery', icon: Sparkles },
  { label: 'บันทึกการเดินทาง', href: '/', icon: BookOpen },
];

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 flex justify-between items-center px-4 md:px-gutter py-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-headline-lg-mobile font-bold tracking-tighter text-acid-lime hover:opacity-80 transition-opacity"
        >
          AETHER
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-label-sm text-on-surface/70 hover:bg-acid-lime hover:text-ink-black transition-all duration-300 px-3 py-1.5 rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/discovery"
            className="hidden md:flex items-center gap-2 text-label-sm border border-outline-variant px-4 py-2 hover:bg-acid-lime hover:text-ink-black hover:border-acid-lime transition-all duration-300 rounded-sm"
          >
            จองตอนนี้
          </Link>
          <button
            aria-label={isDrawerOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="text-acid-lime hover:scale-95 transition-transform cursor-pointer p-1"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
