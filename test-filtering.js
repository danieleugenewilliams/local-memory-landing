import CryptoJS from 'crypto-js';

const DOWNLOAD_SECRET = '9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d';
const sessionId = 'cs_test_a1b5xJCOMXIvJSyQt24jvDnuu2DWEaCYQpzTH5E7AvkvoZPeNFSjWFvnTA';
const paymentTimestamp = 1640995200000; // milliseconds
const timestampInSeconds = Math.floor(paymentTimestamp / 1000);

console.log('=== Testing Different Character Filtering ===');
console.log('Session ID:', sessionId);
console.log('Timestamp:', timestampInSeconds);

// Test both character filtering approaches
const filters = [
  { name: 'Webapp ([01OI])', regex: /[01OI]/g },
  { name: 'Extended ([01OI578])', regex: /[01OI578]/g },
  { name: 'Golang expected (A-Z,2-9)', regex: /[^A-Z2-9]/g }
];

filters.forEach((filter, index) => {
  console.log(`\n--- Test ${index + 1}: ${filter.name} ---`);
  
  const saltSuffix = '';
  const epoch2020 = 1577836800;
  const timestampOffset = timestampInSeconds - epoch2020;
  
  // Generate using webapp algorithm with different filtering
  const sessionData = `${DOWNLOAD_SECRET}:session:${sessionId}${saltSuffix}`;
  const sessionHash = CryptoJS.SHA256(sessionData).toString().toUpperCase().replace(filter.regex, '');
  
  const timestampData = `${DOWNLOAD_SECRET}:timestamp:${timestampOffset}${saltSuffix}`;
  const timestampHash = CryptoJS.SHA256(timestampData).toString().toUpperCase().replace(filter.regex, '');
  
  const verificationData = `${DOWNLOAD_SECRET}:verify:${sessionId}:${timestampInSeconds}${saltSuffix}`;
  const verificationHash = CryptoJS.SHA256(verificationData).toString().toUpperCase().replace(filter.regex, '');
  
  console.log('Session hash length:', sessionHash.length);
  console.log('Timestamp hash length:', timestampHash.length);
  console.log('Verification hash length:', verificationHash.length);
  
  if (sessionHash.length >= 4 && timestampHash.length >= 4 && verificationHash.length >= 8) {
    const sessionChars = sessionHash.slice(0, 4);
    const timestampChars = timestampHash.slice(0, 4);
    const verificationChars = verificationHash.slice(0, 8);
    
    const checksumData = `${sessionChars}:${timestampChars}:${verificationChars}`;
    const checksumHash = CryptoJS.SHA256(checksumData).toString().toUpperCase().replace(filter.regex, '');
    
    if (checksumHash.length >= 4) {
      const checksumChars = checksumHash.slice(0, 4);
      const formattedKey = `LM-${sessionChars}-${timestampChars}-${verificationChars.slice(0, 4)}-${verificationChars.slice(4, 8)}-${checksumChars}`;
      
      console.log('✅ Generated Key:', formattedKey);
      console.log('   Length:', formattedKey.length);
      
      // Analyze characters
      const chars = formattedKey.replace(/[LM-]/g, '').split('').sort();
      const uniqueChars = [...new Set(chars)];
      console.log('   Characters:', uniqueChars.join(', '));
      console.log('   Has invalid chars (5,7,8)?', /[578]/.test(formattedKey));
    } else {
      console.log('❌ Insufficient checksum characters');
    }
  } else {
    console.log('❌ Insufficient characters for key generation');
  }
});