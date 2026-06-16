import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white flex min-h-screen`}>
        {/* Simple Sidebar Navigation */}
        <nav className="w-64 bg-zinc-950 border-r border-zinc-900 p-6 hidden md:flex flex-col gap-6">
          <Link href="/" className="text-2xl font-black text-electric-blue mb-8">FitAI</Link>
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/exercises" className="text-zinc-400 hover:text-white transition-colors">Exercises</Link>
          <Link href="/workout" className="text-zinc-400 hover:text-white transition-colors">Log Workout</Link>
          <Link href="/food" className="text-zinc-400 hover:text-white transition-colors">Nutrition & Water</Link>
          <Link href="/ai-coach" className="text-zinc-400 hover:text-white transition-colors">AI Coach</Link>
          <Link href="/marketplace" className="text-zinc-400 hover:text-white transition-colors">Marketplace</Link>
          
          <div className="mt-auto">
            <Link href="/login" className="block text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">Login</Link>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
