"use client";

import { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

type Exercise = { id: string; name: string };

type SetInput = {
  id: number;
  exerciseId: string;
  weight: string;
  reps: string;
};

export default function WorkoutLogger() {
  const [sets, setSets] = useState<SetInput[]>([{ id: 1, exerciseId: '', weight: '', reps: '' }]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        const res = await fetchApi('/exercises?limit=100'); // Load top 100 exercises for dropdown
        setExercises(res.data || []);
      } catch (err) {
        console.error("Failed to load exercises", err);
      } finally {
        setLoading(false);
      }
    }
    loadExercises();
  }, []);

  const addSet = () => {
    setSets([...sets, { id: Date.now(), exerciseId: '', weight: '', reps: '' }]);
  };

  const removeSet = (id: number) => {
    setSets(sets.filter(s => s.id !== id));
  };

  const updateSet = (id: number, field: keyof SetInput, value: string) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Filter out empty sets
      const validSets = sets.filter(s => s.exerciseId && s.weight && s.reps).map(s => ({
        exerciseId: s.exerciseId,
        weight: parseFloat(s.weight),
        reps: parseInt(s.reps, 10),
        sets: 1, // we treat each row as 1 set
        restTime: 0
      }));

      if (validSets.length === 0) {
        alert("Please fill out at least one valid set.");
        return;
      }

      await fetchApi('/workouts', {
        method: 'POST',
        body: JSON.stringify({
          date: new Date().toISOString(),
          notes: 'Logged from web UI',
          sets: validSets
        })
      });

      alert("Workout saved successfully!");
      setSets([{ id: Date.now(), exerciseId: '', weight: '', reps: '' }]);
    } catch (err) {
      console.error(err);
      alert("Failed to save workout");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-6 md:p-12">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-electric-blue">Log Workout</h1>
            <p className="text-zinc-400 mt-2">Record your sets, reps, and weight.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
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
            {sets.map((set) => (
              <div key={set.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-zinc-950 p-4 md:p-2 rounded-lg border border-zinc-800 md:border-transparent">
                <div className="col-span-5">
                  <label className="block text-xs text-zinc-500 mb-1 md:hidden">Exercise</label>
                  <select 
                    value={set.exerciseId}
                    onChange={(e) => updateSet(set.id, 'exerciseId', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Exercise...</option>
                    {exercises.map(ex => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-zinc-500 mb-1 md:hidden">Weight (kg)</label>
                  <Input 
                    type="number" 
                    placeholder="0"
                    value={set.weight}
                    onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-zinc-500 mb-1 md:hidden">Reps</label>
                  <Input 
                    type="number" 
                    placeholder="0"
                    value={set.reps}
                    onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
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
    </ProtectedRoute>
  );
}
