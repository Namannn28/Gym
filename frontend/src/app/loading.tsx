import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-electric-blue mb-4" size={48} />
      <p className="text-zinc-400 font-medium tracking-wide animate-pulse">Loading...</p>
    </div>
  );
}
