"use client";

import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function WorkoutLogger() {
  const [sets, setSets] = useState([{ id: 1, exercise: '', weight: '', reps: '' }]);

  const addSet = () => {
    setSets([...sets, { id: sets.length + 1, exercise: '', weight: '', reps: '' }]);
  };

  const removeSet = (id: number) => {
    setSets(sets.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-electric-blue">Log Workout</h1>
          <p className="text-zinc-400 mt-2">Record your sets, reps, and weight.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 transition-colors">
          <Save size={18} />
          Save
        </button>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-zinc-400 px-2 hidden md:grid">
          <div className="col-span-5">Exercise</div>
          <div className="col-span-3">Weight (kg)</div>
          <div className="col-span-3">Reps</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        <div className="space-y-4">
          {sets.map((set, index) => (
            <div key={set.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-zinc-950 p-4 md:p-2 rounded-lg border border-zinc-800 md:border-transparent">
              <div className="col-span-5">
                <label className="block text-xs text-zinc-500 mb-1 md:hidden">Exercise</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bench Press" 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-zinc-500 mb-1 md:hidden">Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-zinc-500 mb-1 md:hidden">Reps</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1 flex justify-end md:justify-center">
                <button 
                  onClick={() => removeSet(set.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={addSet}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 border border-dashed border-zinc-700 text-zinc-400 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <Plus size={18} />
          Add Set
        </button>
      </div>
    </div>
  );
}
