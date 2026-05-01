import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueName = Date.now() + "-" + file.name;
    const filePath = path.join(uploadDir, uniqueName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "Upload successful",
      fileUrl: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(uploadDir);

    const fileUrls = files.map((file) => `/uploads/${file}`);

    return NextResponse.json({ files: fileUrls });
  } catch (error) {
    console.error("Fetch files error:", error);

    return NextResponse.json(
      { error: "Could not load files" },
      { status: 500 }
    );
  }
}export async function DELETE(req: Request) {
  try {
    const { file } = await req.json();

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.split("/").pop();
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ message: "File deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}