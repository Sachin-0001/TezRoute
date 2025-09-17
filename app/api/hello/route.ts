import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const { message } = await request.json();

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    return NextResponse.json({ reply: "Server misconfigured: missing API key." }, { status: 500 });
  }

  const instructions =
    "You are railAI, an expert railway control personnel with years of experience in managing train traffic, resolving conflicts, and optimizing railway operations. Provide clear, professional, and practical advice for railway control scenarios. Answer concisely and confidently, using industry best practices.";

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${instructions}\n\nUser: ${message}`;

    const result = await model.generateContent(prompt);
    const reply =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't get a response.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Gemini API fetch failed:", err?.message || err);
    return NextResponse.json(
      { reply: "Gemini API fetch failed. Check server logs for details." },
      { status: 500 }
    );
  }
}
