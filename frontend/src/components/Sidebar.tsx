"use client";

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="w-64 bg-zinc-950 border-r border-zinc-900 p-6 hidden md:flex flex-col gap-6">
      <Link href="/" className="text-2xl font-black text-electric-blue mb-8">FitAI</Link>
      <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
      <Link href="/exercises" className="text-zinc-400 hover:text-white transition-colors">Exercises</Link>
      <Link href="/workout" className="text-zinc-400 hover:text-white transition-colors">Log Workout</Link>
      <Link href="/food" className="text-zinc-400 hover:text-white transition-colors">Nutrition & Water</Link>
      <Link href="/ai-coach" className="text-zinc-400 hover:text-white transition-colors">AI Coach</Link>
      <Link href="/marketplace" className="text-zinc-400 hover:text-white transition-colors">Marketplace</Link>
      <Link href="/settings" className="text-zinc-400 hover:text-white transition-colors">Settings</Link>
      
      <div className="mt-auto">
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-400 text-center">Hi, {user?.name}</span>
            <button 
              onClick={handleLogout}
              className="w-full text-center py-2 bg-red-900/30 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/50 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="block text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
