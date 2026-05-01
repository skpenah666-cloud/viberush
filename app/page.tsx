export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl text-orange-500 font-bold">
        VibeRush 🔥
      </h1>

      <a href="/upload">
        <button className="px-6 py-3 bg-orange-500 text-black rounded">
          Upload Music
        </button>
      </a>

      <a href="/library">
        <button className="px-6 py-3 border border-orange-500 rounded">
          View Library
        </button>
      </a>
    </main>
  );
}