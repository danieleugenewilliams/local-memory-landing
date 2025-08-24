import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, Copy, Check, Car } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CryptoJS from "crypto-js";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [productKey, setProductKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate secure download URL for universal ZIP using time-based hashing
  const generateSecureDownloadUrl = (paymentTimestamp: number) => {
    const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
    
    // Convert timestamp to seconds if it's in milliseconds
    const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;
    
    // Calculate 12-hour time window (matches backend logic)
    const timeWindow = Math.floor(timestampInSeconds / 43200);
    
    // Generate hash for universal ZIP using golang license key algorithm (matches license key generation)
    const data = `${DOWNLOAD_SECRET}:download-access:${timeWindow}:universal`;
    const rawHash = CryptoJS.SHA256(data).toString().toUpperCase();
    
    // Apply character filtering and replacement (matches golang app algorithm)
    const cleanHash = rawHash.replace(/[01OI578]/g, (match) => {
      const replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' };
      return replacements[match] || match;
    });
    
    const hash = cleanHash.slice(0, 16);
    
    // Debug logging
    console.log(`Debug universal ZIP:`, {
      paymentTimestamp,
      timestampInSeconds,
      timeWindow,
      data,
      hash
    });
    
    // Universal ZIP filename
    const universalZipName = 'local-memory-universal.zip';
    
    // Production: route through main domain to CloudFront
    return `https://localmemory.co/downloads/${timeWindow}/${hash}/universal/${universalZipName}`;
  };

  // Generate timestamp-less cryptographically secure product key
  const generateProductKey = (sessionId: string) => {
    const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
    
    // Step 1: Create base hash from session + secret (controllable parameters only)
    const baseInput = `${sessionId}-${DOWNLOAD_SECRET}`;
    const baseHash = CryptoJS.SHA256(baseInput).toString();
    
    // Step 2: Create verification components from base hash (4 chars each for 5 segments)
    const sessionHash = baseHash.substring(0, 4);
    const verificationHash = baseHash.substring(4, 8);
    const integrityHash = baseHash.substring(8, 12);
    const checksumSeed = baseHash.substring(12, 16);
    const extraHash = baseHash.substring(16, 20);
    
    // Step 3: Generate checksum from all components
    const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${checksumSeed}${extraHash}`;
    const checksumHash = CryptoJS.SHA256(checksumInput).toString();
    const checksum = checksumHash.substring(0, 4);
    
    // Step 4: Combine into 5-segment format matching golang expectations
    const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();
    
    // Step 5: Filter unwanted characters [01OI578] to match golang expectations
    const filtered = rawKey.replace(/[01OI578]/g, (match) => {
      const replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' };
      return replacements[match] || match;
    });
    
    console.log('Timestamp-less product key generated:', {
      sessionId: sessionId.slice(0, 8) + '...',
      keyLength: filtered.length,
      format: 'LM-XXXX-XXXX-XXXX-XXXX-XXXX',
      algorithm: 'deterministic-hash-based'
    });
    
    return filtered;
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
        
        // Payment flow is valid - generate secure download URL and product key
        const secureUrl = generateSecureDownloadUrl(paymentTimestamp);
        const generatedKey = generateProductKey(sessionId);
        setIsVerified(true);
        setDownloadUrl(secureUrl);
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
            // Regenerate secure URL with original payment timestamp
            const secureUrl = generateSecureDownloadUrl(unlocked.paymentTimestamp);
            setDownloadUrl(secureUrl);
            // Restore product key if available, or regenerate if missing
            if (unlocked.productKey) {
              setProductKey(unlocked.productKey);
            } else {
              const regeneratedKey = generateProductKey(unlocked.sessionId);
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

  const handleDownload = async () => {
    if (!downloadUrl) {
      alert('Download link not available. Please refresh the page and try again.');
      return;
    }
    
    try {
      console.log('Starting universal ZIP download:', downloadUrl);
      
      // Use CloudFront URL directly for actual downloads
      // CloudFront origin path is '/downloads' so we need to remove the /downloads prefix to avoid double pathing
      const cloudFrontUrl = downloadUrl.replace('https://localmemory.co/downloads/', 'https://d3g3vv5lpyh0pb.cloudfront.net/');
      
      // Create a temporary link element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = cloudFrontUrl;
      downloadLink.download = 'local-memory-universal.zip';
      downloadLink.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log('Universal ZIP download initiated');
      
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
              Thank you for purchasing <em>Local Memory</em>!
            </p>
          </div>

          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-lg flex items-center justify-center">

              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full p-6 border-2 border-none rounded-lg bg-muted-50">
                  <div className="text-center mt-2 space-y-3">
                    <Button 
                      onClick={handleDownload}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Download className="w-5 h-5" />
                      Download <em>Local Memory</em>
                    </Button>
                    <div className="text-xs text-green-600 mt-2">
                      One ZIP file • All supported platforms • Includes installation guide
                    </div>
                  </div>
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
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Quick Start:</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                  <li><strong>Download & Extract:</strong> Use the download button above to get the universal ZIP file</li>
                  <li><strong>Activate License:</strong> Run <code className="bg-background px-1 rounded">./local-memory-* license activate {productKey}</code> with your license key above</li>
                  <li><strong>Start Local Memory:</strong> Run <code className="bg-background px-1 rounded">./local-memory-* start</code> (auto-installs dependencies)</li>
                  <li><strong>Ready!</strong> Your AI memory system is now running at <a href="http://localhost:3001/api/v1/health" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">localhost:3001</a></li>
                </ol>
                
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-md">
                  <p className="text-sm font-medium text-blue-300 mb-1">Quick Start (2 minutes):</p>
                  <p className="text-xs text-blue-300">
                    No Node.js required! Just download → install Ollama → run the binary. 
                    Creates local-memories.db automatically with AI-powered search and retrieval.
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
                  <p className="text-sm font-medium text-green-300 mb-1">Universal ZIP Benefits:</p>
                  <p className="text-xs text-green-300 mb-2">
                    One download for all platforms! Simplified experience with license keys.
                  </p>
                  <div className="text-xs text-green-200 space-y-1">
                    <p><strong>✅ No platform guessing:</strong> Contains all binaries - choose after download</p>
                    <p><strong>✅ Future-proof:</strong> Includes both Intel and Apple Silicon Mac binaries</p>
                    <p><strong>✅ macOS security:</strong> Right-click binary → "Open" or run: <code className="bg-green-800/30 px-1 rounded text-green-100">xattr -rd com.apple.quarantine local-memory-*</code></p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Badge variant="secondary" className="mb-2">Need More Help?</Badge>
                <p className="text-sm text-muted-foreground">
                  For advanced setup, AI agent prompts, and detailed guides: <Link to="/docs" className="text-blue-600 hover:underline font-medium">Visit Documentation</Link>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Join our community: <a href="https://discord.gg/5mJMDKbY" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">Discord Server</a>
                </p>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;