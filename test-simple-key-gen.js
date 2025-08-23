import CryptoJS from 'crypto-js';

// Match the golang algorithm exactly
const DOWNLOAD_SECRET = '9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d';
const sessionId = 'cs_test_a1b5xJCOMXIvJSyQt24jvDnuu2DWEaCYQpzTH5E7AvkvoZPeNFSjWFvnTA';
const paymentTimestamp = 1640995200000; // Use consistent timestamp

// Convert timestamp to seconds
const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;

// Use the EXACT golang algorithm from memory
const data = `${DOWNLOAD_SECRET}:product-key:${sessionId}:${timestampInSeconds}`;
const hash = CryptoJS.SHA256(data).toString();
const cleanHash = hash.toUpperCase().replace(/[01OI578]/g, ''); // Fixed character filtering

// Take first 20 characters for 5 segments of 4 chars each
if (cleanHash.length >= 20) {
  const keyChars = cleanHash.slice(0, 20);
  const formattedKey = `LM-${keyChars.slice(0, 4)}-${keyChars.slice(4, 8)}-${keyChars.slice(8, 12)}-${keyChars.slice(12, 16)}-${keyChars.slice(16, 20)}`;
  
  console.log('=== Golang-Compatible Key Generation ===');
  console.log('Session ID:', sessionId);
  console.log('Timestamp (seconds):', timestampInSeconds);
  console.log('Data string:', data);
  console.log('Hash (first 32 chars):', hash.slice(0, 32) + '...');
  console.log('Clean hash (first 32 chars):', cleanHash.slice(0, 32) + '...');
  console.log('Generated Key:', formattedKey);
  console.log('Key Length:', formattedKey.length);
  console.log('');
  console.log('Character Analysis:');
  const chars = formattedKey.replace(/[LM-]/g, '').split('').sort();
  const uniqueChars = [...new Set(chars)];
  console.log('Characters used:', uniqueChars.join(', '));
  console.log('Contains 5,7,8?', /[578]/.test(formattedKey));
} else {
  console.log('ERROR: Insufficient characters after filtering');
  console.log('Clean hash length:', cleanHash.length);
  console.log('Need at least 20 characters');
}