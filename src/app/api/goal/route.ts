import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `你是一位專業的健身教練與運動表現專家，專門根據使用者的身體數據和體能測試結果，設計個人化的訓練目標。請根據提供的使用者資料（年齡、性別、身高、體重、體能水平和測試數據），分析其優勢與待加強之處，並建議三個不同的訓練目標。
每個目標請包含：
目標名稱（簡短有力且吸引人）
原因（說明為什麼這個目標適合該使用者，並連結其資料）
重點（3 個重點，包含訓練方向、飲食建議或改善方法）
用以下格式呈現：
**1. [目標名稱]**  
- **目標**: [清楚描述該目標，1–2 行]  
- **原因**: [說明為什麼此目標對使用者重要]  
- **重點**:  
 - [重點1]  
 - [重點2]  
 - [重點3]  
請用繁體中文回答，語氣專業又具有激勵性，並讓建議實用，適合每週運動 3–5 次的人。若使用者在某些領域已有高水準表現，請提供具有挑戰性但仍可達成的目標`,
        },
        {
          role: "user",
          content: input,
        },
      ],
      max_tokens: 300,
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
