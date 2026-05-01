export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      
      <h1 className="text-5xl font-bold text-orange-500">
        VibeRush 🔥
      </h1>

      <p className="text-gray-400">
        Upload your sound. Build your wave.
      </p>

      <div className="flex gap-4">
        <a href="/upload">
          <button className="px-6 py-3 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition">
            Upload Music
          </button>
        </a>

        <a href="/library">
          <button className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition">
            View Library
          </button>
        </a>
      </div>

    </main>
  );
}
