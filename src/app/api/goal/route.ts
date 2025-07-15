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
          content: `你是一位運動表現助理，根據用戶的體能測試資料，幫助他們選擇訓練目標。請分析用戶的身體概況，並建議三個簡潔、明確的訓練目標供他挑選。每個目標應該聚焦於一個特定的結果（例如：爆發力、速度、耐力），以2~3個字的簡短標題呈現，且具有激勵性，適合用於應用程式中。如果需要，可為每個目標附上一句簡短的描述。除非另外說明，假設用戶是中等體能的成年人。

⚠️ **請只輸出三個簡短、明確的目標標題，每個標題2~3個字，用換行分隔，不要附加描述或其他文字。**

例如：
爆發力增強
提升敏捷性
持久力鍛煉`,
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
