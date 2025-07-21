// app/api/device/route.ts

import { NextRequest } from "next/server";

type DeviceData = {
  device_id: string;
  upload_time: string;
  datetime: string;
  mode: string;
  [key: string]: unknown; // allow additional fields
};

export async function POST(req: NextRequest) {
  const token = process.env.PROMOS_TOKEN;

  if (!token) {
    console.error("PROMOS_TOKEN missing in env");
    return Response.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { type, message } = body;

    let apiUrl = "";
    const params = new URLSearchParams({ token });

    if (type === "report") {
      apiUrl = "https://ifinder.promos.com.tw/ProGuard/api/report/";
    } else if (type === "last") {
      apiUrl = "https://ifinder.promos.com.tw/ProGuard/api/last/";
    } else if (type === "sendMsg") {
      apiUrl = "https://ifinder.promos.com.tw/ProGuard/api/sendMsg/";
      if (!message) {
        return Response.json(
          { success: false, error: "Message is required for sendMsg" },
          { status: 400 }
        );
      }
      params.append("message", message);
    } else {
      return Response.json(
        { success: false, error: "Invalid API type" },
        { status: 400 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const data = (await response.json()) as {
      state: string;
      message: DeviceData[] | string;
    };

    if (data.state === "0") {
      console.log(`ProMOS API (${type}) Success:`, data.message);
      return Response.json({ success: true, data: data.message });
    } else {
      console.error(`ProMOS API (${type}) Error:`, data.message);
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
