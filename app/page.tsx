"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function handleSubmit() {
    if (!file) {
      setMessage("Please choose a music file first.");
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
      setMessage("Upload failed.");
      return;
    }

    setMessage(`✅ ${file.name} uploaded successfully.`);
    setFileUrl(data.fileUrl);
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-500">Upload Music 🎵</h1>

      <input
        type="file"
        accept="audio/*"
        className="mt-6 text-white"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
          setMessage("");
          setFileUrl("");
        }}
      />

      {file && <p className="mt-4 text-gray-300">Selected: {file.name}</p>}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-lg"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-green-400">{message}</p>}

      {fileUrl && (
        <audio controls className="mt-6">
          <source src={fileUrl} />
        </audio>
      )}
    </main>
  );
}