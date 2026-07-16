"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/login');
  };

  const closeNav = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-6">
          <button 
            onClick={closeNav}
            className="absolute top-4 right-4 p-2 text-white"
          >
            <X size={32} />
          </button>

          <Link href="/" onClick={closeNav} className="text-3xl font-black text-electric-blue mb-12 mt-8">FitAI</Link>
          
          <div className="flex flex-col gap-6 text-xl">
            <Link href="/dashboard" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/exercises" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Exercises</Link>
            <Link href="/workout" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Log Workout</Link>
            <Link href="/food" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Nutrition & Water</Link>
            <Link href="/ai-coach" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">AI Coach</Link>
            <Link href="/marketplace" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Marketplace</Link>
            <Link href="/settings" onClick={closeNav} className="text-zinc-300 hover:text-white transition-colors">Settings</Link>
          </div>
          
          <div className="mt-auto pb-8">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <span className="text-zinc-400">Hi, {user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-900/30 text-red-400 border border-red-900/50 rounded-lg text-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={closeNav} className="block text-center py-3 bg-blue-600 text-white rounded-lg text-lg font-bold">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
