"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Save, Loader2, User as UserIcon } from 'lucide-react';

export default function Settings() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    currentWeight: '',
    desiredWeight: '',
    activityLevel: ''
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const res = await fetchApi('/profile');
        if (res) {
          setFormData({
            age: res.age?.toString() || '',
            gender: res.gender || '',
            height: res.height?.toString() || '',
            currentWeight: res.currentWeight?.toString() || '',
            desiredWeight: res.desiredWeight?.toString() || '',
            activityLevel: res.activityLevel || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        gender: formData.gender || undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        currentWeight: formData.currentWeight ? parseFloat(formData.currentWeight) : undefined,
        desiredWeight: formData.desiredWeight ? parseFloat(formData.desiredWeight) : undefined,
        activityLevel: formData.activityLevel || undefined,
      };

      const res = await fetchApi('/profile', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // Update global user state with new weight
      if (user && res.profile) {
        setUser({ ...user, currentWeight: res.profile.currentWeight });
      }
      
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-6 md:p-12">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-electric-blue flex items-center gap-3">
              <UserIcon size={32} /> Profile Settings
            </h1>
            <p className="text-zinc-400 mt-2">Manage your personal information and goals.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-electric-blue" size={48} />
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Age</label>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Gender</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 175"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Current Weight (kg)</label>
                <input 
                  type="number" 
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 75"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Desired Weight (kg)</label>
                <input 
                  type="number" 
                  name="desiredWeight"
                  value={formData.desiredWeight}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Activity Level</label>
                <select 
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                </select>
              </div>

            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
