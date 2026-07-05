import { useState } from "react";
import { Copy, ChevronDown } from "lucide-react";
import { getSetupPrompt } from "@/content/setupPrompts";

interface AgentSetupPromptsProps {
  productKey: string;
}

const AgentSetupPrompts = ({ productKey }: AgentSetupPromptsProps) => {
  const displayKey = productKey || "LM-XXXX-XXXX-XXXX-XXXX-XXXX";
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [openPrompts, setOpenPrompts] = useState<{ [key: string]: boolean }>({});

  const togglePrompt = (promptId: string) => {
    setOpenPrompts((prev) => ({ ...prev, [promptId]: !prev[promptId] }));
  };

  const copyToClipboard = (text: string, promptId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  // Single source of truth for prompt text lives in src/content/setupPrompts.ts
  // (shared with the redesigned CheckoutComplete success page).
  const prompts = [
    { id: "macos" as const, label: "macOS", color: "pink" },
    { id: "windows" as const, label: "Windows", color: "blue" },
    { id: "linux" as const, label: "Linux", color: "green" },
    { id: "api" as const, label: "REST API (Universal)", color: "amber" },
  ].map((p) => ({ ...p, prompt: getSetupPrompt(p.id, displayKey) }));

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[hsl(var(--brand-blue))]/20 bg-[hsl(var(--brand-blue))]/5 p-4">
        <p className="mb-2 text-sm font-medium">How to use these prompts:</p>
        <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          <li>Copy the prompt for your operating system</li>
          <li>Paste it into your AI agent (Claude, GPT, etc.)</li>
          <li>Your agent will handle the complete installation</li>
        </ol>
      </div>

      {prompts.map(({ id, label, prompt }) => (
        <div key={id} className="rounded-lg border border-border bg-card">
          <div
            onClick={() => togglePrompt(id)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && togglePrompt(id)}
          >
            <span className="font-medium">{label} Installation Prompt</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(prompt, id);
                }}
                className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm hover:bg-background"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedPrompt === id ? "Copied!" : "Copy"}
              </button>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openPrompts[id] ? "rotate-180" : ""}`} />
            </div>
          </div>

          {!openPrompts[id] && (
            <div className="border-t border-border px-4 pb-4">
              <pre className="mt-3 max-h-24 overflow-hidden rounded bg-background p-3 font-mono text-xs text-muted-foreground">
                {prompt.substring(0, 300)}...
              </pre>
            </div>
          )}

          {openPrompts[id] && (
            <div className="border-t border-border px-4 pb-4">
              <pre className="mt-3 max-h-96 overflow-y-auto rounded bg-background p-3 font-mono text-xs text-foreground whitespace-pre-wrap">
                {prompt}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AgentSetupPrompts;
