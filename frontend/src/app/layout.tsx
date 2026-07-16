import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

import AuthProvider from '@/components/AuthProvider';

import MobileNav from '@/components/MobileNav';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness AI Platform",
  description: "Your ultimate AI fitness coach and tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white flex min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <Sidebar />
          <MobileNav />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto md:ml-0 mt-0">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
