import { useState } from "react";
import { Copy, ChevronDown } from "lucide-react";

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

  const macosPrompt = `I have purchased a license key for local-memory. Please help me install and configure it completely on macOS:

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
Let's first check what's already installed:

# Check if local-memory is already installed
if command -v local-memory &> /dev/null; then
  echo "Local Memory found in PATH"
  local-memory --version
  local-memory license status
elif [ -f "/usr/local/bin/local-memory" ]; then
  echo "Local Memory found at /usr/local/bin/local-memory"
  /usr/local/bin/local-memory --version
  /usr/local/bin/local-memory license status
else
  echo "Local Memory not installed - proceeding with fresh installation"
fi

# Check Ollama status
if command -v ollama &> /dev/null; then
  echo "Ollama is installed:"
  ollama --version
  echo "Installed models:"
  ollama list
else
  echo "Ollama not installed"
fi

# Check Qdrant status
if [ -f "$HOME/.local-memory/qdrant" ]; then
  echo "Qdrant found:"
  ~/.local-memory/qdrant --version 2>/dev/null || echo "Qdrant binary exists but may need update"
else
  echo "Qdrant not installed"
fi

INSTALLATION OPTIONS:

OPTION 1 - NPM INSTALLATION (RECOMMENDED):
1. Install via npm: npm install -g local-memory-mcp
2. Verify installation: local-memory --version
3. Activate license: local-memory license activate ${displayKey} --accept-terms

OPTION 2 - UPDATE EXISTING INSTALLATION:
If local-memory is already installed but outdated:
1. Update via npm: npm update -g local-memory-mcp
2. Verify update: local-memory --version
3. Check license status: local-memory license status
4. Reactivate if needed: local-memory license activate ${displayKey} --accept-terms

STEP 2 - INSTALL/UPDATE OLLAMA:
if ! command -v ollama &> /dev/null; then
  echo "Installing Ollama..."
  # Download and install Ollama from https://ollama.ai/download/mac
else
  echo "Ollama already installed."
fi

# Install required models if not present
if ! ollama list | grep -q "nomic-embed-text"; then
  echo "Installing embedding model..."
  ollama pull nomic-embed-text
fi

if ! ollama list | grep -q "qwen2.5:3b"; then
  echo "Installing chat model..."
  ollama pull qwen2.5:3b
fi

STEP 3 - INSTALL QDRANT (RECOMMENDED FOR PERFORMANCE):
if [ ! -f "$HOME/.local-memory/qdrant" ]; then
  mkdir -p ~/.local-memory
  ARCH=$(uname -m)
  if [ "$ARCH" = "arm64" ]; then
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-apple-darwin.tar.gz"
  else
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz"
  fi
  curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
  cd ~/.local-memory && tar -xzf qdrant.tar.gz && chmod +x qdrant && rm qdrant.tar.gz
fi

STEP 4 - START SERVICES:
1. Start local-memory daemon: local-memory start
2. Start Qdrant (optional): cd ~/.local-memory && ./qdrant &
3. Verify Qdrant: curl http://localhost:6333/healthz

STEP 5 - CONFIGURE MCP INTEGRATION:
claude mcp add --transport stdio local-memory -- local-memory --mcp

STEP 6 - CLAUDE DESKTOP CONFIGURATION:
Edit ~/.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

STEP 7 - VERIFICATION:
1. Check local-memory status: local-memory license status
2. Test Claude Code MCP: claude mcp list
3. Verify Qdrant: curl http://localhost:6333/healthz
4. Test Ollama models: ollama list
5. Restart Claude Desktop and verify memory tools appear

TROUBLESHOOTING:
- License not activated: Use --accept-terms flag
- Qdrant architecture issues: Script auto-detects ARM64 vs Intel
- Permission errors: Use sudo for /usr/local/bin operations`;

  const windowsPrompt = `I have purchased a license key for local-memory. Please help me install and configure it completely on Windows:

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
# Check if local-memory is already installed
local-memory --version 2>nul && (
  echo Local Memory found in PATH
  local-memory --version
  local-memory license status
) || (
  echo Local Memory not installed - proceeding with fresh installation
)

INSTALLATION OPTIONS:

OPTION 1 - NPM INSTALLATION (RECOMMENDED):
1. Install via npm: npm install -g local-memory-mcp
2. Verify installation: local-memory --version
3. Activate license: local-memory license activate ${displayKey} --accept-terms

OPTION 2 - MANUAL BINARY:
1. Download from the success page
2. Create directory: mkdir "C:\\Program Files\\LocalMemory"
3. Move binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
4. Add to PATH: Add "C:\\Program Files\\LocalMemory" to system PATH
5. Activate license: local-memory.exe license activate ${displayKey} --accept-terms

STEP 2 - INSTALL OLLAMA:
1. Download Ollama from https://ollama.ai/download/windows
2. Install the downloaded .exe file
3. Pull required model: ollama pull nomic-embed-text
4. Pull chat model: ollama pull qwen2.5:3b

STEP 3 - INSTALL QDRANT (RECOMMENDED):
mkdir "%USERPROFILE%\\.local-memory"
curl -L "https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-pc-windows-msvc.zip" -o "%USERPROFILE%\\.local-memory\\qdrant.zip"
cd "%USERPROFILE%\\.local-memory" && tar -xzf qdrant.zip && del qdrant.zip

STEP 4 - START SERVICES:
1. Start local-memory: local-memory start
2. Start Qdrant: cd "%USERPROFILE%\\.local-memory" && qdrant.exe

STEP 5 - CONFIGURE MCP:
claude mcp add --transport stdio local-memory -- local-memory.exe --mcp

STEP 6 - CLAUDE DESKTOP CONFIGURATION:
Edit %USERPROFILE%\\.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

STEP 7 - VERIFICATION:
1. Test installation: local-memory --version
2. Check license: local-memory license status
3. Test MCP: claude mcp list
4. Verify Qdrant: curl http://localhost:6333/healthz

TROUBLESHOOTING:
- PATH issues: npm installation handles PATH automatically
- Permission errors: Run Command Prompt as Administrator
- Qdrant connection: Check Windows Firewall for port 6333`;

  const linuxPrompt = `I have purchased a license key for local-memory. Please help me install and configure it completely on Linux:

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
if command -v local-memory &> /dev/null; then
  echo "Local Memory found in PATH"
  local-memory --version
  local-memory license status
else
  echo "Local Memory not installed - proceeding with fresh installation"
fi

INSTALLATION OPTIONS:

OPTION 1 - NPM INSTALLATION (RECOMMENDED):
1. Install via npm: npm install -g local-memory-mcp
2. Verify installation: local-memory --version
3. Activate license: local-memory license activate ${displayKey} --accept-terms

OPTION 2 - MANUAL BINARY:
1. Download from the success page
2. Make executable: chmod +x ~/Downloads/local-memory*
3. Install: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Activate: local-memory license activate ${displayKey} --accept-terms

STEP 2 - INSTALL OLLAMA:
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull nomic-embed-text
ollama pull qwen2.5:3b

STEP 3 - INSTALL QDRANT (RECOMMENDED):
mkdir -p ~/.local-memory
ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-unknown-linux-gnu.tar.gz"
else
  QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-unknown-linux-gnu.tar.gz"
fi
curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
cd ~/.local-memory && tar -xzf qdrant.tar.gz && chmod +x qdrant && rm qdrant.tar.gz

STEP 4 - START SERVICES:
1. Start local-memory: local-memory start
2. Start Qdrant: cd ~/.local-memory && ./qdrant &

STEP 5 - CONFIGURE MCP:
claude mcp add --transport stdio local-memory -- local-memory --mcp

STEP 6 - CLAUDE DESKTOP CONFIGURATION:
Edit ~/.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

STEP 7 - VERIFICATION:
1. Test installation: local-memory --version
2. Check license: local-memory license status
3. Test MCP: claude mcp list
4. Verify Qdrant: curl http://localhost:6333/healthz

TROUBLESHOOTING:
- Permission errors: Use sudo for /usr/local/bin
- Service management: systemctl --user start/stop ollama
- Architecture: Script auto-detects ARM64 vs x86_64`;

  const restApiPrompt = `I have purchased a license key for local-memory and want to run it as a REST API server (for editors without MCP support):

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

INSTALLATION:
npm install -g local-memory-mcp
local-memory license activate ${displayKey} --accept-terms

START REST API:
local-memory start
# Auto-detects Ollama, Qdrant, selects available port 3002-3005

VERIFY:
curl http://localhost:3002/api/v1/health

REST API ENDPOINTS (27 total):

CORE MEMORY:
- POST /memories - Store new memory
- PUT /memories/{id} - Update memory
- GET /memories/{id} - Get memory by ID
- DELETE /memories/{id} - Delete memory

SEARCH:
- GET /memories/search - Search memories
- GET /memories/{id}/related - Find related

ANALYSIS:
- POST /ask - Ask questions about memories
- POST /analyze - Analyze patterns
- POST /summarize - Summarize memories

RELATIONSHIPS:
- POST /relationships - Create relationship
- POST /relationships/discover - Auto-discover

ORGANIZATION:
- POST /categories - Create category
- GET /categories - List categories
- POST /domains - Create domain

SYSTEM:
- GET /health - Health check
- GET /sessions - List sessions
- GET /stats - System stats

EXAMPLE:
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "My insight", "importance": 8, "tags": ["ai"]}'`;

  const prompts = [
    { id: "macos", label: "macOS", prompt: macosPrompt, color: "pink" },
    { id: "windows", label: "Windows", prompt: windowsPrompt, color: "blue" },
    { id: "linux", label: "Linux", prompt: linuxPrompt, color: "green" },
    { id: "api", label: "REST API (Universal)", prompt: restApiPrompt, color: "amber" },
  ];

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
