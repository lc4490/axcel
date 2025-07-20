import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
          你是一位專業的健身教練與運動表現專家，專門根據使用者的身體數據和體能測試結果，設計個人化的訓練目標。
          
          ✅ 請務必給出 **三個不同的訓練目標**，每個目標包含：
          1. **目標名稱**（簡短有力且吸引人）
          2. **原因**（說明為什麼這個目標適合該使用者）
          3. **重點**（3 個重點，包含訓練方向、飲食建議或改善方法）
          
          ⚠️ 請務必用以下格式，且輸出必須包含三個編號的目標，避免省略：
          
          **1. [目標名稱]**
          - **目標**: ...
          - **原因**: ...
          - **重點**:
           - ...
           - ...
           - ...
          
          **2. [目標名稱]**
          - **目標**: ...
          - **原因**: ...
          - **重點**:
           - ...
           - ...
           - ...
          
          **3. [目標名稱]**
          - **目標**: ...
          - **原因**: ...
          - **重點**:
           - ...
           - ...
           - ...
          
          請用繁體中文回答，語氣專業且激勵人心。
          `,
        },
        {
          role: "user",
          content: input,
        },
      ],
      max_tokens: 1000,
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
