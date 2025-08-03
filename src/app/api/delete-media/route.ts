// /src/app/api/delete-media/route.ts

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const parts = url.split("/");
    const fileNameWithExt = parts[parts.length - 1];
    const publicIdWithoutExt = fileNameWithExt.split(".")[0];
    const folder = "uploads";
    const publicId = `${folder}/${publicIdWithoutExt}`;

    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ message: "Deletion failed" }, { status: 500 });
  }
}
