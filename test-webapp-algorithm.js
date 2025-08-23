import CryptoJS from 'crypto-js';

// Test the new timestamp-less algorithm that matches webapp implementation
function generateProductKey(sessionId) {
  const DOWNLOAD_SECRET = 'test-secret-key';
  
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
  
  console.log(`Session: ${sessionId}`);
  console.log(`Raw key: ${rawKey}`);
  console.log(`Filtered: ${filtered}`);
  console.log(`Length: ${filtered.length}`);
  console.log('---');
  
  return filtered;
}

// Test with various session IDs
const testSessions = [
  'cs_test_12345',
  'cs_live_67890', 
  'cs_test_abcdef'
];

console.log('=== WEBAPP TIMESTAMP-LESS ALGORITHM TEST ===\n');

testSessions.forEach(sessionId => {
  const key1 = generateProductKey(sessionId);
  const key2 = generateProductKey(sessionId); // Should be identical
  
  console.log(`Deterministic check: ${key1 === key2 ? 'PASS' : 'FAIL'}`);
  console.log(`Format check: ${key1.match(/^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/) ? 'PASS' : 'FAIL'}`);
  console.log(`Character filter check: ${/[01OI578]/.test(key1) ? 'FAIL' : 'PASS'}`);
  console.log(`Length check: ${key1.length === 27 ? 'PASS' : 'FAIL'}`);
  console.log('========================================\n');
});