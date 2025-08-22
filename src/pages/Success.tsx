import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import CryptoJS from "crypto-js";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [downloadLinks, setDownloadLinks] = useState<{[key: string]: string}>({});
  const [productKey, setProductKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate secure download URLs using time-based hashing
  const generateSecureDownloadUrls = (paymentTimestamp: number) => {
    const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
    
    const platforms = ['macos', 'windows', 'linux'];
    const urls: {[key: string]: string} = {};
    
    platforms.forEach(platform => {
      // Convert timestamp to seconds if it's in milliseconds
      const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;
      
      // Calculate 12-hour time window (matches backend logic)
      const timeWindow = Math.floor(timestampInSeconds / 43200);
      
      // Generate hash with fixed identifier for scalability: SECRET:download-access:timeWindow:platform
      const data = `${DOWNLOAD_SECRET}:download-access:${timeWindow}:${platform}`;
      const hash = CryptoJS.SHA256(data).toString().slice(0, 16);
      
      // Debug logging
      console.log(`Debug ${platform}:`, {
        paymentTimestamp,
        timestampInSeconds,
        timeWindow,
        data,
        hash
      });
      
      // Production: route through main domain to CloudFront
      const getZipName = (platform: string) => {
        switch (platform) {
          case 'macos': return 'local-memory-macos.zip';
          case 'windows': return 'local-memory-windows.zip';
          case 'linux': return 'local-memory-linux.zip';
          default: return `local-memory-${platform}.zip`;
        }
      };
      
      const zipName = getZipName(platform);
      urls[platform] = `https://localmemory.co/downloads/${timeWindow}/${hash}/${platform}/${zipName}`;
    });
    
    return urls;
  };

  // Generate self-contained cryptographically secure product key
  const generateProductKey = (sessionId: string, paymentTimestamp: number) => {
    const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
    
    // Convert timestamp to seconds if it's in milliseconds
    const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;
    
    let attemptCount = 0;
    const maxAttempts = 10;
    
    while (attemptCount < maxAttempts) {
      // Add salt for retry attempts if needed
      const saltSuffix = attemptCount > 0 ? `:retry:${attemptCount}` : '';
      
      // Step 1: Generate session ID hash (4 chars)
      const sessionData = `${DOWNLOAD_SECRET}:session:${sessionId}${saltSuffix}`;
      const sessionHash = CryptoJS.SHA256(sessionData).toString().toUpperCase().replace(/[01OI]/g, '');
      
      // Step 2: Generate timestamp encoding (4 chars) 
      // Use offset from 2020-01-01 to compress timestamp
      const epoch2020 = 1577836800; // 2020-01-01 00:00:00 UTC
      const timestampOffset = timestampInSeconds - epoch2020;
      const timestampData = `${DOWNLOAD_SECRET}:timestamp:${timestampOffset}${saltSuffix}`;
      const timestampHash = CryptoJS.SHA256(timestampData).toString().toUpperCase().replace(/[01OI]/g, '');
      
      // Step 3: Generate verification hash (8 chars)
      const verificationData = `${DOWNLOAD_SECRET}:verify:${sessionId}:${timestampInSeconds}${saltSuffix}`;
      const verificationHash = CryptoJS.SHA256(verificationData).toString().toUpperCase().replace(/[01OI]/g, '');
      
      // Step 4: Generate integrity checksum (4 chars)
      const checksumData = `${sessionHash.slice(0, 4)}:${timestampHash.slice(0, 4)}:${verificationHash.slice(0, 8)}`;
      const checksumHash = CryptoJS.SHA256(checksumData).toString().toUpperCase().replace(/[01OI]/g, '');
      
      // Check if we have enough characters after filtering for all segments
      if (sessionHash.length >= 4 && timestampHash.length >= 4 && 
          verificationHash.length >= 8 && checksumHash.length >= 4) {
        
        const sessionChars = sessionHash.slice(0, 4);
        const timestampChars = timestampHash.slice(0, 4);
        const verificationChars = verificationHash.slice(0, 8);
        const checksumChars = checksumHash.slice(0, 4);
        
        // Format as LM-XXXX-XXXX-XXXX-XXXX-XXXX (self-contained)
        const formattedKey = `LM-${sessionChars}-${timestampChars}-${verificationChars.slice(0, 4)}-${verificationChars.slice(4, 8)}-${checksumChars}`;
        
        console.log('Self-contained product key generated:', {
          sessionId: sessionId.slice(0, 8) + '...',
          timestampInSeconds,
          timestampOffset,
          attemptCount,
          keyLength: formattedKey.length,
          format: 'LM-SESS-TIME-VER1-VER2-VER3-CHKS'
        });
        
        return formattedKey;
      }
      
      console.warn(`Attempt ${attemptCount + 1}: Insufficient characters after filtering, retrying with salt...`);
      attemptCount++;
    }
    
    // Fallback: This should statistically never happen
    console.error('Failed to generate self-contained key with sufficient characters after 10 attempts');
    throw new Error('Unable to generate secure product key - please refresh and try again');
  };

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
        const paymentTimestamp = tokenData.initiated || tokenData.timestamp;
        
        // Check if token has expired (30 minutes from initiation)
        if (currentTime - tokenData.timestamp > 30 * 60 * 1000) {
          console.error('Payment session has expired');
          localStorage.removeItem('payment_token');
          sessionStorage.removeItem('payment_initiated');
          sessionStorage.removeItem('payment_token_backup');
          sessionStorage.removeItem('payment_timestamp');
          setIsVerifying(false);
          return;
        }
        
        // Verify download time window (48 hours from payment initiation)
        if (currentTime - paymentTimestamp > 48 * 60 * 60 * 1000) {
          console.error('Download window has expired (48 hours)');
          setIsVerifying(false);
          return;
        }
        
        // Payment flow is valid - generate secure download URLs and product key
        const secureUrls = generateSecureDownloadUrls(paymentTimestamp);
        const generatedKey = generateProductKey(sessionId, paymentTimestamp);
        setIsVerified(true);
        setDownloadLinks(secureUrls);
        setProductKey(generatedKey);
        
        // Clear payment tokens to prevent reuse
        localStorage.removeItem('payment_token');
        sessionStorage.removeItem('payment_initiated');
        sessionStorage.removeItem('payment_token_backup');
        sessionStorage.removeItem('payment_timestamp');
        
        // Store successful verification for page refreshes (1 hour)
        sessionStorage.setItem('downloads_unlocked', JSON.stringify({
          sessionId: sessionId,
          timestamp: currentTime,
          paymentTimestamp: paymentTimestamp,
          productKey: generatedKey
        }));
        
      } catch (error) {
        console.error('Error verifying payment flow:', error);
        localStorage.removeItem('payment_token');
        sessionStorage.removeItem('payment_initiated');
        sessionStorage.removeItem('payment_timestamp');
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
          // Verify download time window (48 hours from original payment)
          if (currentTime - unlocked.paymentTimestamp < 48 * 60 * 60 * 1000) {
            setIsVerified(true);
            // Regenerate secure URLs with original payment timestamp
            const secureUrls = generateSecureDownloadUrls(unlocked.paymentTimestamp);
            setDownloadLinks(secureUrls);
            // Restore product key if available, or regenerate if missing
            if (unlocked.productKey) {
              setProductKey(unlocked.productKey);
            } else {
              const regeneratedKey = generateProductKey(unlocked.sessionId, unlocked.paymentTimestamp);
              setProductKey(regeneratedKey);
            }
            setIsVerifying(false);
            return;
          } else {
            console.error('Download window has expired');
            sessionStorage.removeItem('downloads_unlocked');
          }
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

  const handleDownload = async (platform: string) => {
    const link = downloadLinks[platform];
    if (!link) {
      alert('Download link not available. Please refresh the page and try again.');
      return;
    }
    
    try {
      console.log(`Starting download for ${platform}:`, link);
      
      // Use CloudFront URL directly for actual downloads
      // CloudFront origin path is '/downloads' so we need to remove the /downloads prefix to avoid double pathing
      const cloudFrontUrl = link.replace('https://localmemory.co/downloads/', 'https://d3g3vv5lpyh0pb.cloudfront.net/');
      
      // Create a temporary link element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = cloudFrontUrl;
      downloadLink.download = `local-memory-${platform}.zip`;
      downloadLink.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log(`Download initiated for ${platform}`);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please contact support if this issue persists.');
    }
  };

  const handleCopyProductKey = async () => {
    try {
      await navigator.clipboard.writeText(productKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy product key:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
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
              Thank you for purchasing <em>Local Memory</em>! Download your platform-specific executable below.
            </p>
          </div>

          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Download <em>Local Memory</em></CardTitle>
              <CardDescription>
                Choose your operating system to download the executable
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">macOS</div>
                      <div className="text-sm text-muted-foreground">Universal - includes both Intel and Apple Silicon binaries</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('macos')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">Windows</div>
                      <div className="text-sm text-muted-foreground">Windows 10/11 - 64-bit executable</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('windows')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">Linux</div>
                      <div className="text-sm text-muted-foreground">x64 binary - tested on Ubuntu, Debian, CentOS, Alpine, Fedora</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('linux')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Key Section */}
          <Card className="border-2 border-memory-blue/50 mt-6">
            <CardHeader className="text-center">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                🔑 Your Product License Key
              </CardTitle>
              <CardDescription>
                Save this key - you'll need it to activate Local Memory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between gap-3">
                  <code className="text-lg font-mono text-foreground bg-background px-3 py-2 rounded border flex-1 text-center">
                    {productKey}
                  </code>
                  <Button
                    onClick={handleCopyProductKey}
                    variant="outline"
                    size="sm"
                    className="gap-2 min-w-[100px]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Keep this key safe - it's unique to your purchase</p>
                <p>• You'll use this key when setting up Local Memory</p>
                <p>• The key is cryptographically tied to your payment session</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                  <li>Download and extract the ZIP file for your platform above</li>
                  <li><strong>macOS:</strong> Choose the correct binary (local-memory-intel or local-memory-arm) and make executable: <code className="bg-background px-1 rounded">chmod +x local-memory-*</code></li>
                  <li><strong>Activate License:</strong> Run <code className="bg-background px-1 rounded">{`local-memory --license-key ${productKey}`}</code> with your product key above</li>
                  <li><strong>Install Ollama:</strong> Visit <a href="https://ollama.ai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a> and download, then run: <code className="bg-background px-1 rounded">ollama pull nomic-embed-text</code></li>
                  <li><strong>Recommended - Install Qdrant (10x faster search):</strong> Download from <a href="https://github.com/qdrant/qdrant/releases/latest" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Qdrant releases</a>, extract to <code className="bg-background px-1 rounded">~/.local-memory/</code>, and run: <code className="bg-background px-1 rounded">cd ~/.local-memory && ./qdrant &</code></li>
                  <li><strong>Run <em>Local Memory</em>:</strong> <code className="bg-background px-1 rounded">local-memory start</code></li>
                  <li><strong>Verify:</strong> Check <a href="http://localhost:3001/api/v1/health" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:3001/api/v1/health</a></li>
                  <li><strong>Recommended:</strong> Add to Claude Desktop MCP config for AI integration</li>
                </ol>
                
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-md">
                  <p className="text-sm font-medium text-blue-300 mb-1">Quick Start (2 minutes):</p>
                  <p className="text-xs text-blue-300">
                    No Node.js required! Just download → install Ollama → run the binary. 
                    Creates memories.db automatically with AI-powered search and retrieval.
                  </p>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-md">
                  <p className="text-sm font-medium text-green-300 mb-1">Performance Mode (recommended feature):</p>
                  <p className="text-xs text-green-300">
                    Install Qdrant for lightning-fast vector search (&lt;10ms vs ~100ms). 
                    <em>Local Memory</em> auto-detects and uses Qdrant when available, falls back to SQLite seamlessly.
                  </p>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-md">
                  <p className="text-sm font-medium text-green-300 mb-1">macOS ZIP Benefits:</p>
                  <p className="text-xs text-green-300 mb-2">
                    ZIP format reduces security warnings! But if needed:
                  </p>
                  <div className="text-xs text-green-200 space-y-1">
                    <p><strong>Option 1:</strong> Right-click the extracted binary → "Open" → click "Open" in dialog</p>
                    <p><strong>Option 2:</strong> Run: <code className="bg-green-800/30 px-1 rounded text-green-100">xattr -rd com.apple.quarantine local-memory-*</code></p>
                    <p><strong>Included:</strong> Both Intel and ARM binaries in one convenient download</p>
                  </div>
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
          
          <PostPurchaseAgentSetup productKey={productKey} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;