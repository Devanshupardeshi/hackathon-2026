import { useState } from "react";
import { api, getErrorMessage } from "../services/api";

type AiType = "roadmap" | "project" | "tasks" | "resume";

const modes: { id: AiType; label: string; desc: string; icon: string }[] = [
  { id: "roadmap", label: "Learning roadmap", desc: "Structured skill paths.", icon: "map" },
  { id: "project", label: "Project ideas", desc: "Portfolio-ready concepts.", icon: "lightbulb" },
  { id: "tasks", label: "Task generation", desc: "Prioritized checklist from a goal.", icon: "checklist" },
  { id: "resume", label: "Resume feedback", desc: "ATS-oriented suggestions.", icon: "description" }
];

export default function AIAssistant() {
  const [type, setType] = useState<AiType>("roadmap");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!input.trim()) return;
    setBusy(true);
    setError("");
    setOutput("");
    try {
      const { data } = await api.post<{ text: string }>("/ai/generate", {
        type,
        input: input.trim()
      });
      setOutput(data.text);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8 relative w-full h-full max-w-5xl mx-auto">
      <div className="mb-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-tertiary mb-2 block">
              Intelligence suite
            </span>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">AI productivity</h1>
            <p className="text-on-surface-variant text-sm mt-2 max-w-xl">
              Powered by Google Gemini through your CampusFlow backend. Nothing leaves the app without your prompt.
            </p>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-primary to-primary-dim p-8 rounded-xl text-on-primary">
            <div className="relative z-10 h-full flex flex-col justify-between gap-6">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                  <span
                    className="material-symbols-outlined text-2xl text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-headline mb-2">Ask CampusFlow AI</h3>
                <p className="text-on-primary/80 max-w-md text-sm leading-relaxed">
                  Pick a mode below, describe your context, and run generation. Outputs are plain text you can paste into
                  tasks or your resume doc.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <textarea
                  className="w-full min-h-[100px] bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Describe your goal, stack, or paste resume bullets…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {modes.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setType(m.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        type === m.id ? "bg-white text-primary border-white" : "border-white/30 text-white/90"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={run}
                  className="self-start flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-bold text-sm disabled:opacity-60"
                >
                  {busy ? "Generating…" : "Generate"}
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>

          <div className="space-y-4">
            {modes.slice(0, 2).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setType(m.id)}
                className="w-full text-left bg-surface-container-lowest p-6 rounded-xl hover:shadow-[0px_24px_48px_rgba(44,47,49,0.06)] transition-all group border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-secondary mb-3 block text-3xl">{m.icon}</span>
                <h4 className="font-bold text-on-surface mb-1">{m.label}</h4>
                <p className="text-xs text-on-surface-variant">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <section className="bg-surface-container-low rounded-xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white">smart_toy</span>
            </div>
            <div>
              <h2 className="text-xl font-bold font-headline">Latest result</h2>
              <p className="text-xs text-on-surface-variant font-medium">
                {modes.find((m) => m.id === type)?.label ?? "Output"}
              </p>
            </div>
          </div>
          {output ? (
            <pre className="whitespace-pre-wrap text-sm text-on-surface leading-relaxed font-body bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10 max-h-[480px] overflow-y-auto">
              {output}
            </pre>
          ) : (
            <p className="text-sm text-on-surface-variant">Run a generation to see AI output here.</p>
          )}
        </section>
      </div>
    </div>
  );
}
