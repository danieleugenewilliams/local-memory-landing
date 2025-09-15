import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, Copy, Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import CryptoJS from "crypto-js";
import { detectUserPlatform, getPlatformInfo, getAllPlatforms, type Platform } from "@/lib/utils";
import { trackPurchase, trackDownloadInitiated, trackLicenseKeyGenerated } from "@/lib/analytics";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [productKey, setProductKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('unknown');
  const [downloadUrls, setDownloadUrls] = useState<Record<Platform, string>>({} as Record<Platform, string>);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Generate GitHub releases download URL for platform-specific files
  const getGitHubDownloadUrl = (platform: Platform = 'unknown'): string => {
    const baseUrl = 'https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download/';
    const platformInfo = getPlatformInfo(platform);
    const filename = platformInfo.filename;
    
    // Debug logging
    console.log(`GitHub download URL for ${platform}:`, {
      platform,
      filename,
      url: `${baseUrl}${filename}`
    });
    
    return `${baseUrl}${filename}`;
  };

  // Generate GitHub download URLs for all platforms
  const generateAllDownloadUrls = (): Record<Platform, string> => {
    const urls: Record<Platform, string> = {} as Record<Platform, string>;
    const platforms: Platform[] = ['macos-arm', 'macos-intel', 'windows', 'linux', 'unknown'];
    
    for (const platform of platforms) {
      urls[platform] = getGitHubDownloadUrl(platform);
    }
    
    return urls;
  };

  // Client-side license key format validation
  const validateLicenseKeyFormat = (key: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Length check
    if (key.length !== 27) {
      errors.push(`Invalid length: ${key.length} (expected 27)`);
    }
    
    // Pattern check
    if (!key.startsWith('LM-')) {
      errors.push('Must start with "LM-"');
    }
    
    // Segment check
    const segments = key.split('-');
    if (segments.length !== 6) {
      errors.push(`Invalid segment count: ${segments.length} (expected 6)`);
    } else {
      // Check each segment length (after LM-)
      for (let i = 1; i < segments.length; i++) {
        if (segments[i].length !== 4) {
          errors.push(`Segment ${i} has invalid length: ${segments[i].length} (expected 4)`);
        }
      }
    }
    
    // Character set check
    const validPattern = /^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/;
    if (!validPattern.test(key)) {
      errors.push('Contains invalid characters (allowed: A-Z, 2-4, 6, 9)');
    }
    
    // Forbidden character check
    const forbiddenChars = key.match(/[01OI578]/g);
    if (forbiddenChars) {
      errors.push(`Contains forbidden characters: ${forbiddenChars.join(', ')} (not allowed: 0,1,O,I,5,7,8)`);
    }
    
    return { valid: errors.length === 0, errors };
  };

  // Generate timestamp-less cryptographically secure product key
  const generateProductKey = (sessionId: string): string => {
    try {
      const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
      
      // Validation checks
      if (!sessionId) {
        throw new Error('Session ID is required for license key generation');
      }
      
      if (!DOWNLOAD_SECRET) {
        throw new Error('VITE_DOWNLOAD_SECRET environment variable is not configured');
      }
      
      if (DOWNLOAD_SECRET.length < 32) {
        throw new Error('VITE_DOWNLOAD_SECRET must be at least 32 characters for security');
      }
      
      // Step 1: Create base hash from session + secret (controllable parameters only)
      const baseInput = `${sessionId}-${DOWNLOAD_SECRET}`;
      const baseHash = CryptoJS.SHA256(baseInput).toString();
      
      // Step 2: Create verification components from base hash (4 chars each for 5 segments)
      // FIXED: Match golang reference implementation segment ordering
      const sessionHash = baseHash.substring(0, 4);
      const verificationHash = baseHash.substring(4, 8);
      const integrityHash = baseHash.substring(8, 12);
      const extraHash = baseHash.substring(12, 16);        // FIXED: Moved to 4th position
      const checksumSeed = baseHash.substring(16, 20);     // FIXED: Moved to 5th position
      
      // Step 3: Generate checksum from all components in correct order
      const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${extraHash}${checksumSeed}`;
      const checksumHash = CryptoJS.SHA256(checksumInput).toString();
      const checksum = checksumHash.substring(0, 4);
      
      // Step 4: Combine into 5-segment format matching golang expectations
      const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();
      
      // Step 5: Filter unwanted characters [01OI578] to match golang expectations
      const filtered = rawKey.replace(/[01OI578]/g, (match) => {
        const replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' };
        return replacements[match] || match;
      });
      
      // Step 6: Validate the generated key
      const validation = validateLicenseKeyFormat(filtered);
      if (!validation.valid) {
        throw new Error(`Generated license key failed validation: ${validation.errors.join(', ')}`);
      }
      
      console.log('✅ License key generated successfully:', {
        sessionId: sessionId.slice(0, 8) + '...',
        keyLength: filtered.length,
        format: 'LM-XXXX-XXXX-XXXX-XXXX-XXXX',
        algorithm: 'deterministic-hash-based-v2-fixed',
        segmentOrder: 'session-verification-integrity-extra-checksum',
        validationStatus: 'PASSED'
      });
      
      return filtered;
      
    } catch (error) {
      console.error('❌ License key generation failed:', error);
      
      // Store error for debugging
      const errorDetails = {
        sessionId: sessionId?.slice(0, 8) + '...' || 'undefined',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Store in session storage for debugging
      sessionStorage.setItem('license_key_generation_error', JSON.stringify(errorDetails));
      
      // Return a fallback error key that will be rejected
      return 'LM-ERROR-ERROR-ERROR-ERROR-ERROR';
    }
  };

  useEffect(() => {
    // Detect user's platform on component mount
    const detectedPlatform = detectUserPlatform();
    setSelectedPlatform(detectedPlatform);

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
      
      // Allow bypass for testing scenarios (dev mode or test session IDs)
      const isTestingScenario = import.meta.env.DEV && (
        sessionId.startsWith('cs_test_') || 
        sessionId === 'cs_test_demo123' ||
        window.location.hostname === 'localhost'
      );
      
      if (!paymentInitiated || !storedTokenData) {
        if (isTestingScenario) {
          console.warn('⚠️ Bypassing payment verification for testing scenario');
          // Set up minimal test data to continue flow
          sessionStorage.setItem('payment_initiated', Date.now().toString());
          localStorage.setItem('payment_token', JSON.stringify({
            timestamp: Date.now(),
            sessionId: sessionId,
            testing: true
          }));
        } else {
          console.error('Payment not initiated from this browser session');
          setIsVerifying(false);
          return;
        }
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
        
        // Payment flow is valid - generate GitHub download URLs for all platforms and product key
        const allDownloadUrls = generateAllDownloadUrls();
        const generatedKey = generateProductKey(sessionId);
        
        // Validate the generated key before using it
        const keyValidation = validateLicenseKeyFormat(generatedKey);
        if (!keyValidation.valid) {
          console.error('❌ Generated license key failed validation:', keyValidation.errors);
          // Store error for support purposes
          sessionStorage.setItem('license_key_validation_error', JSON.stringify({
            sessionId: sessionId.slice(0, 8) + '...',
            generatedKey,
            errors: keyValidation.errors,
            timestamp: new Date().toISOString()
          }));
          setIsVerifying(false);
          return;
        }
        
        setIsVerified(true);
        setDownloadUrls(allDownloadUrls);
        setProductKey(generatedKey);
        
        // Track successful purchase and license key generation in GA4
        trackPurchase(sessionId);
        trackLicenseKeyGenerated(sessionId);
        
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
            // Regenerate GitHub download URLs
            const allUrls = unlocked.downloadUrls || generateAllDownloadUrls();
            setDownloadUrls(allUrls);
            // Restore product key if available, or regenerate if missing
            if (unlocked.productKey) {
              // Validate the stored key
              const storedKeyValidation = validateLicenseKeyFormat(unlocked.productKey);
              if (storedKeyValidation.valid) {
                setProductKey(unlocked.productKey);
              } else {
                console.warn('⚠️ Stored license key is invalid, regenerating...', storedKeyValidation.errors);
                const regeneratedKey = generateProductKey(unlocked.sessionId);
                setProductKey(regeneratedKey);
              }
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

  const handleDownload = async (platform: Platform = selectedPlatform) => {
    const downloadUrl = downloadUrls[platform];
    
    if (!downloadUrl) {
      alert('Download link not available. Please refresh the page and try again.');
      return;
    }
    
    try {
      const platformInfo = getPlatformInfo(platform);
      console.log(`Starting ${platform} download:`, downloadUrl);
      
      // Use GitHub releases URL directly for downloads
      // No CloudFront manipulation needed - GitHub provides reliable CDN
      
      // Track download initiation in GA4
      const sessionId = searchParams.get('session_id') || 'unknown';
      trackDownloadInitiated(platform, downloadUrl, sessionId);
      
      // Create a temporary link element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = platformInfo.filename;
      downloadLink.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log(`${platform} download initiated from GitHub releases`);
      
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
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <em>Local Memory</em> is ready for download to your detected platform
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="-mt-6">
              <div className="space-y-6">
                {/* Main Download Section - Detected Platform */}
                <div className="text-center">
                  {(() => {
                    const detectedInfo = getPlatformInfo(selectedPlatform);
                    return (
                      <div className="p-4 border-1 border-muted-200 rounded-lg bg-muted-50 -mb-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <span className="text-3xl">{detectedInfo.icon}</span>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-foreground">
                                {detectedInfo.label}
                              </h3>
                              {detectedInfo.isRecommended && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                  Detected
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground text-center">
                              {detectedInfo.description}
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleDownload(selectedPlatform)}
                          className="gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                          size="lg"
                        >
                          <Download className="w-5 h-5" />
                          Download for {detectedInfo.label}
                        </Button>
                        
                        <div className="text-sm text-green-700 mt-3">
                          ~{selectedPlatform === 'unknown' ? '22MB' : '13MB'} • Optimized for Your System
                        </div>
                        
                        {/* Warning for Universal Package when selected */}
                        {selectedPlatform === 'unknown' && (
                          <div className="text-left text-xs text-orange-600 mt-3 p-2 bg-orange-50 rounded border border-orange-200">
                            ⚠️ Note: Universal package may cause browser warnings due to multiple executables
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Alternative Options Dropdown */}
                <div className="border-t border-green-200 pt-4">
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setShowAlternatives(!showAlternatives)}
                      className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                      Need a different platform?
                      <ChevronDown className={`w-4 h-4 transition-transform ${showAlternatives ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {showAlternatives && (
                      <div className="mt-4 space-y-2 p-4 border border-gray-200 rounded-lg bg-muted-50">
                        {getAllPlatforms()
                          .filter(p => p.platform !== selectedPlatform)
                          .map((platformInfo) => (
                            <div key={platformInfo.platform} className="space-y-2">
                              <div
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-muted hover:border-gray-300 transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{platformInfo.icon}</span>
                                  <div className="text-left">
                                    <div className="font-medium text-foreground">
                                      {platformInfo.label}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {platformInfo.description}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-green-600">
                                    ~{platformInfo.platform === 'unknown' ? '22MB' : '13MB'}
                                  </div>
                                  <Button onClick={() => handleDownload(platformInfo.platform)} variant="outline" size="sm" className="mt-1">
                                    <Download className="w-3 h-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                              
                            </div>
                          ))}
                      </div>
                    )}
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
                Save this key - you'll need it to activate <em>Local Memory</em>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productKey === 'LM-ERROR-ERROR-ERROR-ERROR-ERROR' ? (
                // Error state - license key generation failed
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg mb-4">
                  <div className="text-center space-y-3">
                    <div className="text-red-600 font-medium">
                      ⚠️ License Key Generation Error
                    </div>
                    <p className="text-sm text-red-700">
                      There was an issue generating your license key. Please try refreshing the page or contact support.
                    </p>
                    <div className="space-y-2">
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        🔄 Refresh Page
                      </Button>
                      <p className="text-xs text-red-600">
                        If this issue persists, please contact support with your session ID: {searchParams.get('session_id')?.slice(0, 12)}...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Normal state - valid license key
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
              )}
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Keep this key safe as it is unique to your purchase</p>
                <p>• You will use this key when setting up <em>Local Memory</em></p>
                <p>• Activate by running this command: /path/to/local-memory license activate {productKey}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-memory-purple/50 mt-6">
            <CardContent className="pt-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Quick Start:</h3>
                
                <PostPurchaseAgentSetup productKey={productKey} />
              </div>

              <div className="text-center mt-6">
                <Badge variant="secondary" className="mb-2">Need Help?</Badge>
                <p className="text-sm text-muted-foreground mb-3">
                  Join our <a href="https://discord.com/channels/894742967728885760/1406058052485906483" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord</a> community for 
                  support and discussion, or check out our comprehensive <a href="/docs" className="text-memory-blue hover:underline">documentation</a> for detailed setup instructions.
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