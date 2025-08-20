import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    return NextResponse.json({ email, password });
  } catch (error) {
    console.error("Error");
    return NextResponse.json({ error: "error", status: 500 });
  }
}
