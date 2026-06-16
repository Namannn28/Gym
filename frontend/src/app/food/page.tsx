"use client";

import { useState } from 'react';
import { Search, Plus, Droplet } from 'lucide-react';

export default function FoodWaterLogger() {
  const [water, setWater] = useState(0);

  const addWater = (amount: number) => {
    setWater(prev => Math.min(prev + amount, 4000));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-electric-blue">Nutrition & Hydration</h1>
          <p className="text-zinc-400 mt-2">Track your daily food and water intake.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Food Logger */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Log Food</h2>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search USDA database..." 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="space-y-4">
              {/* Mock Food Items */}
              <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div>
                  <h4 className="font-bold">Chicken Breast</h4>
                  <p className="text-sm text-zinc-400">100g • 165 kcal • 31g Protein</p>
                </div>
                <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div>
                  <h4 className="font-bold">Brown Rice</h4>
                  <p className="text-sm text-zinc-400">1 cup • 216 kcal • 5g Protein</p>
                </div>
                <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Water Tracker */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Water Intake</h2>
            <p className="text-zinc-400 mb-6">Daily Goal: 3000 ml</p>
            
            <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-full border-4 border-zinc-800">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full" style={{ clipPath: `polygon(0 ${100 - (water/3000)*100}%, 100% ${100 - (water/3000)*100}%, 100% 100%, 0 100%)` }}></div>
              <div className="relative z-10 flex flex-col items-center">
                <Droplet className="text-blue-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{water}</span>
                <span className="text-zinc-400 text-sm">ml</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => addWater(250)} className="py-2 bg-zinc-800 hover:bg-blue-500/20 hover:text-blue-500 border border-zinc-700 rounded transition-colors">+250ml</button>
              <button onClick={() => addWater(500)} className="py-2 bg-zinc-800 hover:bg-blue-500/20 hover:text-blue-500 border border-zinc-700 rounded transition-colors">+500ml</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
