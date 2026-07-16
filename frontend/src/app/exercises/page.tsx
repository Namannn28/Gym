"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';

type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  category: string;
  difficulty: string;
};

export default function ExerciseLibrary() {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        // Add debounce or fetch based on search query later if needed
        // For now, let's fetch all or limited set
        const res = await fetchApi(`/exercises?search=${encodeURIComponent(search)}&limit=50`);
        setExercises(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadExercises();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-electric-blue">Exercise Library</h1>
          <p className="text-zinc-400 mt-2">Discover and search over 1000+ exercises.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search exercises..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="bg-zinc-800 p-2 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center justify-center">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-electric-blue" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(ex => (
            <div key={ex.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold mb-2">{ex.name}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300">{ex.muscleGroup}</span>
                <span className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300">{ex.category}</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-900/50">{ex.difficulty}</span>
              </div>
            </div>
          ))}
          {exercises.length === 0 && (
            <div className="col-span-full text-center text-zinc-500 py-12">
              No exercises found matching "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
