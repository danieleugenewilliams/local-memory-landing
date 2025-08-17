import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Bot, Terminal } from "lucide-react";
import { useState } from "react";

const PostPurchaseAgentSetup = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, promptId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const macosPrompt = `I just purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (exact filename will be "local-memory-macos" or similar)
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Move it to /usr/local/bin/local-memory: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Verify it works: /usr/local/bin/local-memory --version

STEP 2 - INSTALL OLLAMA:
1. Download and install Ollama from https://ollama.ai/download/mac
2. After installation, pull the required model: ollama pull nomic-embed-text
3. Optionally pull chat model: ollama pull qwen2.5:7b
4. Verify Ollama is running: ollama list

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command to add local-memory as an MCP server:
claude mcp add local-memory -- /usr/local/bin/local-memory --db-path ~/.local-memory/claude-memories.db --session-id "claude-code-session" --log-level info

STEP 4 - CONFIGURE MCP FOR CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": ["--db-path", "~/.local-memory/claude-desktop-memories.db", "--session-id", "claude-desktop-session", "--log-level", "info"]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir -p ~/.local-memory
2. Test Claude Code MCP: claude mcp list (should show local-memory server)
3. For Claude Desktop: restart the app and check for memory tools
4. Test basic functionality by storing a test memory

Use my existing downloaded binary - don't try to download a new one. Follow these exact commands and file paths.`;

  const windowsPrompt = `I downloaded local-memory to C:\\Downloads after purchasing. Please help me install and configure it completely:

STEP 1 - INSTALL BINARY:
1. Find local-memory.exe in C:\\Downloads
2. Create directory: mkdir "C:\\Program Files\\LocalMemory"
3. Move binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
4. Add to PATH: Add "C:\\Program Files\\LocalMemory" to system PATH environment variable
5. Verify: open new cmd/PowerShell and run: local-memory.exe --version

STEP 2 - INSTALL OLLAMA:
1. Download Ollama from https://ollama.ai/download/windows
2. Install the downloaded .exe file
3. Open new terminal and pull required model: ollama pull nomic-embed-text
4. Optionally pull chat model: ollama pull qwen2.5:7b
5. Verify: ollama list

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE (if using):
Run this exact command in terminal:
claude mcp add local-memory -- "C:\\Program Files\\LocalMemory\\local-memory.exe" --db-path "%USERPROFILE%\\.local-memory\\claude-memories.db" --session-id "claude-code-session" --log-level info

STEP 4 - CONFIGURE MCP FOR CLAUDE DESKTOP:
Edit %USERPROFILE%\\.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": ["--db-path", "%USERPROFILE%\\\\.local-memory\\\\claude-desktop-memories.db", "--session-id", "claude-desktop-session", "--log-level", "info"]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir "%USERPROFILE%\\.local-memory"
2. Test Claude Code MCP: claude mcp list
3. For Claude Desktop: restart app and check for memory tools
4. Test by storing a memory to verify everything works

Use my existing downloaded binary from C:\\Downloads - don't download a new one. Follow these exact paths and commands.`;

  const linuxPrompt = `I purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (likely named "local-memory-linux")
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Install to system: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Verify installation: /usr/local/bin/local-memory --version

STEP 2 - INSTALL OLLAMA:
1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh
2. Start Ollama service (if not auto-started): systemctl --user start ollama
3. Pull required model: ollama pull nomic-embed-text
4. Optionally pull chat model: ollama pull qwen2.5:7b
5. Verify: ollama list

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command:
claude mcp add local-memory -- /usr/local/bin/local-memory --db-path ~/.local-memory/claude-memories.db --session-id "claude-code-session" --log-level info

STEP 4 - CONFIGURE MCP FOR CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": ["--db-path", "~/.local-memory/claude-desktop-memories.db", "--session-id", "claude-desktop-session", "--log-level", "info"]
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir -p ~/.local-memory
2. Set permissions: chmod 755 ~/.local-memory
3. Test Claude Code MCP: claude mcp list (should show local-memory)
4. For Claude Desktop: restart app and verify memory tools appear
5. Test functionality by storing and retrieving a memory

Use my existing downloaded binary from ~/Downloads - don't try to download a new one. Follow these exact commands and file paths.`;

  const restApiPrompt = `I have local-memory downloaded and want to run it as a REST API server instead of MCP integration:

STEP 1 - INSTALL BINARY (choose your platform):
macOS/Linux: 
- chmod +x ~/Downloads/local-memory*
- sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory

Windows:
- move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
- Add to PATH

STEP 2 - INSTALL OLLAMA:
- macOS: Download from https://ollama.ai/download/mac
- Windows: Download from https://ollama.ai/download/windows  
- Linux: curl -fsSL https://ollama.ai/install.sh | sh
- Then run: ollama pull nomic-embed-text

STEP 3 - START REST API SERVER:
Run this exact command to start the server:
local-memory --rest-api-only --rest-port 3001 --db-path ~/.local-memory/api-memories.db --session-id "rest-api-session" --log-level info

STEP 4 - VERIFY API:
Test the health endpoint: curl http://localhost:3001/api/v1/health
Should return: {"status":"ok"}

STEP 5 - API ENDPOINTS:
Base URL: http://localhost:3001/api/v1/
Key endpoints:
- POST /memories - Store new memory
- GET /memories/search?q=query - Search memories
- GET /memories - List all memories
- GET /health - Health check

Use my downloaded binary - don't download a new one. This gives you 26+ REST endpoints for any AI platform.`;

  return (
    <div className="mt-8">
      <Card className="border-2 border-memory-blue/30 bg-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-memory-blue" />
            <CardTitle className="text-xl">Agent Setup Prompts</CardTitle>
          </div>
          <CardDescription>
            After downloading, copy the prompt for your platform and give it to your AI agent
          </CardDescription>
          <Badge variant="secondary" className="w-fit mx-auto bg-memory-blue/10 text-memory-blue border-memory-blue/20">
            ✨ Just copy, paste, and let your agent handle everything
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* macOS Prompt */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍎</span>
                <h4 className="font-semibold">macOS Installation Prompt</h4>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(macosPrompt, 'macos')}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedPrompt === 'macos' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto border border-border">
              <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                {macosPrompt.substring(0, 200)}...
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Includes MCP setup for Claude Code & Desktop with exact paths and commands
            </p>
          </div>

          {/* Windows Prompt */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪟</span>
                <h4 className="font-semibold">Windows Installation Prompt</h4>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(windowsPrompt, 'windows')}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedPrompt === 'windows' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto border border-border">
              <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                {windowsPrompt.substring(0, 200)}...
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Complete Windows setup with PATH configuration and MCP integration
            </p>
          </div>

          {/* Linux Prompt */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐧</span>
                <h4 className="font-semibold">Linux Installation Prompt</h4>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(linuxPrompt, 'linux')}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedPrompt === 'linux' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto border border-border">
              <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                {linuxPrompt.substring(0, 200)}...
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Linux installation with systemd service setup and permissions
            </p>
          </div>

          {/* REST API Prompt */}
          <div className="border border-memory-green/30 rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-memory-green" />
                <h4 className="font-semibold">REST API Setup (Universal)</h4>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(restApiPrompt, 'api')}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedPrompt === 'api' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto border border-border">
              <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                {restApiPrompt.substring(0, 200)}...
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              For OpenCode, ChatGPT, custom agents - works with any platform via HTTP
            </p>
          </div>

          <div className="bg-memory-blue/10 border border-memory-blue/20 p-4 rounded-lg">
            <h4 className="font-semibold text-memory-blue mb-2">How It Works:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the prompt for your operating system</li>
              <li>Paste it into your AI agent (Claude, ChatGPT, etc.)</li>
              <li>Your agent will handle the complete installation and configuration</li>
              <li>Agent creates proper directories, sets permissions, installs Ollama</li>
              <li>Configures MCP integration with exact paths and commands</li>
              <li>Verifies everything works and tests the installation</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPurchaseAgentSetup;