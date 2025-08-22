// lib/users.ts
import { db } from "./db";

export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
};

export function createUser(
  email: string,
  passwordHash: string,
  createdAt: number
) {
  try {
    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)"
    );
    const res = stmt.run(email, passwordHash, createdAt);
    return { ok: true as const, id: String(res.lastInsertRowid) };
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err &&
      "code" in err &&
      err.code?.toString().startsWith("SQLITE_CONSTRAINT")
    ) {
      return { ok: false as const, reason: "duplicate" as const };
    }
    return { ok: false as const, reason: "unknown" as const, error: err };
  }
}

export function getUserByEmail(email: string): UserRow | null {
  const stmt = db.prepare(
    "SELECT id, email, password_hash FROM users WHERE email = ?"
  );
  const row = stmt.get(email) as UserRow | undefined;
  return row ?? null;
}
