import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero / Search Section */}
      <main className="relative flex-grow flex items-center justify-center min-h-screen pt-[80px]">
        {/* Immersive Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida/ADBb0uj8TXdhblI92dtMVT_07dUCKc-qVoIr4GX_8I5t1sTteUG4oDM2FxXRKePs4mY5ANiPcnd7xVjf9clo1oKmMLQV_FSvfuJJjf_aNoz65GLieqfjV4Xmi0V-wa9xHt4MGA1UW-lyXtO1HykdcxNlkHx-KYQpWTLtFlN5-z1E0HwoXU7WOYtmzaV2naeBmtNFvuRDP73DAllUca_XnUp-lEDBhwPzRcy9Z2HcTkG2hjozO7VWUGAZoz_KjkY"
            alt="Railay Beach, Thailand"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </div>

        {/* Blurry-Glass Command Palette */}
        <div className="relative z-10 w-full max-w-5xl px-4 md:px-gutter">
          <div className="bg-surface/20 backdrop-blur-2xl border border-surface-variant/50 p-6 md:p-12 shadow-2xl flex flex-col gap-8 md:gap-12 rounded-lg">
            <h1 className="text-headline-lg-mobile md:text-display-2xl text-primary text-center md:text-left drop-shadow-lg">
              เลือก <br />
              <span className="text-acid-lime">จุดหมายปลายทางของคุณ</span>
            </h1>
            <SearchForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-ink-black w-full py-16 md:py-section-gap px-4 md:px-margin-page border-t border-outline-variant flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        <div className="flex flex-col gap-4">
          <span className="text-headline-lg text-on-surface">AETHER</span>
          <span className="text-label-sm text-on-surface-variant">
            ©2024 AETHER VOID. ออกแบบเพื่อการพักผ่อนที่เหนือระดับ
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <Link
            href="/discovery"
            className="text-label-sm text-on-surface-variant hover:text-acid-lime underline transition-colors"
          >
            ค้นหาที่พัก
          </Link>
          <Link
            href="/"
            className="text-label-sm text-on-surface-variant hover:text-acid-lime underline transition-colors"
          >
            เกี่ยวกับเรา
          </Link>
          <Link
            href="/"
            className="text-label-sm text-on-surface-variant hover:text-acid-lime underline transition-colors"
          >
            ติดต่อ
          </Link>
        </div>
      </footer>
    </div>
  );
}
