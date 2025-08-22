import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // same helper used in /api/register
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

// Ensure Node runtime so sqlite is allowed
export const runtime = "nodejs";

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
};

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const row = db
      .prepare("SELECT id, email, password_hash FROM users WHERE email = ?")
      .get(email) as UserRow | undefined;

    if (!row) {
      // Email not found
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 402 });
    }

    await createSession(String(row.id));
    // ✅ Auth success (you can set a cookie/JWT here later)
    return NextResponse.json({
      ok: true,
      userId: String(row.id),
      email: String(row.email),
    });
  } catch (err) {
    console.error("Signin error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
