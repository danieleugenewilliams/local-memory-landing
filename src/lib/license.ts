import CryptoJS from "crypto-js";
import { getPlatformInfo, type Platform } from "@/lib/utils";

/** Validate license key format: LM-XXXX-XXXX-XXXX-XXXX-XXXX */
export const validateLicenseKeyFormat = (key: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (key.length !== 27) errors.push(`Invalid length: ${key.length} (expected 27)`);
  if (!key.startsWith("LM-")) errors.push('Must start with "LM-"');
  const segments = key.split("-");
  if (segments.length !== 6) {
    errors.push(`Invalid segment count: ${segments.length} (expected 6)`);
  } else {
    for (let i = 1; i < segments.length; i++) {
      if (segments[i].length !== 4) errors.push(`Segment ${i} has invalid length`);
    }
  }
  const validPattern = /^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/;
  if (!validPattern.test(key)) errors.push("Contains invalid characters");
  const forbiddenChars = key.match(/[01OI578]/g);
  if (forbiddenChars) errors.push(`Contains forbidden characters: ${forbiddenChars.join(", ")}`);
  return { valid: errors.length === 0, errors };
};

/** Generate a deterministic license key from a Stripe session ID */
export const generateLicenseKey = (sessionId: string): string => {
  try {
    const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
    if (!sessionId) throw new Error("Session ID is required");
    if (!DOWNLOAD_SECRET) throw new Error("VITE_DOWNLOAD_SECRET not configured");
    if (DOWNLOAD_SECRET.length < 32) throw new Error("VITE_DOWNLOAD_SECRET must be at least 32 characters");

    const baseInput = `${sessionId}-${DOWNLOAD_SECRET}`;
    const baseHash = CryptoJS.SHA256(baseInput).toString();

    const sessionHash = baseHash.substring(0, 4);
    const verificationHash = baseHash.substring(4, 8);
    const integrityHash = baseHash.substring(8, 12);
    const extraHash = baseHash.substring(12, 16);
    const checksumSeed = baseHash.substring(16, 20);

    const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${extraHash}${checksumSeed}`;
    const checksumHash = CryptoJS.SHA256(checksumInput).toString();
    const checksum = checksumHash.substring(0, 4);

    const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();

    const filtered = rawKey.replace(/[01OI578]/g, (match) => {
      const replacements: Record<string, string> = { "0": "A", "1": "B", O: "C", I: "D", "5": "E", "7": "F", "8": "G" };
      return replacements[match] || match;
    });

    const validation = validateLicenseKeyFormat(filtered);
    if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.join(", ")}`);

    return filtered;
  } catch (error) {
    console.error("License key generation failed:", error);
    return "LM-ERROR-ERROR-ERROR-ERROR-ERROR";
  }
};

/** Get GitHub releases download URL for a specific platform */
export const getGitHubDownloadUrl = (platform: Platform = "macos-arm"): string => {
  const baseUrl = "https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download/";
  const platformInfo = getPlatformInfo(platform);
  const filename = platformInfo.filename;
  return `${baseUrl}${filename}`;
};

/** Generate download URLs for all platforms */
export const generateAllDownloadUrls = (): Record<Platform, string> => {
  const urls: Record<Platform, string> = {} as Record<Platform, string>;
  const platforms: Platform[] = ["macos-arm", "macos-intel", "windows", "linux"];
  for (const platform of platforms) {
    urls[platform] = getGitHubDownloadUrl(platform);
  }
  return urls;
};
