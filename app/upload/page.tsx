"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage("Upload failed ❌");
      return;
    }

    setMessage("Upload successful ✅");
    setFileUrl(data.fileUrl);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      
      <h1 className="text-5xl text-orange-500 font-bold mb-2">
        VibeRush 🔥
      </h1>

      <p className="text-gray-400 mb-8">
        Upload your sound. Build your wave.
      </p>

      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md">
        
        <h2 className="text-xl mb-4 text-center">
          Upload Music 🎵
        </h2>

        <input
          type="file"
          accept="audio/*"
          className="w-full mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-black py-2 rounded-lg"
        >
          Submit
        </button>

        {message && (
          <p className="mt-4 text-green-400 text-center">{message}</p>
        )}

        {fileUrl && (
          <audio controls className="mt-4 w-full">
            <source src={fileUrl} />
          </audio>
        )}
      </div>

      <a href="/library">
        <button className="mt-6 px-6 py-2 border border-orange-500 rounded-full">
          Go to Library 🎧
        </button>
      </a>

    </main>
  );
}
