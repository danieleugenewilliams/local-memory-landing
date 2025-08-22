import CryptoJS from 'crypto-js';

const DOWNLOAD_SECRET = 'test-secret-for-development-only-do-not-use-in-production-this-must-be-64-chars';
const sessionId = 'cs_test_abc123def456';
const paymentTimestamp = 1640995200000; // milliseconds

// Convert timestamp to seconds
const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;

let attemptCount = 0;
const saltSuffix = attemptCount > 0 ? `:retry:${attemptCount}` : '';

// Step 1: Generate session ID hash (4 chars)
const sessionData = `${DOWNLOAD_SECRET}:session:${sessionId}${saltSuffix}`;
const sessionHash = CryptoJS.SHA256(sessionData).toString().toUpperCase().replace(/[01OI]/g, '');

// Step 2: Generate timestamp encoding (4 chars) 
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

const sessionChars = sessionHash.slice(0, 4);
const timestampChars = timestampHash.slice(0, 4);
const verificationChars = verificationHash.slice(0, 8);
const checksumChars = checksumHash.slice(0, 4);

// Format as LM-XXXX-XXXX-XXXX-XXXX-XXXX (self-contained)
const formattedKey = `LM-${sessionChars}-${timestampChars}-${verificationChars.slice(0, 4)}-${verificationChars.slice(4, 8)}-${checksumChars}`;

console.log('=== Self-Contained Key Generation Test ===');
console.log('Session ID:', sessionId);
console.log('Timestamp (seconds):', timestampInSeconds);
console.log('Timestamp Offset:', timestampOffset);
console.log('');
console.log('Generated Key:', formattedKey);
console.log('Key Length:', formattedKey.length);
console.log('');
console.log('Key Structure:');
console.log('  LM-' + sessionChars + ' (session hash)');
console.log('     ' + timestampChars + ' (timestamp hash)');
console.log('     ' + verificationChars.slice(0, 4) + ' (verification 1)');
console.log('     ' + verificationChars.slice(4, 8) + ' (verification 2)');
console.log('     ' + checksumChars + ' (checksum)');
console.log('');
console.log('Verification Data:');
console.log('  Session Hash Length:', sessionHash.length, '(need 4)');
console.log('  Timestamp Hash Length:', timestampHash.length, '(need 4)');
console.log('  Verification Hash Length:', verificationHash.length, '(need 8)');
console.log('  Checksum Hash Length:', checksumHash.length, '(need 4)');