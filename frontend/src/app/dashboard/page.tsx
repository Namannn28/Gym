"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weightData = [
  { date: 'Mon', weight: 80 },
  { date: 'Tue', weight: 79.8 },
  { date: 'Wed', weight: 79.5 },
  { date: 'Thu', weight: 79.2 },
  { date: 'Fri', weight: 79.0 },
  { date: 'Sat', weight: 78.8 },
  { date: 'Sun', weight: 78.5 },
];

const caloriesData = [
  { day: 'Mon', burn: 2400 },
  { day: 'Tue', burn: 2600 },
  { day: 'Wed', burn: 2200 },
  { day: 'Thu', burn: 2800 },
  { day: 'Fri', burn: 2500 },
  { day: 'Sat', burn: 3000 },
  { day: 'Sun', burn: 2100 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-electric-blue">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome back! Here's your weekly progress.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Current Weight</h3>
          <p className="text-3xl font-bold mt-2">78.5 kg</p>
          <span className="text-green-500 text-sm">-1.5 kg this week</span>
        </div>
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Daily Streak</h3>
          <p className="text-3xl font-bold mt-2">12 Days 🔥</p>
        </div>
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Water Intake</h3>
          <p className="text-3xl font-bold mt-2">2.5 / 3 L</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Weight Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Calories Burned</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Bar dataKey="burn" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
