import { useState } from "react";
import Card from "./Card";
import api from "../services/api";

const AIPanel = () => {
  const [type, setType] = useState("roadmap");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generate = async () => {
    const { data } = await api.post("/ai/generate", { type, input });
    setOutput(data.text);
  };

  return (
    <Card title="AI Productivity Assistant">
      <div className="space-y-2">
        <select className="border rounded p-2" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="roadmap">Generate learning roadmap</option>
          <option value="project">Suggest project ideas</option>
          <option value="tasks">Generate tasks</option>
          <option value="resume">Resume feedback</option>
        </select>
        <textarea className="w-full border rounded p-2" placeholder="Type your prompt..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg" onClick={generate}>
          Generate
        </button>
        {output && <pre className="whitespace-pre-wrap text-sm bg-slate-50 p-3 rounded">{output}</pre>}
      </div>
    </Card>
  );
};

export default AIPanel;
