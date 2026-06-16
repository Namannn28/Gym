export default function OnboardingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-lg p-8 space-y-8 bg-zinc-900 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-electric-blue">Setup Profile</h1>
        <form className="space-y-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium">Profile Photo URL</label>
            <input type="text" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input type="number" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select className="w-full p-2 mt-1 bg-zinc-800 rounded">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Height (cm)</label>
            <input type="number" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Activity Level</label>
            <select className="w-full p-2 mt-1 bg-zinc-800 rounded">
              <option>Sedentary</option>
              <option>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Very Active</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Current Weight (kg)</label>
            <input type="number" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Desired Weight (kg)</label>
            <input type="number" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <button className="col-span-2 w-full py-2 font-bold text-black bg-blue-500 rounded hover:bg-blue-600 mt-4">
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
