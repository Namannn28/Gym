"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, Droplet, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchApi } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FoodWaterLogger() {
  const [water, setWater] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWater() {
      try {
        const res = await fetchApi('/metrics/water');
        // Sum today's water
        const today = new Date().setHours(0, 0, 0, 0);
        const todaysLogs = (res || []).filter((log: any) => new Date(log.date).setHours(0, 0, 0, 0) === today);
        const totalWater = todaysLogs.reduce((acc: number, log: any) => acc + log.amount, 0);
        setWater(totalWater);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWater();
  }, []);

  const addWater = async (amount: number) => {
    try {
      setLoading(true);
      await fetchApi('/metrics/water', {
        method: 'POST',
        body: JSON.stringify({ amount, date: new Date().toISOString() })
      });
      setWater(prev => Math.min(prev + amount, 4000));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
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
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Log Food</h2>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search USDA database..." 
                    className="pl-10 h-12"
                  />
                </div>
                
                <div className="space-y-4">
                  {/* Mock Food Items - Pending real food DB API */}
                  <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <div>
                      <h4 className="font-bold">Chicken Breast</h4>
                      <p className="text-sm text-zinc-400">100g • 165 kcal • 31g Protein</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-blue-500 rounded-full hover:bg-blue-500/10">
                      <Plus size={20} />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <div>
                      <h4 className="font-bold">Brown Rice</h4>
                      <p className="text-sm text-zinc-400">1 cup • 216 kcal • 5g Protein</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-blue-500 rounded-full hover:bg-blue-500/10">
                      <Plus size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Water Tracker */}
          <div className="space-y-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Water Intake</h2>
                <p className="text-zinc-400 mb-6">Daily Goal: 3000 ml</p>
                
                <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-full border-4 border-zinc-800">
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full transition-all duration-500" style={{ clipPath: `polygon(0 ${100 - (water/3000)*100}%, 100% ${100 - (water/3000)*100}%, 100% 100%, 0 100%)` }}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {loading ? <Loader2 className="animate-spin text-blue-500 mb-2" size={32} /> : <Droplet className="text-blue-500 mb-2" size={32} />}
                    <span className="text-3xl font-bold">{water}</span>
                    <span className="text-zinc-400 text-sm">ml</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => addWater(250)} disabled={loading}>+250ml</Button>
                  <Button variant="outline" onClick={() => addWater(500)} disabled={loading}>+500ml</Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
