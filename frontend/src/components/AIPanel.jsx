import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import api from "../services/api";

const AI_TYPES = [
  { value: "roadmap", label: "Learning roadmap" },
  { value: "project", label: "Project ideas" },
  { value: "tasks", label: "Task list" },
  { value: "resume", label: "Resume feedback" }
];

const AIPanel = () => {
  const [type, setType] = useState("roadmap");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setError("");
    setOutput("");
    setLoading(true);
    try {
      const { data } = await api.post("/ai/generate", { type, input });
      setOutput(data.text || "");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not reach AI. Check GEMINI_API_KEY on the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="AI productivity assistant"
      subtitle="Powered by Gemini via your backend—keep prompts specific for better results."
      className="border-indigo-200 bg-gradient-to-br from-white to-violet-50"
    >
      <div className="space-y-3">
        <select className="input-field max-w-md" value={type} onChange={(e) => setType(e.target.value)}>
          {AI_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <textarea
          className="input-field min-h-[120px]"
          placeholder="Describe your goal, stack, or paste resume text for feedback..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="button" onClick={generate} disabled={loading || !input.trim()}>
          {loading ? "Generating…" : "Generate"}
        </Button>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        {output && (
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
            {output}
          </pre>
        )}
      </div>
    </Card>
  );
};

export default AIPanel;
