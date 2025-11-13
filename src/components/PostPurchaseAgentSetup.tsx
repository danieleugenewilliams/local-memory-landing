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
   OR use explicit update: cd ~/.npm-global/lib/node_modules/local-memory-mcp && npm run update
2. Verify update: local-memory --version
3. Check license status: local-memory license status
4. Reactivate if needed: local-memory license activate ${displayKey} --accept-terms

OPTION 3 - MANUAL BINARY INSTALLATION (ADVANCED):
1. Download latest from this page or: curl -L https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download/local-memory-macos-arm -o /tmp/local-memory-macos-arm
2. Make executable: chmod +x /tmp/local-memory-macos-arm
3. Remove quarantine: xattr -rd com.apple.quarantine /tmp/local-memory-macos-arm
4. Install: sudo mv /tmp/local-memory-macos-arm /usr/local/bin/local-memory
5. Activate license: /usr/local/bin/local-memory license activate ${displayKey} --accept-terms

STEP 2 - INSTALL/UPDATE OLLAMA:
if ! command -v ollama &> /dev/null; then
  echo "Installing Ollama..."
  # Download and install Ollama from https://ollama.ai/download/mac
else
  echo "Ollama already installed. Checking for updates..."
  # Check https://ollama.ai for latest version
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

STEP 3 - INSTALL/UPDATE QDRANT (RECOMMENDED):
# Check if local-memory directory exists (it should after local-memory installation)
if [ ! -d "$HOME/.local-memory" ]; then
  echo "Warning: ~/.local-memory directory not found. Local Memory may not be properly installed."
  echo "Creating directory for Qdrant installation..."
  mkdir -p ~/.local-memory
else
  echo "Using existing ~/.local-memory directory"
fi

if [ ! -f "$HOME/.local-memory/qdrant" ]; then
  echo "Installing Qdrant for high-performance search..."
  
  # Detect architecture and download correct version
  ARCH=$(uname -m)
  if [ "$ARCH" = "arm64" ]; then
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-apple-darwin.tar.gz"
    echo "Detected Apple Silicon (ARM64) - downloading native binary"
  else
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz"
    echo "Detected Intel Mac (x86_64) - downloading Intel binary"
  fi
  
  curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
  cd ~/.local-memory
  tar -xzf qdrant.tar.gz
  chmod +x qdrant
  rm qdrant.tar.gz
  
  echo "✅ Qdrant installed at ~/.local-memory/qdrant"
else
  echo "Qdrant already installed. Checking for updates..."
  CURRENT_VERSION=$(~/.local-memory/qdrant --version 2>/dev/null | grep -o 'qdrant [0-9.]*' | cut -d' ' -f2 || echo "unknown")
  LATEST_VERSION=$(curl -s https://api.github.com/repos/qdrant/qdrant/releases/latest | grep -o '"tag_name": "v[0-9.]*"' | cut -d'"' -f4 | sed 's/v//' || echo "unknown")
  
  if [ "$CURRENT_VERSION" != "unknown" ] && [ "$LATEST_VERSION" != "unknown" ] && [ "$CURRENT_VERSION" != "$LATEST_VERSION" ]; then
    echo "Updating Qdrant from $CURRENT_VERSION to $LATEST_VERSION..."
    # Backup existing qdrant if needed
    mv ~/.local-memory/qdrant ~/.local-memory/qdrant.backup
    
    # Download updated version
    ARCH=$(uname -m)
    if [ "$ARCH" = "arm64" ]; then
      QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-apple-darwin.tar.gz"
    else
      QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz"
    fi
    
    curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
    cd ~/.local-memory
    tar -xzf qdrant.tar.gz
    chmod +x qdrant
    rm qdrant.tar.gz ~/.local-memory/qdrant.backup
    
    echo "✅ Qdrant updated to version $LATEST_VERSION"
  else
    echo "✅ Qdrant is up to date ($CURRENT_VERSION)"
  fi
fi

STEP 4 - START SERVICES:
1. Start local-memory daemon: local-memory start
2. Start Qdrant (optional, for better performance): 
   cd ~/.local-memory && ./qdrant &
3. Verify Qdrant: curl http://localhost:6333/healthz

STEP 5 - CONFIGURE MCP INTEGRATION:
Based on your installation method:

For npm installation:
claude mcp add --transport stdio local-memory -- local-memory --mcp

For manual binary:
claude mcp add local-memory -- /path/to/local-memory

STEP 6 - CLAUDE DESKTOP CONFIGURATION:
Edit ~/.claude_desktop_config.json (create if needed):

For npm installation:
{
  "mcpServers": {
    "local-memory": {
      "command": "/Users/{username}/.npm-global/bin/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

For manual binary:
{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

STEP 7 - OTHER EDITOR CONFIGURATIONS:

GITHUB COPILOT (VS CODE):
Create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory"
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

STEP 8 - VERIFICATION:
1. Check local-memory status: local-memory license status
2. Test Claude Code MCP: claude mcp list
3. Verify Qdrant: curl http://localhost:6333/healthz
4. Test Ollama models: ollama list
5. Restart Claude Desktop and verify memory tools appear
6. Test basic functionality by storing a test memory
7. If using Qdrant: Check search performance improvements

TROUBLESHOOTING:
- License not activated: Use --accept-terms flag
- NPM installation issues (rare): cd ~/.npm-global/lib/node_modules/local-memory-mcp && npm run update
- NPM binary missing: cd ~/.npm-global/lib/node_modules/local-memory-mcp && node scripts/install.js
- Qdrant architecture issues: Script auto-detects ARM64 vs Intel
- Permission errors: Use sudo for /usr/local/bin operations
- Version mismatch: Ensure you have v1.0.4+ with enhanced installation scripts
- Update failures: Try fresh installation as fallback

NOTE: The npm installation is now highly reliable with enhanced v1.0.4+ scripts that automatically handle installation detection, version management, and error recovery. Manual fixes are rarely needed.`;

  const windowsPrompt = `I have purchased a license key for local-memory. Please help me install and configure it completely on Windows:

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
Let's first check what's already installed:

# Check if local-memory is already installed
local-memory --version 2>nul && (
  echo Local Memory found in PATH
  local-memory --version
  local-memory license status
) || (
  echo Local Memory not installed - proceeding with fresh installation
)

# Check Ollama status
ollama --version 2>nul && (
  echo Ollama is installed:
  ollama --version
  echo Installed models:
  ollama list
) || (
  echo Ollama not installed
)

# Check Qdrant status
if exist "%USERPROFILE%\\.local-memory\\qdrant.exe" (
  echo Qdrant found:
  "%USERPROFILE%\\.local-memory\\qdrant.exe" --version 2>nul || echo Qdrant binary exists but may need update
) else (
  echo Qdrant not installed
)

INSTALLATION OPTIONS:

OPTION 1 - NPM INSTALLATION (RECOMMENDED):
1. Install via npm: npm install -g local-memory-mcp
2. Verify installation: local-memory --version
3. Activate license: local-memory license activate ${displayKey} --accept-terms

ALTERNATIVE SETUP (if npm is not available):

METHOD 1 - STILL RECOMMENDED - NPM:
1. Install Node.js from https://nodejs.org if not already installed
2. Install via npm: npm install -g local-memory-mcp
3. Activate license: local-memory license activate ${displayKey}
4. Continue with steps 4-8 above

METHOD 2 - MANUAL BINARY (from this page):
1. Use the binary you just downloaded from this success page
2. Create directory: mkdir "C:\\Program Files\\LocalMemory"
3. Move binary: move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
4. Add to PATH: Add "C:\\Program Files\\LocalMemory" to system PATH environment variable (npm method doesn't need this)
5. Activate license: "C:\\Program Files\\LocalMemory\\local-memory.exe" license activate ${displayKey} --accept-terms
6. Verify: open new cmd/PowerShell and run: local-memory.exe --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Download Ollama from https://ollama.ai/download/windows
2. Install the downloaded .exe file
3. Open new terminal and pull required model: ollama pull nomic-embed-text
4. Pull chat model: ollama pull qwen2.5:3b
5. Verify: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):

# Check if local-memory directory exists (it should after local-memory installation)
if not exist "%USERPROFILE%\\.local-memory" (
  echo Warning: %USERPROFILE%\\.local-memory directory not found. Local Memory may not be properly installed.
  echo Creating directory for Qdrant installation...
  mkdir "%USERPROFILE%\\.local-memory"
) else (
  echo Using existing %USERPROFILE%\\.local-memory directory
)

if not exist "%USERPROFILE%\\.local-memory\\qdrant.exe" (
  echo Installing Qdrant for high-performance search...
  curl -L "https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-pc-windows-msvc.zip" -o "%USERPROFILE%\\.local-memory\\qdrant.zip"
  cd "%USERPROFILE%\\.local-memory"
  tar -xzf qdrant.zip
  del qdrant.zip
  echo ✅ Qdrant installed at %USERPROFILE%\\.local-memory\\qdrant.exe
) else (
  echo Qdrant already installed. You can update manually if needed from GitHub releases.
)

# Start Qdrant
cd "%USERPROFILE%\\.local-memory" && qdrant.exe
# Verify: curl http://localhost:6333/healthz (should return OK)
# Qdrant storage will be created in %USERPROFILE%\\.local-memory\\qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE (if using):
For npm installation:
claude mcp add --transport stdio local-memory -- local-memory.exe --mcp

For manual binary installation:
claude mcp add local-memory -- "C:\\Program Files\\LocalMemory\\local-memory.exe"

STEP 4 - CONFIGURE MCP FOR AI EDITORS:

CLAUDE DESKTOP:
For npm installation, edit %USERPROFILE%\\.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/Users/{username}/.npm-global/bin/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

For manual binary installation:
{
  "mcpServers": {
    "local-memory": {
      "command": "C:\\\\Program Files\\\\LocalMemory\\\\local-memory.exe",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

GITHUB COPILOT (VS CODE):
For npm installation, create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "local-memory"
    }
  }
}

For manual binary:
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
For npm installation, add to Cursor Settings > MCP Servers (or create .cursor/mcp.json):
{
  "servers": {
    "local-memory": {
      "command": "local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

For manual binary:
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
For npm installation, add to Windsurf Settings > MCP Configuration:
{
  "mcpServers": {
    "local-memory": {
      "command": "local-memory",
      "args": [
        "--mcp"
      ]
    }
  }
}

For manual binary:
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
1. Test installation: local-memory --version
2. Check license status: local-memory license status
3. Test Claude Code MCP: claude mcp list
4. For Claude Desktop: restart app and check for memory tools
5. For VS Code: Restart VS Code, open Command Palette, check "MCP: List Servers"
6. For Cursor/Windsurf: Restart editor and verify MCP server appears in settings
7. Test by storing a memory to verify everything works
8. If using Qdrant: curl http://localhost:6333/healthz should return OK

TROUBLESHOOTING:
- License not activated: Use --accept-terms flag in activation command
- NPM installation issues (rare): cd %APPDATA%\\npm\\node_modules\\local-memory-mcp && npm run update
- NPM binary missing: cd %APPDATA%\\npm\\node_modules\\local-memory-mcp && node scripts\\install.js
- PATH issues: npm installation automatically handles PATH; manual installation requires adding "C:\\Program Files\\LocalMemory" to system PATH
- Permission errors: Run Command Prompt as Administrator for manual installations
- Version mismatch: Ensure you have v1.0.4+ with enhanced installation scripts
- Qdrant connection issues: Check Windows Firewall settings for port 6333
- Update failures: Try fresh installation as fallback

NOTE: The npm installation is now highly reliable with enhanced v1.0.4+ scripts that automatically handle installation detection, version management, and error recovery. Manual fixes are rarely needed.`;

  const linuxPrompt = `I have purchased a license key for local-memory. Please help me install and configure it completely on Linux:

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
Let's first check what's already installed:

# Check if local-memory is already installed
if command -v local-memory &> /dev/null; then
  echo "Local Memory found in PATH"
  local-memory --version
  local-memory license status
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
   OR use explicit update: cd ~/.npm-global/lib/node_modules/local-memory-mcp && npm run update
2. Verify update: local-memory --version
3. Check license status: local-memory license status
4. Reactivate if needed: local-memory license activate ${displayKey} --accept-terms

OPTION 3 - MANUAL BINARY INSTALLATION (ADVANCED):
1. Use the binary you just downloaded from this success page
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Install to system: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Activate license: /usr/local/bin/local-memory license activate ${displayKey} --accept-terms
5. Verify installation: /usr/local/bin/local-memory --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh
2. Start Ollama service (if not auto-started): systemctl --user start ollama
3. Pull required model: ollama pull nomic-embed-text
4. Pull chat model: ollama pull qwen2.5:3b
5. Verify: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):

# Check if local-memory directory exists (it should after local-memory installation)
if [ ! -d "$HOME/.local-memory" ]; then
  echo "Warning: ~/.local-memory directory not found. Local Memory may not be properly installed."
  echo "Creating directory for Qdrant installation..."
  mkdir -p ~/.local-memory
else
  echo "Using existing ~/.local-memory directory"
fi

if [ ! -f "$HOME/.local-memory/qdrant" ]; then
  echo "Installing Qdrant for high-performance search..."
  
  # Detect architecture and download correct version
  ARCH=$(uname -m)
  if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-aarch64-unknown-linux-gnu.tar.gz"
    echo "Detected ARM64 Linux - downloading ARM64 binary"
  else
    QDRANT_URL="https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-unknown-linux-gnu.tar.gz"
    echo "Detected x86_64 Linux - downloading x86_64 binary"
  fi
  
  curl -L "$QDRANT_URL" -o ~/.local-memory/qdrant.tar.gz
  cd ~/.local-memory
  tar -xzf qdrant.tar.gz
  chmod +x qdrant
  rm qdrant.tar.gz
  
  echo "✅ Qdrant installed at ~/.local-memory/qdrant"
else
  echo "Qdrant already installed. Checking for updates..."
  CURRENT_VERSION=$(~/.local-memory/qdrant --version 2>/dev/null | grep -o 'qdrant [0-9.]*' | cut -d' ' -f2 || echo "unknown")
  echo "✅ Qdrant is installed ($CURRENT_VERSION). Check GitHub releases for updates if needed."
fi

# Start Qdrant
cd ~/.local-memory && ./qdrant &
# Verify: curl http://localhost:6333/healthz (should return OK)
# Qdrant storage will be created in ~/.local-memory/qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
For npm installation:
claude mcp add --transport stdio local-memory -- local-memory --mcp

For manual binary installation:
claude mcp add local-memory -- /path/to/local-memory

STEP 4 - CONFIGURE MCP FOR AI EDITORS:

CLAUDE DESKTOP:
For npm installation, edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/Users/{username}/.npm-global/bin/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

For manual binary installation:
{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

GITHUB COPILOT (VS CODE):
Create .vscode/mcp.json in your project root:
{
  "servers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
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
1. Test installation: local-memory --version
2. Check license status: local-memory license status
3. Test Claude Code MCP: claude mcp list (should show local-memory)
4. For Claude Desktop: restart app and verify memory tools appear
5. For VS Code: Restart VS Code, open Command Palette, check "MCP: List Servers"
6. For Cursor/Windsurf: Restart editor and verify MCP server appears in settings
7. Test functionality by storing and retrieving a memory
8. If using Qdrant: curl http://localhost:6333/healthz should return OK

TROUBLESHOOTING:
- License not activated: Use --accept-terms flag in activation command
- NPM installation issues (rare): cd ~/.npm-global/lib/node_modules/local-memory-mcp && npm run update
- NPM binary missing: cd ~/.npm-global/lib/node_modules/local-memory-mcp && node scripts/install.js
- Permission errors: For manual installation, use sudo for /usr/local/bin operations
- PATH issues: npm installation automatically handles PATH; manual installation may need PATH updates
- Version mismatch: Ensure you have v1.0.4+ with enhanced installation scripts
- Service management: Use systemctl --user start/stop/status ollama for Ollama service control
- Architecture issues: Script auto-detects ARM64 vs x86_64 for Qdrant downloads
- Update failures: Try fresh installation as fallback

NOTE: The npm installation is now highly reliable with enhanced v1.0.4+ scripts that automatically handle installation detection, version management, and error recovery. Manual fixes are rarely needed.`;

  const restApiPrompt = `I have purchased a license key for local-memory and want to run it as a REST API server instead of MCP integration (useful for editors without MCP support or custom integrations):

STEP 0 - LICENSE VERIFICATION:
If you don't have a valid license key, visit https://localmemory.co/purchase first.

STEP 1 - CHECK EXISTING INSTALLATION:
Let's first check what's already installed:

# Check if local-memory is already installed (cross-platform)
if command -v local-memory &> /dev/null || where local-memory > nul 2>&1; then
  echo "Local Memory found in PATH"
  local-memory --version
  local-memory license status
else
  echo "Local Memory not installed - proceeding with fresh installation"
fi

# Check Ollama status (cross-platform)
if command -v ollama &> /dev/null || where ollama > nul 2>&1; then
  echo "Ollama is installed:"
  ollama --version
  echo "Installed models:"
  ollama list
else
  echo "Ollama not installed"
fi

# Check Qdrant status (cross-platform)
if [ -f "$HOME/.local-memory/qdrant" ] || [ -f "%USERPROFILE%\\.local-memory\\qdrant.exe" ]; then
  echo "Qdrant found - REST API will use high-performance search"
else
  echo "Qdrant not installed - REST API will use SQLite (still fast)"
fi

INSTALLATION OPTIONS:

OPTION 1 - NPM INSTALLATION (RECOMMENDED):
1. Install via npm: npm install -g local-memory-mcp
2. Verify installation: local-memory --version
3. Activate license: local-memory license activate ${displayKey} --accept-terms

OPTION 2 - UPDATE EXISTING INSTALLATION:
If local-memory is already installed but outdated:
1. Update via npm: npm update -g local-memory-mcp
   OR use explicit update: cd ~/.npm-global/lib/node_modules/local-memory-mcp && npm run update (Linux/macOS)
   OR use explicit update: cd %APPDATA%\\npm\\node_modules\\local-memory-mcp && npm run update (Windows)
2. Verify update: local-memory --version
3. Check license status: local-memory license status
4. Reactivate if needed: local-memory license activate ${displayKey} --accept-terms

OPTION 3 - MANUAL BINARY INSTALLATION (ADVANCED):
Use the binary you just downloaded from this success page:

macOS/Linux: 
- chmod +x ~/Downloads/local-memory*
- sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory

Windows:
- move "C:\\Downloads\\local-memory*.exe" "C:\\Program Files\\LocalMemory\\local-memory.exe"
- Add to PATH (npm method doesn't need this)

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

STEP 5 - COMPLETE REST API REFERENCE:
Base URL: http://localhost:3002/api/v1/

ALL 27 REST API ENDPOINTS (organized by category):

CORE MEMORY OPERATIONS (4 endpoints):
- POST /memories - Store new memory with content, tags, importance
- PUT /memories/{id} - Update existing memory
- GET /memories/{id} - Get specific memory by ID
- DELETE /memories/{id} - Delete memory by ID

SEARCH & DISCOVERY (3 endpoints):
- GET /memories/search - Search memories with query, filters, limits
- GET /memories/{id}/related - Find related memories
- GET /memories - List all memories with pagination

AI-POWERED ANALYSIS (2 endpoints):
- POST /ask - Ask natural language questions about stored memories
- POST /analyze - Analyze memory patterns and generate insights

TEMPORAL ANALYSIS (3 endpoints):
- GET /memories/temporal-patterns - Analyze learning progression over time
- POST /track-learning - Track learning progression for specific concepts
- POST /detect-gaps - Identify knowledge gaps in stored memories

RELATIONSHIP MANAGEMENT (4 endpoints):
- POST /relationships - Create relationships between memories
- GET /relationships/discover - Discover automatic relationships
- GET /relationships/map - Generate relationship graph maps
- GET /memories/{id}/relationships - Get relationships for specific memory

CATEGORIZATION (4 endpoints):
- POST /categories - Create new memory categories
- GET /categories - List all available categories  
- POST /memories/{id}/categorize - Auto-categorize memory with AI
- GET /categories/{id}/stats - Get statistics for category

STATISTICS & ANALYTICS (2 endpoints):
- GET /sessions/stats - Get current session statistics
- GET /domains/stats - Get domain-specific statistics

SYSTEM MANAGEMENT (3 endpoints):
- GET /health - Health check and system status
- GET /sessions - List all available sessions
- POST /domains - Create new knowledge domains

API DISCOVERY:
- GET /api/v1/ - Returns list of all available endpoints with descriptions

PERFORMANCE COMPARISON:
- SQLite mode: ~100ms search response time (still very fast)
- Qdrant mode: ~10ms search response time (10x faster for large datasets)

AUTHENTICATION: All endpoints use session-based authentication via license activation.

INTEGRATION EXAMPLES:
- cURL: curl -X POST http://localhost:3002/api/v1/memories -H "Content-Type: application/json" -d '{"content":"My insight","tags":["ai","memory"]}'
- Python: requests.post("http://localhost:3002/api/v1/memories", json={"content":"My insight"})
- JavaScript: fetch("http://localhost:3002/api/v1/memories", {method:"POST", body:JSON.stringify(data)})

TROUBLESHOOTING:
- License not activated: Use --accept-terms flag in activation command  
- NPM installation issues (rare): Use npm run update in package directory
- Port conflicts: local-memory auto-selects available ports 3002-3005
- API connectivity: Check local-memory start output for actual port
- Cross-platform paths: npm handles PATH automatically; manual installs need PATH setup
- Version mismatch: Ensure you have v1.0.4+ with enhanced installation scripts
- Service status: Use local-memory status to check running services
- Update failures: Try fresh installation as fallback

NOTE: The npm installation is now highly reliable with enhanced v1.0.4+ scripts that automatically handle installation detection, version management, and error recovery. The REST API provides 27 endpoints covering all MCP functionality plus additional REST-specific features.`;

  return (
    <div className="mt-8">
      <Card className="border-0 border-memory-blue/0 bg-card bg-slate-900">
        
        <CardContent className="space-y-6">

          <div className="bg-memory-purple/10 border border-memory-purple/20 p-4 rounded-lg">
            <h4 className="font-semibold text-memory-purple mb-2">How It Works:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Confirm you have a valid license key (if not, visit <a href="https://localmemory.co/payment" target="_blank" className="text-blue-500 hover:underline">localmemory.co/payment</a>)</li>
              <li>Copy the prompt applicable to your operating system.</li>
              <li>Paste it into your AI agent (Claude, OpenCode, etc.).</li>
              {isPlaceholder && (
                <li className="text-yellow-600 bg-muted-50/50 p-2 rounded border border-yellow-200">
                  <strong>⚠️ Important:</strong> Replace the placeholder license key <code className="bg-muted-100 px-1 rounded text-yellow-800">LM-XXXX-XXXX-XXXX-XXXX-XXXX</code> with your provided license key after purchase.
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
            <div className="border-2 border-memory-pink/30 rounded-lg p-4 bg-card w-full max-w-full overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">macOS Installation Prompt</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(macosPrompt, 'macos')}
                    className="gap-2 border-memory-pink/30"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'macos' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['macos'] ? 'rotate-180' : ''}`} />
                      <span className="hidden sm:inline">{openPrompts['macos'] ? 'Hide' : 'Show'} Full Prompt</span>
                      <span className="sm:hidden">{openPrompts['macos'] ? 'Hide' : 'Show'}</span>
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
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto w-full max-w-full overflow-hidden">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono w-full break-words overflow-wrap-anywhere">
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
            <div className="border-2 border-memory-blue/30 rounded-lg p-4 bg-card w-full max-w-full overflow-hidden">
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
                      <span className="hidden sm:inline">{openPrompts['windows'] ? 'Hide' : 'Show'} Full Prompt</span>
                      <span className="sm:hidden">{openPrompts['windows'] ? 'Hide' : 'Show'}</span>
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
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto w-full max-w-full overflow-hidden">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono w-full break-words overflow-wrap-anywhere">
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
            <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card w-full max-w-full overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Linux Installation Prompt</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(linuxPrompt, 'linux')}
                    className="gap-2 border-memory-green/30"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'linux' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['linux'] ? 'rotate-180' : ''}`} />
                      <span className="hidden sm:inline">{openPrompts['linux'] ? 'Hide' : 'Show'} Full Prompt</span>
                      <span className="sm:hidden">{openPrompts['linux'] ? 'Hide' : 'Show'}</span>
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
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto w-full max-w-full overflow-hidden">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono w-full break-words overflow-wrap-anywhere">
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
            <div className="border-2 border-memory-orange/30 rounded-lg p-4 bg-card w-full max-w-full overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">REST API Setup (Universal)</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(restApiPrompt, 'api')}
                    className="gap-2 border-memory-orange/30"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === 'api' ? 'Copied!' : 'Copy'}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openPrompts['api'] ? 'rotate-180' : ''}`} />
                      <span className="hidden sm:inline">{openPrompts['api'] ? 'Hide' : 'Show'} Full Prompt</span>
                      <span className="sm:hidden">{openPrompts['api'] ? 'Hide' : 'Show'}</span>
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
                <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto w-full max-w-full overflow-hidden">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono w-full break-words overflow-wrap-anywhere">
                    {restApiPrompt}
                  </pre>
                </div>
              </CollapsibleContent>
              
              <p className="text-xs text-muted-foreground mt-2">
                <em>For OpenCode, ChatGPT, custom agents — works with any platform via HTTP</em>
              </p>
            </div>
          </Collapsible>

        </CardContent>
      </Card>
    </div>
  );
};

export default PostPurchaseAgentSetup;