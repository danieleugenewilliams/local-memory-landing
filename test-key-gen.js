import CryptoJS from 'crypto-js';

const DOWNLOAD_SECRET = 'test-secret-for-development-only-do-not-use-in-production-this-must-be-64-chars';
const sessionId = 'cs_test_abc123def456';
const timestamp = 1640995200;

const data = `${DOWNLOAD_SECRET}:product-key:${sessionId}:${timestamp}`;
const hash = CryptoJS.SHA256(data).toString();
const cleanHash = hash.toUpperCase().replace(/[01OI]/g, '');
const keyChars = cleanHash.slice(0, 16);
const formattedKey = `LM-${keyChars.slice(0, 4)}-${keyChars.slice(4, 8)}-${keyChars.slice(8, 12)}-${keyChars.slice(12, 16)}`;

console.log('Generated key:', formattedKey);
console.log('Hash:', hash.slice(0, 32), '...');
console.log('Clean hash length:', cleanHash.length);
console.log('Data input:', data);