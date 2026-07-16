"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { fetchApi } from '@/lib/api';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchApi('/auth/me');
        login(token, data);
      } catch (err) {
        console.error("Token invalid, logging out");
        logout();
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, [token, login, logout]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading App...</div>;
  }

  return <>{children}</>;
}
