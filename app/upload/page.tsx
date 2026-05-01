"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async () => {
    if (!file) return setMessage("Choose a music file first");

    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) return setMessage("Upload failed");

    setMessage("Upload successful ✅");
    setFileUrl(data.fileUrl);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-6">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-orange-500">
          VibeRush 🔥
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Upload your sound. Build your wave.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white">
            Upload Music 🎵
          </h2>

          <input
            type="file"
            accept="audio/*"
            className="mt-6 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setMessage("");
              setFileUrl("");
            }}
          />

          {file && (
            <p className="mt-4 text-sm text-orange-300">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="mt-5 w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-black hover:bg-orange-400"
          >
            Submit
          </button>

          {message && (
            <p className="mt-4 text-center text-green-400">{message}</p>
          )}

          {fileUrl && (
            <audio controls className="mt-6 w-full">
              <source src={fileUrl} />
            </audio>
          )}
        </div>

        <a href="/library">
          <button className="mt-6 rounded-full border border-orange-500 px-6 py-2 text-orange-400 hover:bg-orange-500 hover:text-black">
            Go to Library 🎧
          </button>
        </a>
      </div>
    </main>
  );
}