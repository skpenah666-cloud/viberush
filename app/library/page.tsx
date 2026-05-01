"use client";

import { useEffect, useState } from "react";

export default function Library() {
  const [songs, setSongs] = useState<string[]>([]);

  const fetchSongs = async () => {
    const res = await fetch("/api/upload");
    const data = await res.json();
    setSongs(data.files || []);
  };

  const deleteSong = async (song: string) => {
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: song }),
    });

    fetchSongs();
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-orange-500">
              VibeRush 🎧
            </h1>
            <p className="text-gray-400 mt-1">
              Your uploaded music library
            </p>
          </div>

          <a href="/upload">
            <button className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-black hover:bg-orange-400">
              Upload
            </button>
          </a>
        </div>

        {songs.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-gray-400">No songs uploaded yet.</p>
            <a href="/upload">
              <button className="mt-4 rounded-full bg-orange-500 px-5 py-2 font-semibold text-black">
                Upload your first song
              </button>
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {songs.map((song, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg"
              >
                <p className="mb-3 font-semibold text-orange-300">
                  {song.split("/").pop()}
                </p>

                <audio controls className="w-full">
                  <source src={song} />
                </audio>

                <button
                  onClick={() => deleteSong(song)}
                  className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}