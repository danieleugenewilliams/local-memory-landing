/**
 * Agent install-prompt text — single source of truth.
 *
 * Two public builders share one internal template (buildPrompts):
 *  - getSetupPrompt(os, key): post-purchase success page, where the real license
 *    key is already known and embedded; manual downloaders are sent to the
 *    success page.
 *  - getInstallPrompt(os): the /agent-setup page, shown before any purchase
 *    context exists; carries a `<YOUR-LICENSE-KEY>` placeholder + a STEP 0 that
 *    tells the agent to stop and ask for the key, and sends manual downloaders
 *    to the purchase email.
 *
 * The install steps are otherwise identical, so they live in exactly one place.
 */

export type SetupOS = "macos" | "windows" | "linux" | "api";

export const SETUP_OS_TABS: { id: SetupOS; label: string }[] = [
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
  { id: "api", label: "REST API" },
];

interface PromptOptions {
  /** License key (or placeholder) interpolated into activation commands. */
  key: string;
  /** The STEP 0 block — the only real difference between the two contexts. */
  step0: string;
  /** OPTION 2 manual-binary download source (macOS/API don't use it). */
  manualSource: string;
}

/** Build all four OS prompts from the shared install procedure. */
function buildPrompts({ key, step0, manualSource }: PromptOptions): Record<SetupOS, string> {
  const macos = `I have purchased a license key for local-memory. Please help me install and configure it completely on macOS:

${step0}

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
3. Activate license: local-memory license activate ${key} --accept-terms

OPTION 2 - UPDATE EXISTING INSTALLATION:
If local-memory is already installed but outdated:
1. Update via npm: npm update -g local-memory-mcp
2. Verify update: local-memory --version
3. Check license status: local-memory license status
4. Reactivate if needed: local-memory license activate ${key} --accept-terms

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

  const windows = `I have purchased a license key for local-memory. Please help me install and configure it completely on Windows:

${step0}

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
3. Activate license: local-memory license activate ${key} --accept-terms

OPTION 2 - MANUAL BINARY:
1. ${manualSource}
2. Create directory: mkdir "C:\\Program Files\\LocalMemory"
3. Move binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
4. Add to PATH: Add "C:\\Program Files\\LocalMemory" to system PATH
5. Activate license: local-memory.exe license activate ${key} --accept-terms

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

  const linux = `I have purchased a license key for local-memory. Please help me install and configure it completely on Linux:

${step0}

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
3. Activate license: local-memory license activate ${key} --accept-terms

OPTION 2 - MANUAL BINARY:
1. ${manualSource}
2. Make executable: chmod +x ~/Downloads/local-memory*
3. Install: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Activate: local-memory license activate ${key} --accept-terms

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

  const api = `I have purchased a license key for local-memory and want to run it as a REST API server (for editors without MCP support):

${step0}

INSTALLATION:
npm install -g local-memory-mcp
local-memory license activate ${key} --accept-terms

START REST API:
local-memory start
# Auto-detects Ollama, Qdrant, selects available port 3002-3005

VERIFY:
curl http://localhost:3002/api/v1/health

REST API ENDPOINTS (51 total):

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

  return { macos, windows, linux, api };
}

/**
 * Install prompt with the real license key embedded — used on the post-purchase
 * success page. Manual downloaders are pointed at the success page.
 */
export function getSetupPrompt(os: SetupOS, key: string): string {
  const displayKey = key || "LM-XXXX-XXXX-XXXX-XXXX-XXXX";
  const step0 = `STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.`;
  return buildPrompts({
    key: displayKey,
    step0,
    manualSource: "Download from the success page",
  })[os];
}

/**
 * Install prompt that leads with the license key in STEP 0.
 *
 * When a real `key` is passed (the post-purchase success page), it's embedded
 * directly so the agent has it up front, and manual downloaders are pointed at
 * the success page. With no key (the /agent-setup page, shown before any
 * purchase context exists), it falls back to a `<YOUR-LICENSE-KEY>` placeholder
 * plus a STEP 0 that tells the agent to stop and ask for the key, and points
 * manual downloaders at the purchase email.
 */
export function getInstallPrompt(os: SetupOS, key?: string): string {
  const realKey = key?.trim();

  if (realKey) {
    const step0 = `STEP 0 - LICENSE KEY:
MY LICENSE KEY: ${realKey}

This key was emailed to you (from noreply@updates.localmemory.co) and is shown
on your confirmation page. It never expires — keep it somewhere safe.`;
    return buildPrompts({
      key: realKey,
      step0,
      manualSource: "Download from the success page",
    })[os];
  }

  const placeholder = "<YOUR-LICENSE-KEY>";
  const step0 = `STEP 0 - LICENSE KEY:
MY LICENSE KEY: ${placeholder}

IMPORTANT: If the key above still reads ${placeholder}, STOP and ask me for my
license key before proceeding. It was emailed to me after purchase from
noreply@updates.localmemory.co (subject: "Your Local Memory license key").
If I don't have a key, direct me to https://localmemory.co/purchase and
do not continue with installation.`;
  return buildPrompts({
    key: placeholder,
    step0,
    manualSource: "Download from the link in my purchase email",
  })[os];
}
