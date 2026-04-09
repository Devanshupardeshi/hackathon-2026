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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buildPrompt({ type, input }));
    const text = result.response.text();
    return res.json({ text });
  } catch (error) {
    return res.status(500).json({ message: "AI generation failed", error: error.message });
  }
};
