// app/api/device/last/route.ts

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.PROMOS_TOKEN;
  const apiUrl = "https://ifinder.promos.com.tw/ProGuard/api/last/";

  if (!token) {
    console.error("PROMOS_TOKEN is missing from environment variables.");
    return Response.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ token }),
    });

    const data = (await response.json()) as {
      state: string;
      message: any;
    };

    if (data.state === "0") {
      // Success
      console.log("Latest Smartwatch Data:", data.message);
      return Response.json({ success: true, data: data.message });
    } else {
      // API returned error
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
