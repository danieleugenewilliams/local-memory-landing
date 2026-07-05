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
if command -v local-memory &> /dev/null; then
  echo "Local Memory found in PATH"
  local-memory --version
  local-memory license status
else
  echo "Local Memory not installed - proceeding with fresh installation"
fi

STEP 2 - INSTALL, ACTIVATE, START:
1. Install (recommended): npm install -g local-memory-mcp
   Already installed? Update instead: npm update -g local-memory-mcp
2. Verify: local-memory --version
3. Activate license: local-memory license activate ${key} --accept_terms
4. Start the daemon + REST API: local-memory start

STEP 3 - CONNECT TO YOUR AGENT (MCP):
Let Local Memory write the client config for you instead of editing JSON by hand:
  local-memory install mcp
This auto-detects and configures Claude Desktop — it writes the correct
~/Library/Application Support/Claude/claude_desktop_config.json for you.

Using Claude Code? Auto-detect doesn't cover it yet, so add it explicitly:
  local-memory install mcp claude-code
(That runs 'claude mcp add' for you under the hood.)

Supported targets today are Claude Desktop and Claude Code.

STEP 4 - VERIFY EVERYTHING:
1. local-memory doctor                        (checks install, license, services, MCP)
2. curl http://localhost:3002/api/v1/health   (expect {"data":{"status":"healthy"},...})
3. local-memory license status
Then restart Claude Desktop / Claude Code and confirm the memory tools appear.

STEP 5 - OPTIONAL LOCAL AI FEATURES (ASK ME FIRST):
Core capture and search already work on SQLite — nothing else is required.
Ollama (local embeddings/chat) and Qdrant (faster vector search) are OPTIONAL
and only enhance AI features like 'ask' and semantic 'search --use_ai'.

>>> Before installing anything below, ASK ME whether I want the optional local-AI
    stack. If I say no, stop here — the setup above is complete. If I say yes:

  # Ollama + models (Local Memory auto-detects Ollama on start)
  if ! command -v ollama &> /dev/null; then
    echo "Install Ollama from https://ollama.ai/download/mac, then continue"
  fi
  ollama pull nomic-embed-text
  ollama pull qwen2.5:3b

  # Qdrant — optional vector DB, OFF by default
  mkdir -p ~/.local-memory
  ARCH=$(uname -m)
  if [ "$ARCH" = "arm64" ]; then
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-apple-darwin.tar.gz"
  else
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz"
  fi
  curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
  cd ~/.local-memory && tar -xzf qdrant.tar.gz && chmod +x qdrant && rm qdrant.tar.gz && ./qdrant &
  # To use Qdrant, set qdrant.enabled: true in ~/.local-memory/config.yaml

  # Apply the optional services (restart so Local Memory picks them up):
  local-memory stop && local-memory start
  local-memory doctor --services

MANUAL FALLBACK (only if 'local-memory install mcp' is unavailable):
- Claude Code:    claude mcp add --transport stdio local-memory -- local-memory --mcp
- Claude Desktop: edit ~/Library/Application Support/Claude/claude_desktop_config.json
  {
    "mcpServers": {
      "local-memory": { "command": "/path/to/local-memory", "args": ["--mcp"], "transport": "stdio" }
    }
  }

TROUBLESHOOTING:
- License rejected: watch for em/en-dashes (— –) pasted instead of hyphens (-); re-activate with --accept_terms.
- MCP tools absent: re-run local-memory install mcp (or the claude-code variant), then restart the client.
- Service unreachable: local-memory ps; if down, local-memory start; then local-memory doctor.
- Stuck processes: local-memory kill_all && local-memory start.`;

  const windows = `I have purchased a license key for local-memory. Please help me install and configure it completely on Windows:

${step0}

STEP 1 - CHECK EXISTING INSTALLATION:
local-memory --version 2>nul && (
  echo Local Memory found in PATH
  local-memory license status
) || (
  echo Local Memory not installed - proceeding with fresh installation
)

STEP 2 - INSTALL, ACTIVATE, START:
1. Install (recommended): npm install -g local-memory-mcp
   Already installed? Update instead: npm update -g local-memory-mcp
   No Node? Manual binary: ${manualSource}, then put local-memory.exe on your PATH.
2. Verify: local-memory --version
3. Activate license: local-memory license activate ${key} --accept_terms
4. Start the daemon + REST API: local-memory start

STEP 3 - CONNECT TO YOUR AGENT (MCP):
Let Local Memory write the client config for you instead of editing JSON by hand:
  local-memory install mcp
This auto-detects and configures Claude Desktop — it writes the correct
%APPDATA%\\Claude\\claude_desktop_config.json for you.

Using Claude Code? Auto-detect doesn't cover it yet, so add it explicitly:
  local-memory install mcp claude-code
(That runs 'claude mcp add' for you under the hood.)

Supported targets today are Claude Desktop and Claude Code.

STEP 4 - VERIFY EVERYTHING:
1. local-memory doctor                        (checks install, license, services, MCP)
2. curl http://localhost:3002/api/v1/health   (expect {"data":{"status":"healthy"},...})
3. local-memory license status
Then restart Claude Desktop / Claude Code and confirm the memory tools appear.

STEP 5 - OPTIONAL LOCAL AI FEATURES (ASK ME FIRST):
Core capture and search already work on SQLite — nothing else is required.
Ollama (local embeddings/chat) and Qdrant (faster vector search) are OPTIONAL
and only enhance AI features like 'ask' and semantic 'search --use_ai'.

>>> Before installing anything below, ASK ME whether I want the optional local-AI
    stack. If I say no, stop here — the setup above is complete. If I say yes:

  # Ollama + models (Local Memory auto-detects Ollama on start)
  1. Download Ollama from https://ollama.ai/download/windows and run the installer
  2. ollama pull nomic-embed-text
  3. ollama pull qwen2.5:3b

  # Qdrant — optional vector DB, OFF by default
  mkdir "%USERPROFILE%\\.local-memory"
  curl -L "https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-pc-windows-msvc.zip" -o "%USERPROFILE%\\.local-memory\\qdrant.zip"
  cd "%USERPROFILE%\\.local-memory" && tar -xf qdrant.zip && del qdrant.zip
  REM To use Qdrant, set qdrant.enabled: true in %USERPROFILE%\\.local-memory\\config.yaml

  # Apply the optional services (restart so Local Memory picks them up):
  local-memory stop && local-memory start
  local-memory doctor --services

MANUAL FALLBACK (only if 'local-memory install mcp' is unavailable):
- Claude Code:    claude mcp add --transport stdio local-memory -- local-memory --mcp
- Claude Desktop: edit %APPDATA%\\Claude\\claude_desktop_config.json
  {
    "mcpServers": {
      "local-memory": { "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe", "args": ["--mcp"], "transport": "stdio" }
    }
  }

TROUBLESHOOTING:
- License rejected: watch for em/en-dashes (— –) pasted instead of hyphens (-); re-activate with --accept_terms.
- MCP tools absent: re-run local-memory install mcp (or the claude-code variant), then restart the client.
- Service unreachable: local-memory ps; if down, local-memory start; then local-memory doctor.
- PATH issues: the npm install configures PATH automatically; reopen your terminal.`;

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

STEP 2 - INSTALL, ACTIVATE, START:
1. Install (recommended): npm install -g local-memory-mcp
   Already installed? Update instead: npm update -g local-memory-mcp
   No Node? Manual binary: ${manualSource}, then chmod +x it and
   sudo mv it to /usr/local/bin/local-memory.
2. Verify: local-memory --version
3. Activate license: local-memory license activate ${key} --accept_terms
4. Start the daemon + REST API: local-memory start

STEP 3 - CONNECT TO YOUR AGENT (MCP):
Let Local Memory write the client config for you instead of editing JSON by hand.
On Linux the common client is Claude Code — add it explicitly:
  local-memory install mcp claude-code
(That runs 'claude mcp add' for you under the hood.)

If you also run Claude Desktop, 'local-memory install mcp' auto-detects and
configures it at ~/.config/Claude/claude_desktop_config.json. Supported targets
today are Claude Desktop and Claude Code.

STEP 4 - VERIFY EVERYTHING:
1. local-memory doctor                        (checks install, license, services, MCP)
2. curl http://localhost:3002/api/v1/health   (expect {"data":{"status":"healthy"},...})
3. local-memory license status
Then restart Claude Code / Claude Desktop and confirm the memory tools appear.

STEP 5 - OPTIONAL LOCAL AI FEATURES (ASK ME FIRST):
Core capture and search already work on SQLite — nothing else is required.
Ollama (local embeddings/chat) and Qdrant (faster vector search) are OPTIONAL
and only enhance AI features like 'ask' and semantic 'search --use_ai'.

>>> Before installing anything below, ASK ME whether I want the optional local-AI
    stack. If I say no, stop here — the setup above is complete. If I say yes:

  # Ollama + models (Local Memory auto-detects Ollama on start)
  curl -fsSL https://ollama.ai/install.sh | sh
  ollama pull nomic-embed-text
  ollama pull qwen2.5:3b

  # Qdrant — optional vector DB, OFF by default
  mkdir -p ~/.local-memory
  ARCH=$(uname -m)
  if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-unknown-linux-gnu.tar.gz"
  else
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-unknown-linux-gnu.tar.gz"
  fi
  curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
  cd ~/.local-memory && tar -xzf qdrant.tar.gz && chmod +x qdrant && rm qdrant.tar.gz && ./qdrant &
  # To use Qdrant, set qdrant.enabled: true in ~/.local-memory/config.yaml

  # Apply the optional services (restart so Local Memory picks them up):
  local-memory stop && local-memory start
  local-memory doctor --services

MANUAL FALLBACK (only if 'local-memory install mcp' is unavailable):
- Claude Code:    claude mcp add --transport stdio local-memory -- local-memory --mcp
- Claude Desktop: edit ~/.config/Claude/claude_desktop_config.json
  {
    "mcpServers": {
      "local-memory": { "command": "/usr/local/bin/local-memory", "args": ["--mcp"], "transport": "stdio" }
    }
  }

TROUBLESHOOTING:
- License rejected: watch for em/en-dashes (— –) pasted instead of hyphens (-); re-activate with --accept_terms.
- MCP tools absent: re-run local-memory install mcp (or the claude-code variant), then restart the client.
- Service unreachable: local-memory ps; if down, local-memory start; then local-memory doctor.
- Permission errors: use sudo for /usr/local/bin operations.`;

  const api = `I have purchased a license key for local-memory and want to run it as a REST API server (for editors without MCP support):

${step0}

INSTALLATION:
npm install -g local-memory-mcp
local-memory license activate ${key} --accept_terms

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
