import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RoomStack from '@/components/RoomStack';
import FilterPanel from '@/components/FilterPanel';

export default function DiscoveryPage() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {/* Top Navigation (Back Action) */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-gutter py-4 max-w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
        <Link href="/" className="flex items-center gap-2 text-acid-lime hover:scale-95 transition-transform">
          <ArrowLeft size={20} />
          <span className="text-label-sm uppercase">กลับหน้าค้นหา</span>
        </Link>
        <Link href="/" className="text-headline-lg-mobile font-bold tracking-tighter text-acid-lime hover:opacity-80 transition-opacity">
          AETHER
        </Link>
        <FilterPanel />
      </header>

      {/* Main Content Area */}
      <RoomStack />
    </div>
  );
}
