// lib/session.ts
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretStr = process.env.JWT_SECRET;
if (!secretStr) {
  throw new Error(
    "JWT_SECRET is missing. Set it in .env.local (dev) and in your deployment env."
  );
}
if (secretStr.length < 32) {
  console.warn("JWT_SECRET is short; use at least 32 characters for HS256.");
}
const secret = new TextEncoder().encode(secretStr);

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId, typ: "session" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function auth() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.sub as string };
  } catch {
    return null;
  }
}
