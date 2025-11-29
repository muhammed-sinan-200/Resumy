const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getFeedback = async (resumeText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are an expert resume reviewer.

    Return ONLY valid JSON in the exact following format:
    {
      "intro":"string",
      "summary":"string 2-4 lines",
      "improvements":["point1","point2","point3",...],
      "suggestions":["point1","point2","point3",...]
    }

Rules:
1. Identify the candidate's name (if available) and use it once in the intro.
2. Never add extra fields add markdown like **bold**, *, -, #, emojis, or bullets.
3. Provide 5–7 clear improvements and suggestions.
4. Keep responses under 200 words.
5. Improvements and Suggestions must be an array of short, actionable one-line items.
6. Output must be a valid JSON

Here is the resume content:
${resumeText}
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: "application/json"
      }
    });

    const text = result.response.text();

    console.log("Gemini Feedback:\n", text);

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = { getFeedback };





