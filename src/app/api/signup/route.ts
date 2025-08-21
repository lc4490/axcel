import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// Ensure Node runtime so fs/sqlite are allowed
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // Never store plaintext passwords: hash them
    const passwordHash = await bcrypt.hash(password, 12);

    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)"
    );

    try {
      stmt.run(email, passwordHash, Date.now());
    } catch (err: unknown) {
      // Unique constraint (email already exists)
      if (
        typeof err === "object" &&
        err &&
        "code" in err &&
        (err as any).code?.toString().startsWith("SQLITE_CONSTRAINT")
      ) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
      throw err;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
