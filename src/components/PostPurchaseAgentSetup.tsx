import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, Bot, Terminal, ChevronDown } from "lucide-react";
import { useState } from "react";

interface PostPurchaseAgentSetupProps {
  productKey?: string;
}

const PostPurchaseAgentSetup = ({ productKey }: PostPurchaseAgentSetupProps) => {
  // Use placeholder license key when none provided (e.g., on Docs page)
  const displayKey = productKey || 'LM-XXXX-XXXX-XXXX-XXXX-XXXX';
  const isPlaceholder = !productKey;
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [openPrompts, setOpenPrompts] = useState<{[key: string]: boolean}>({});

  const togglePrompt = (promptId: string) => {
    setOpenPrompts(prev => ({
      ...prev,
      [promptId]: !prev[promptId]
    }));
  };

  const copyToClipboard = (text: string, promptId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const macosPrompt = `I just purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

QUICK START (RECOMMENDED - ZERO CONFIG):
1. Install binary: chmod +x ~/Downloads/local-memory* && xattr -rd com.apple.quarantine ~/Downloads/local-memory-macos-* && mv ~/Downloads/local-memory* /usr/local/bin/local-memory
2. Activate license: local-memory license activate ${displayKey}
3. Install Ollama from https://ollama.ai/download/mac, then: ollama pull nomic-embed-text
4. Start everything: local-memory start (auto-detects and configures everything)
5. Add to Claude Code: claude mcp add local-memory -- /usr/local/bin/local-memory
6. For Claude Desktop, add to ~/.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}
7. Restart Claude Desktop and verify memory tools appear

DETAILED SETUP (if you prefer manual control):

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (exact filename will be "local-memory-macos" or similar)
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Move it to /usr/local/bin/local-memory: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Activate license: /usr/local/bin/local-memory license activate ${displayKey}
5. Verify it works: /usr/local/bin/local-memory --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Download and install Ollama from https://ollama.ai/download/mac
2. After installation, pull the required model: ollama pull nomic-embed-text
3. Pull chat model: ollama pull qwen2.5:7b
4. Verify Ollama is running: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
1. Create local-memory directory: mkdir -p ~/.local-memory
2. Download Qdrant: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
3. Extract: tar -xzf qdrant.tar.gz
4. Make executable and move: chmod +x qdrant && mv qdrant ~/.local-memory/
5. Start Qdrant: cd ~/.local-memory && ./qdrant &
6. Verify: curl http://localhost:6333/healthz (should return OK)
7. Qdrant storage will be created in ~/.local-memory/qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command to add local-memory as an MCP server:
claude mcp add local-memory -- /usr/local/bin/local-memory

STEP 4 - CONFIGURE MCP FOR AI EDITORS:

CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

GITHUB COPILOT (VS CODE):
Create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

CURSOR EDITOR:
Add to Cursor Settings > MCP Servers (or create .cursor/mcp.json):
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

WINDSURF EDITOR:
Add to Windsurf Settings > MCP Configuration:
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir -p ~/.local-memory
2. Test Claude Code MCP: claude mcp list (should show local-memory server)
3. For Claude Desktop: restart the app and check for memory tools
4. For VS Code: Restart VS Code, open Command Palette, check "MCP: List Servers"
5. For Cursor/Windsurf: Restart editor and verify MCP server appears in settings
6. Test basic functionality by storing a test memory
7. If using Qdrant: Check performance with search queries

Use my existing downloaded binary - don't try to download a new one. Follow these exact commands and file paths.`;

  const windowsPrompt = `I downloaded local-memory to C:\\Downloads after purchasing. Please help me install and configure it completely:

QUICK START (RECOMMENDED - ZERO CONFIG):
1. Install binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe" (create directory first)
2. Add "C:\\Program Files\\LocalMemory" to system PATH
3. Activate license: local-memory.exe license activate ${displayKey}
4. Install Ollama from https://ollama.ai/download/windows, then: ollama pull nomic-embed-text
5. Start everything: local-memory.exe start (auto-detects and configures everything)
6. Add to Claude Code: claude mcp add local-memory -- "C:\\Program Files\\LocalMemory\\local-memory.exe"
7. For Claude Desktop, add to %USERPROFILE%\\.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": [
        "--mcp"
      ]
    }
  }
}
7. Restart Claude Desktop and verify memory tools appear

DETAILED SETUP (if you prefer manual control):

STEP 1 - INSTALL BINARY:
1. Find local-memory.exe in C:\\Downloads
2. Create directory: mkdir "C:\\Program Files\\LocalMemory"
3. Move binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
4. Add to PATH: Add "C:\\Program Files\\LocalMemory" to system PATH environment variable
5. Activate license: local-memory.exe license activate ${displayKey}
6. Verify: open new cmd/PowerShell and run: local-memory.exe --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Download Ollama from https://ollama.ai/download/windows
2. Install the downloaded .exe file
3. Open new terminal and pull required model: ollama pull nomic-embed-text
4. Pull chat model: ollama pull qwen2.5:7b
5. Verify: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
1. Create local-memory directory: mkdir "%USERPROFILE%\\.local-memory"
2. Download Qdrant for Windows from: https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-pc-windows-msvc.zip
3. Extract to %USERPROFILE%\\.local-memory\\
4. Start Qdrant: cd "%USERPROFILE%\\.local-memory" && qdrant.exe
5. Verify: curl http://localhost:6333/healthz (should return OK)
6. Qdrant storage will be created in %USERPROFILE%\\.local-memory\\qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE (if using):
Run this exact command in terminal:
claude mcp add local-memory -- "C:\\Program Files\\LocalMemory\\local-memory.exe"

STEP 4 - CONFIGURE MCP FOR AI EDITORS:

CLAUDE DESKTOP:
Edit %USERPROFILE%\\.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": [
        "--mcp"
      ]
    }
  }
}

GITHUB COPILOT (VS CODE):
Create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": [
        "--mcp"
      ]
    }
  }
}

CURSOR EDITOR:
Add to Cursor Settings > MCP Servers (or create .cursor/mcp.json):
{
  "servers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": [
        "--mcp"
      ]
    }
  }
}

WINDSURF EDITOR:
Add to Windsurf Settings > MCP Configuration:
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": [
        "--mcp"
      ]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir "%USERPROFILE%\\.local-memory"
2. Test Claude Code MCP: claude mcp list
3. For Claude Desktop: restart app and check for memory tools
4. For VS Code: Restart VS Code, open Command Palette, check "MCP: List Servers"
5. For Cursor/Windsurf: Restart editor and verify MCP server appears in settings
6. Test by storing a memory to verify everything works
7. If using Qdrant: Test search performance improvements

Use my existing downloaded binary from C:\\Downloads - don't download a new one. Follow these exact paths and commands.`;

  const linuxPrompt = `I purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

QUICK START (RECOMMENDED - ZERO CONFIG):
1. Install binary: chmod +x ~/Downloads/local-memory* && mv ~/Downloads/local-memory* /usr/local/bin/local-memory
2. Activate license: local-memory license activate ${displayKey}
3. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh, then: ollama pull nomic-embed-text
4. Start everything: local-memory start (auto-detects and configures everything)
5. Add to Claude Code: claude mcp add local-memory -- /usr/local/bin/local-memory
6. For Claude Desktop, add to ~/.claude_desktop_config.json:
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}
6. Restart Claude Desktop and verify memory tools appear

DETAILED SETUP (if you prefer manual control):

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (likely named "local-memory-linux")
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Install to system: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Activate license: /usr/local/bin/local-memory license activate ${displayKey}
5. Verify installation: /usr/local/bin/local-memory --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh
2. Start Ollama service (if not auto-started): systemctl --user start ollama
3. Pull required model: ollama pull nomic-embed-text
4. Pull chat model: ollama pull qwen2.5:7b
5. Verify: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
1. Create local-memory directory: mkdir -p ~/.local-memory
2. Download Qdrant: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-unknown-linux-gnu.tar.gz -o qdrant.tar.gz
3. Extract: tar -xzf qdrant.tar.gz
4. Make executable and move: chmod +x qdrant && mv qdrant ~/.local-memory/
5. Start Qdrant: cd ~/.local-memory && ./qdrant &
6. Verify: curl http://localhost:6333/healthz (should return OK)
7. Qdrant storage will be created in ~/.local-memory/qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command:
claude mcp add local-memory -- /usr/local/bin/local-memory

STEP 4 - CONFIGURE MCP FOR AI EDITORS:

CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

GITHUB COPILOT (VS CODE):
Create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

CURSOR EDITOR:
Add to Cursor Settings > MCP Servers (or create .cursor/mcp.json):
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

WINDSURF EDITOR:
Add to Windsurf Settings > MCP Configuration:
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir -p ~/.local-memory
2. Set permissions: chmod 755 ~/.local-memory
3. Test Claude Code MCP: claude mcp list (should show local-memory)
4. For Claude Desktop: restart app and verify memory tools appear
5. For VS Code: Restart VS Code, open Command Palette, check "MCP: List Servers"
6. For Cursor/Windsurf: Restart editor and verify MCP server appears in settings
7. Test functionality by storing and retrieving a memory
8. If using Qdrant: Verify search performance improvements

Use my existing downloaded binary from ~/Downloads - don't try to download a new one. Follow these exact commands and file paths.`;

  const restApiPrompt = `I have local-memory downloaded and want to run it as a REST API server instead of MCP integration (useful for editors without MCP support or custom integrations):

QUICK START (RECOMMENDED - ZERO CONFIG):
1. Install binary (choose your platform):
   - macOS/Linux: chmod +x ~/Downloads/local-memory* && sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
   - Windows: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe" and add to PATH
2. Activate license: local-memory license activate ${displayKey}
3. Install Ollama (download from https://ollama.ai), then: ollama pull nomic-embed-text
4. Start everything: local-memory start (auto-detects everything, starts REST API on port 3002)
5. Verify: curl http://localhost:3002/api/v1/health (should return {"status":"ok"})

DETAILED SETUP (if you prefer manual control):

STEP 1 - INSTALL BINARY (choose your platform):
macOS/Linux: 
- chmod +x ~/Downloads/local-memory*
- sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory

Windows:
- move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
- Add to PATH

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
- macOS: Download from https://ollama.ai/download/mac
- Windows: Download from https://ollama.ai/download/windows  
- Linux: curl -fsSL https://ollama.ai/install.sh | sh
- Then run: ollama pull nomic-embed-text

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
- Create directory: mkdir -p ~/.local-memory (Linux/macOS) or mkdir "%USERPROFILE%\\.local-memory" (Windows)
- macOS: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz && tar -xzf qdrant.tar.gz && chmod +x qdrant && mv qdrant ~/.local-memory/
- Linux: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-unknown-linux-gnu.tar.gz -o qdrant.tar.gz && tar -xzf qdrant.tar.gz && chmod +x qdrant && mv qdrant ~/.local-memory/
- Windows: Download from https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-pc-windows-msvc.zip, extract to %USERPROFILE%\\.local-memory\\
- Start Qdrant: cd ~/.local-memory && ./qdrant & (or cd "%USERPROFILE%\\.local-memory" && qdrant.exe for Windows)
- Verify: curl http://localhost:6333/healthz
- Storage will be created in ~/.local-memory/qdrant-storage

STEP 3 - START REST API SERVER:
Zero-config startup: local-memory start
(Auto-detects Ollama, Qdrant, selects available port 3002-3005)

STEP 4 - VERIFY API:
Test the health endpoint: curl http://localhost:3002/api/v1/health
Should return: {"status":"ok"}

STEP 5 - API ENDPOINTS:
Base URL: http://localhost:3002/api/v1/
Key endpoints:
- POST /memories - Store new memory
- GET /memories/search?q=query - Search memories
- GET /memories - List all memories
- GET /health - Health check

PERFORMANCE COMPARISON:
- SQLite mode: ~100ms search response time
- Qdrant mode: ~10ms search response time (10x faster)

Use my downloaded binary - don't download a new one. This gives you 26 REST endpoints for any AI platform with recommended high-performance Qdrant backend.`;

  return (
    <div className="mt-8">
      <Card className="border-0 border-memory-blue/0 bg-card">
        
        <CardContent className="space-y-6">

          <div className="bg-memory-blue/10 border border-memory-blue/20 p-4 rounded-lg">
            <h4 className="font-semibold text-memory-blue mb-2">How It Works:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the prompt applicable to your operating system.</li>
              <li>Paste it into your AI agent (Claude, OpenCode, etc.).</li>
              {isPlaceholder && (
                <li className="text-amber-600 bg-muted-50/50 p-2 rounded border border-amber-200">
                  <strong>⚠️ Important:</strong> Replace the placeholder license key <code className="bg-muted-100 px-1 rounded text-amber-800">LM-XXXX-XXXX-XXXX-XXXX-XXXX</code> with your actual license key after purchase.
                </li>
              )}
              <li>Your agent will handle the complete installation and configuration.</li>
              <li>The agent creates proper directories, sets permissions, and installs Ollama and Qdrant (if needed).</li>
              <li>MCP integration is configured with exact paths and commands.</li>
              <li>The installation is tested, verified, and confirmed to be working properly.</li>
            </ol>
          </div>

          {/* macOS Prompt */}
          <Collapsible open={openPrompts['macos']} onOpenChange={() => togglePrompt('macos')}>
            <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">macOS Installation Prompt</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(macosPrompt, 'macos')}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'macos' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['macos'] ? 'rotate-180' : ''}`} />
                      {openPrompts['macos'] ? 'Hide' : 'Show'} Full Prompt
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              {!openPrompts['macos'] && (
                <div className="bg-muted p-3 rounded-md border border-border mb-3">
                  <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                    {macosPrompt.substring(0, 300)}...
                  </pre>
                </div>
              )}
              
              <CollapsibleContent>
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                    {macosPrompt}
                  </pre>
                </div>
              </CollapsibleContent>
              
              <p className="text-xs text-muted-foreground mt-2">
                <em>Includes MCP setup for Claude Code & Desktop with exact paths and commands</em>
              </p>
            </div>
          </Collapsible>

          {/* Windows Prompt */}
          <Collapsible open={openPrompts['windows']} onOpenChange={() => togglePrompt('windows')}>
            <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Windows Installation Prompt</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(windowsPrompt, 'windows')}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'windows' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['windows'] ? 'rotate-180' : ''}`} />
                      {openPrompts['windows'] ? 'Hide' : 'Show'} Full Prompt
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              {!openPrompts['windows'] && (
                <div className="bg-muted p-3 rounded-md border border-border mb-3">
                  <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                    {windowsPrompt.substring(0, 300)}...
                  </pre>
                </div>
              )}
              
              <CollapsibleContent>
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                    {windowsPrompt}
                  </pre>
                </div>
              </CollapsibleContent>
              
              <p className="text-xs text-muted-foreground mt-2">
                <em>Complete Windows setup with PATH configuration and MCP integration</em>
              </p>
            </div>
          </Collapsible>

          {/* Linux Prompt */}
          <Collapsible open={openPrompts['linux']} onOpenChange={() => togglePrompt('linux')}>
            <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Linux Installation Prompt</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(linuxPrompt, 'linux')}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'linux' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['linux'] ? 'rotate-180' : ''}`} />
                      {openPrompts['linux'] ? 'Hide' : 'Show'} Full Prompt
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              {!openPrompts['linux'] && (
                <div className="bg-muted p-3 rounded-md border border-border mb-3">
                  <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                    {linuxPrompt.substring(0, 300)}...
                  </pre>
                </div>
              )}
              
              <CollapsibleContent>
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                    {linuxPrompt}
                  </pre>
                </div>
              </CollapsibleContent>
              
              <p className="text-xs text-muted-foreground mt-2">
                <em>Linux installation with systemd service setup and permissions</em>
              </p>
            </div>
          </Collapsible>

          {/* REST API Prompt */}
          <Collapsible open={openPrompts['api']} onOpenChange={() => togglePrompt('api')}>
            <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">REST API Setup (Universal)</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(restApiPrompt, 'api')}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'api' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['api'] ? 'rotate-180' : ''}`} />
                      {openPrompts['api'] ? 'Hide' : 'Show'} Full Prompt
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              {!openPrompts['api'] && (
                <div className="bg-muted p-3 rounded-md border border-border mb-3">
                  <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                    {restApiPrompt.substring(0, 300)}...
                  </pre>
                </div>
              )}
              
              <CollapsibleContent>
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                    {restApiPrompt}
                  </pre>
                </div>
              </CollapsibleContent>
              
              <p className="text-xs text-muted-foreground mt-2">
                <em>For OpenCode, ChatGPT, custom agents - works with any platform via HTTP</em>
              </p>
            </div>
          </Collapsible>

        </CardContent>
      </Card>
    </div>
  );
};

export default PostPurchaseAgentSetup;