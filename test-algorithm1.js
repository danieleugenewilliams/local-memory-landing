import CryptoJS from 'crypto-js';

// Test Algorithm 1 - Simple algorithm that matches golang
const DOWNLOAD_SECRET = '9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d';
const sessionId = 'cs_test_a1b5xJCOMXIvJSyQt24jvDnuu2DWEaCYQpzTH5E7AvkvoZPeNFSjWFvnTA';
const timestampInSeconds = 1640995200;

console.log('=== Algorithm 1 - Simple Key Generation (4 segments) ===');
console.log('Session ID:', sessionId);
console.log('Timestamp:', timestampInSeconds);

for (let attemptCount = 0; attemptCount < 3; attemptCount++) {
  // Build hash input
  let hashInput;
  if (attemptCount === 0) {
    hashInput = `${DOWNLOAD_SECRET}:product-key:${sessionId}:${timestampInSeconds}`;
  } else {
    hashInput = `${DOWNLOAD_SECRET}:product-key:${sessionId}:${timestampInSeconds}:retry:${attemptCount}`;
  }
  
  console.log(`\nAttempt ${attemptCount + 1}:`);
  console.log('Hash input:', hashInput);
  
  // Generate hash and filter (remove 0, 1, O, I only)
  const hash = CryptoJS.SHA256(hashInput).toString().toUpperCase();
  const filtered = hash.replace(/[01OI]/g, '');
  
  console.log('Hash (first 32):', hash.slice(0, 32) + '...');
  console.log('Filtered (first 32):', filtered.slice(0, 32) + '...');
  console.log('Filtered length:', filtered.length);
  
  if (filtered.length >= 16) {
    const keyPart = filtered.substring(0, 16);
    const formattedKey = `LM-${keyPart.substring(0, 4)}-${keyPart.substring(4, 8)}-${keyPart.substring(8, 12)}-${keyPart.substring(12, 16)}`;
    
    console.log('✅ SUCCESS!');
    console.log('Generated Key:', formattedKey);
    console.log('Key Length:', formattedKey.length);
    console.log('Format: 4 segments (LM-XXXX-XXXX-XXXX-XXXX)');
    
    const chars = formattedKey.replace(/[LM-]/g, '').split('').sort();
    const uniqueChars = [...new Set(chars)];
    console.log('Characters used:', uniqueChars.join(', '));
    break;
  } else {
    console.log('❌ Insufficient characters, trying next attempt...');
  }
}