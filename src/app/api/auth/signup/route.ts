import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { createUser, getUserByEmail } from "@/lib/users";

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

    // Hash password before saving
    const passwordHash = await bcrypt.hash(password, 12);

    const created = createUser(email, passwordHash, Date.now());

    if (!created.ok) {
      if (created.reason === "duplicate") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
      console.error("Unexpected DB error:", created.error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    // Fetch user ID (or use created.id directly)
    const user = getUserByEmail(email);
    if (!user?.id) {
      throw new Error("User not found after insert");
    }

    await createSession(String(user?.id));

    return NextResponse.json({ ok: true, user: { id: String(user?.id) } });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
