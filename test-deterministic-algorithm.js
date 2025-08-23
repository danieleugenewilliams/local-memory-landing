import crypto from 'crypto';

// Timestamp-less license key generation
// Uses only: sessionId + DOWNLOAD_SECRET (controllable parameters)
function generateLicenseKey(sessionId, downloadSecret) {
  // Step 1: Create base hash from session + secret
  const baseInput = `${sessionId}-${downloadSecret}`;
  const baseHash = crypto.createHash('sha256').update(baseInput).digest('hex');
  
  // Step 2: Create verification components from base hash (4 chars each)
  const sessionHash = baseHash.substring(0, 4);
  const verificationHash = baseHash.substring(4, 8);
  const integrityHash = baseHash.substring(8, 12);
  const checksumSeed = baseHash.substring(12, 16);
  
  // Step 3: Generate checksum from all components
  const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${checksumSeed}`;
  const checksumHash = crypto.createHash('sha256').update(checksumInput).digest('hex');
  const checksum = checksumHash.substring(0, 4);
  
  // Step 4: Combine into 5-segment format
  const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${checksum}`.toUpperCase();
  
  // Step 5: Filter unwanted characters [01OI578]
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

// Test with various session IDs to ensure deterministic results
const secret = 'test-secret-key';
const testSessions = [
  'cs_test_12345',
  'cs_live_67890',
  'cs_test_abcdef',
  'session_123',
  'test_session'
];

console.log('=== DETERMINISTIC LICENSE KEY GENERATION ===\n');

testSessions.forEach(sessionId => {
  const key1 = generateLicenseKey(sessionId, secret);
  const key2 = generateLicenseKey(sessionId, secret); // Should be identical
  
  console.log(`Deterministic check: ${key1 === key2 ? 'PASS' : 'FAIL'}`);
  console.log(`Format check: ${key1.match(/^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/) ? 'PASS' : 'FAIL'}`);
  console.log(`Character filter check: ${/[01OI578]/.test(key1) ? 'FAIL' : 'PASS'}`);
  console.log(`Length check: ${key1.length === 23 ? 'PASS' : 'FAIL'}`);
  console.log('========================================\n');
});