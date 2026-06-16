export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-electric-blue">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username or Email</label>
            <input type="text" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="w-full p-2 mt-1 bg-zinc-800 rounded" />
          </div>
          <button className="w-full py-2 font-bold text-black bg-blue-500 rounded hover:bg-blue-600">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
