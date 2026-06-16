import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        Elevate Your <span className="text-blue-500">Fitness</span> Journey
      </h1>
      <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mb-10">
        The ultimate AI-powered gym management and fitness tracking platform.
        Track workouts, calories, and get personalized AI coaching.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/signup" className="px-8 py-3 text-lg font-bold text-black bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
          Get Started for Free
        </Link>
        <Link href="/login" className="px-8 py-3 text-lg font-bold text-white border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">
          Login
        </Link>
      </div>
    </div>
  );
}
