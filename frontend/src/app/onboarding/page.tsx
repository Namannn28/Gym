import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-lg p-8 space-y-8 bg-zinc-900 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-electric-blue">Setup Profile</h1>
        <form className="space-y-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium">Profile Photo URL</label>
            <Input type="text" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <Input type="number" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select className="w-full h-10 px-3 py-2 mt-1 bg-zinc-800 border border-zinc-700 rounded-md focus:border-blue-500 focus:outline-none transition-colors text-sm">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Height (cm)</label>
            <Input type="number" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Activity Level</label>
            <select className="w-full h-10 px-3 py-2 mt-1 bg-zinc-800 border border-zinc-700 rounded-md focus:border-blue-500 focus:outline-none transition-colors text-sm">
              <option>Sedentary</option>
              <option>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Very Active</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Current Weight (kg)</label>
            <Input type="number" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Desired Weight (kg)</label>
            <Input type="number" className="mt-1" />
          </div>
          <Button className="col-span-2 mt-4 font-bold">
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
