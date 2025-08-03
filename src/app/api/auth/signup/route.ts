// File: app/api/auth/signup/route.ts


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { UserSchema } from "@/lib/validationSchemas";

const prisma = new PrismaClient();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validData = UserSchema.parse(body);

    const exists = await prisma.user.findUnique({
      where: { email: validData.email },
    });

    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name: validData.name,
        email: validData.email,
        password: hashedPassword,
      },
    });

    const accessToken = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message: "User created successfully",
        accessToken,
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
        },
      },
      { status: 201 }
    );

    response.headers.set(
      "Set-Cookie",
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
      })
    );

    return response;
  } catch (error: any) {
    console.error("Register API error:", error);

    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
