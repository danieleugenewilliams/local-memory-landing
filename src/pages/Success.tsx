import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [downloadLinks, setDownloadLinks] = useState<{[key: string]: string}>({});
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyPaymentFlow = () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        console.error('No session_id found in URL');
        setIsVerifying(false);
        return;
      }

      // Check if payment was initiated from this browser
      const paymentInitiated = sessionStorage.getItem('payment_initiated');
      const storedTokenData = localStorage.getItem('payment_token');
      
      if (!paymentInitiated || !storedTokenData) {
        console.error('Payment not initiated from this browser session');
        setIsVerifying(false);
        return;
      }

      try {
        const tokenData = JSON.parse(storedTokenData);
        const currentTime = Date.now();
        
        // Check if token has expired (30 minutes)
        if (currentTime - tokenData.timestamp > 30 * 60 * 1000) {
          console.error('Payment session has expired');
          localStorage.removeItem('payment_token');
          sessionStorage.removeItem('payment_initiated');
          sessionStorage.removeItem('payment_token_backup');
          setIsVerifying(false);
          return;
        }
        
        // Payment flow is valid - grant access to downloads
        setIsVerified(true);
        setDownloadLinks({
          macos: '/downloads/local-memory-macos.dmg',
          windows: '/downloads/local-memory-windows.exe', 
          linux: '/downloads/local-memory-linux.tar.gz'
        });
        
        // Clear all payment tokens to prevent reuse
        localStorage.removeItem('payment_token');
        sessionStorage.removeItem('payment_initiated');
        sessionStorage.removeItem('payment_token_backup');
        
        // Store successful verification for page refreshes (1 hour)
        sessionStorage.setItem('downloads_unlocked', JSON.stringify({
          sessionId: sessionId,
          timestamp: currentTime
        }));
        
      } catch (error) {
        console.error('Error verifying payment flow:', error);
        localStorage.removeItem('payment_token');
        sessionStorage.removeItem('payment_initiated');
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };

    // Check for existing unlocked downloads first (for page refreshes)
    const unlockedDownloads = sessionStorage.getItem('downloads_unlocked');
    if (unlockedDownloads) {
      try {
        const unlocked = JSON.parse(unlockedDownloads);
        const currentTime = Date.now();
        
        // Check if unlock is still valid (1 hour)
        if (currentTime - unlocked.timestamp < 60 * 60 * 1000) {
          setIsVerified(true);
          setDownloadLinks({
            macos: '/downloads/local-memory-macos.dmg',
            windows: '/downloads/local-memory-windows.exe', 
            linux: '/downloads/local-memory-linux.tar.gz'
          });
          setIsVerifying(false);
          return;
        } else {
          // Unlock has expired
          sessionStorage.removeItem('downloads_unlocked');
        }
      } catch (error) {
        console.error('Error parsing unlock data:', error);
        sessionStorage.removeItem('downloads_unlocked');
      }
    }

    verifyPaymentFlow();
  }, [searchParams]);

  const handleDownload = (platform: string) => {
    const link = downloadLinks[platform];
    if (link) {
      // Create temporary link and trigger download
      const a = document.createElement('a');
      a.href = link;
      a.download = `local-memory-${platform}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Redirect to payment page if not verified and not verifying
  if (!isVerifying && !isVerified) {
    return <Navigate to="/payment" replace />;
  }

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="py-12">
          <div className="container max-w-2xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 animate-spin">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full"></div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Verifying Payment...
              </h1>
              <p className="text-lg text-muted-foreground">
                Please wait while we confirm your purchase.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for purchasing Local Memory! Download your platform-specific executable below.
            </p>
          </div>

          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Download Local Memory</CardTitle>
              <CardDescription>
                Choose your operating system to download the executable
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍎</span>
                    <div>
                      <div className="font-semibold">macOS</div>
                      <div className="text-sm text-muted-foreground">Intel & Apple Silicon</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('macos')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🪟</span>
                    <div>
                      <div className="font-semibold">Windows</div>
                      <div className="text-sm text-muted-foreground">Windows 10/11</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('windows')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🐧</span>
                    <div>
                      <div className="font-semibold">Linux</div>
                      <div className="text-sm text-muted-foreground">x64 binary</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('linux')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                  <li>Download the executable for your platform above</li>
                  <li><strong>Install Ollama:</strong> Visit <a href="https://ollama.ai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a> and download, then run: <code className="bg-background px-1 rounded">ollama pull nomic-embed-text</code></li>
                  <li><strong>Optional - Install Qdrant (5-8x faster search):</strong> Download from <a href="https://github.com/qdrant/qdrant/releases/latest" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Qdrant releases</a>, extract, and run: <code className="bg-background px-1 rounded">./qdrant</code></li>
                  <li><strong>Run Local Memory:</strong> <code className="bg-background px-1 rounded">./local-memory --session-id my-project</code></li>
                  <li><strong>Verify:</strong> Check <a href="http://localhost:3001/api/v1/health" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:3001/api/v1/health</a></li>
                  <li><strong>Optional:</strong> Add to Claude Desktop MCP config for AI integration</li>
                </ol>
                
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-md">
                  <p className="text-sm font-medium text-blue-300 mb-1">Quick Start (2 minutes):</p>
                  <p className="text-xs text-blue-300">
                    No Node.js required! Just download → install Ollama → run the binary. 
                    Creates memories.db automatically with AI-powered search and retrieval.
                  </p>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-md">
                  <p className="text-sm font-medium text-green-300 mb-1">Performance Mode (Optional):</p>
                  <p className="text-xs text-green-300">
                    Install Qdrant for lightning-fast vector search (&lt;10ms vs ~100ms). 
                    Local Memory auto-detects and uses Qdrant when available, falls back to SQLite seamlessly.
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <Badge variant="secondary" className="mb-2">Need Help?</Badge>
                <p className="text-sm text-muted-foreground">
                  Check out our <Link to="/docs" className="text-blue-600 hover:underline">documentation</Link> or 
                  join our <a href="https://discord.gg/pjVX4BWu" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <PostPurchaseAgentSetup />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;