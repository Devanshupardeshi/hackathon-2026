import { GoogleGenerativeAI } from "@google/generative-ai";

const buildPrompt = ({ type, input }) => {
  const base = "You are CampusFlow AI assistant for college students. Keep outputs actionable and concise.";
  if (type === "roadmap") return `${base}\nGenerate a learning roadmap for: ${input}`;
  if (type === "project") return `${base}\nSuggest 5 project ideas for: ${input}`;
  if (type === "tasks") return `${base}\nGenerate a prioritized task list for: ${input}`;
  if (type === "resume") return `${base}\nProvide resume feedback for: ${input}`;
  return `${base}\nHelp the user with: ${input}`;
};

export const generateAI = async (req, res) => {
  try {
    const { type, input } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Missing GEMINI_API_KEY" });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(buildPrompt({ type, input }));
    const response = result.response;
    let text;
    try {
      text = response.text();
    } catch (extractErr) {
      const cand = response.candidates?.[0];
      const reason = cand?.finishReason;
      const safety = cand?.safetyRatings;
      return res.status(502).json({
        message: "Model returned no usable text (blocked, empty, or unsupported response).",
        detail: extractErr.message,
        finishReason: reason,
        safetyRatings: safety
      });
    }
    if (!text || !String(text).trim()) {
      return res.status(502).json({ message: "Empty model response. Try rephrasing your prompt." });
    }
    return res.json({ text });
  } catch (error) {
    return res.status(500).json({ message: "AI generation failed", error: error.message });
  }
};
