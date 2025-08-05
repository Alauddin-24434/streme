// app/api/media/route.ts
import { PrismaClient } from "@/generated/prisma";
import { MediaContentSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET ALL MEDIA CONTENT
export async function GET() {
  const media = await prisma.mediaContent.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(media);
}

// CREATE NEW MEDIA
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Validate body structure if needed

 console.log("Received body:", body);
  try {
    const newMedia = await prisma.mediaContent.create({
      data: body,
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create media." }, { status: 500 });
  }
}
