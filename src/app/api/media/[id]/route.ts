// app/api/media/[id]/route.ts

import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const media = await prisma.mediaContent.findUnique({
      where: { id: params.id },
      include: {
        episodes: true, // Include episodes if needed
      },
    });

    if (!media) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
