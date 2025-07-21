// app/api/device/sendMsg/route.ts

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.PROMOS_TOKEN;
  const apiUrl = "https://ifinder.promos.com.tw/ProGuard/api/sendMsg/";

  if (!token) {
    console.error("PROMOS_TOKEN is missing from environment variables.");
    return Response.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token,
        message,
      }),
    });

    const data = (await response.json()) as {
      state: string;
      message: string;
    };

    if (data.state === "0") {
      console.log("Message sent successfully:", data.message);
      return Response.json({ success: true, message: data.message });
    } else {
      console.error("ProMOS API Error:", data.message);
      return Response.json(
        { success: false, error: data.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
