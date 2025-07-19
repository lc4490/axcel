// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Store securely in .env.local
// });

// export async function POST(req: Request) {
//   try {
//     const { testResults, goal } = await req.json();

//     // Build the system prompt
//     const systemPrompt = `
//         你是一位專業運動表現教練，專注於根據用戶的體能測試資料和目標，設計個性化、結構化的訓練計畫。

//         請遵循以下格式輸出訓練計畫：

//         ---
//         🏋️ 訓練目標: ${goal}
//         📅 訓練週期: 4 週
//         📈 每週訓練頻率: 4 天 (例如: 星期一、二、四、六)
//         ⏱️ 單次訓練時間: 約 60–75 分鐘

//         ### 🗓️ 第1天 – <訓練主題>
//         1. <動作名稱> – <組數>x<次數> @ <強度說明>
//         2. <動作名稱> – <組數>x<次數> @ <強度說明>
//         3. <動作名稱> – <組數>x<次數> @ <強度說明>
//         4. <輔助或核心訓練> – <組數>x<次數>

//         ### 🗓️ 第2天 – <訓練主題>
//         1. ...
//         (重複上述格式直到完成4天計畫)

//         ---

//         ### ⚠️ 輸出規範：
//         1. **僅輸出訓練計畫，勿添加多餘說明或評論**。
//         2. 所有動作需包含 **組數、次數、強度提示 (例如 60% 1RM、全力爆發)**。
//         3. 動作名稱使用 **簡短明確**（例如「深蹲跳」、「推舉」、「30公尺衝刺」）。
//         4. 每天設計 **4–5 個動作**，強調爆發力和速度訓練。
//         `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: systemPrompt },
//         {
//           role: "user",
//           content: `
//             用戶資料:
//             ${testResults}
//             目標: ${goal}
//           `,
//         },
//       ],
//       max_tokens: 800,
//     });

//     const plan = completion.choices[0].message.content;

//     return NextResponse.json({ plan });
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
