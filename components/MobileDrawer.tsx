'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[45] h-full w-[85%] max-w-sm bg-surface border-l border-outline-variant/30 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-outline-variant/20">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">
                เมนูนำทาง
              </span>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow flex flex-col gap-1 p-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-4 text-on-surface hover:bg-acid-lime hover:text-ink-black rounded-sm transition-all duration-200 group"
                  >
                    <link.icon size={20} className="text-acid-lime group-hover:text-ink-black transition-colors" />
                    <span className="text-body-md flex-grow">{link.label}</span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="p-6 border-t border-outline-variant/20">
              <Link
                href="/discovery"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-acid-lime text-ink-black text-label-sm py-4 px-6 hover:bg-acid-lime/90 transition-colors rounded-sm font-semibold uppercase tracking-wider"
              >
                จองตอนนี้
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
