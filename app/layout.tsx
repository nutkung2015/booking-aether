import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AETHER | Booking Demo",
  description: "AETHER Web Booking Demo — ค้นหาและจองที่พักสุดหรูในประเทศไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`dark ${notoSansThai.variable}`}>
      <body className="bg-background text-on-surface antialiased selection:bg-acid-lime selection:text-ink-black min-h-screen flex flex-col relative overflow-x-hidden font-[family-name:var(--font-noto)]">
        <div className="fixed inset-0 pointer-events-none z-[100] bg-grain mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
