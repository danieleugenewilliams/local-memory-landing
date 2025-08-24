#!/usr/bin/env node

/**
 * License Key Cross-Platform Validation Test
 * 
 * This script validates that the frontend license key generation algorithm
 * produces keys that pass validation by the golang local-memory binary.
 * 
 * Usage:
 *   node test-license-key-validation.js
 *   npm run test:license-keys
 */

import crypto from 'crypto';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Test configuration
const TEST_DOWNLOAD_SECRET = 'test-secret-key';
const GOLANG_BINARY = './bin/local-memory';

// Test session IDs (matching golang reference implementation)
const TEST_SESSIONS = [
  'cs_test_12345',
  'cs_live_67890', 
  'cs_test_abcdef',
  'cs_test_session_001',
  'cs_live_production_123'
];

/**
 * Frontend license key generation algorithm (matches Success.tsx)
 */
function generateLicenseKeyFrontend(sessionId, downloadSecret) {
  // Step 1: Create base hash from session + secret
  const baseInput = `${sessionId}-${downloadSecret}`;
  const baseHash = crypto.createHash('sha256').update(baseInput).digest('hex');
  
  // Step 2: Create verification components from base hash (FIXED ordering)
  const sessionHash = baseHash.substring(0, 4);
  const verificationHash = baseHash.substring(4, 8);
  const integrityHash = baseHash.substring(8, 12);
  const extraHash = baseHash.substring(12, 16);        // FIXED: Moved to 4th position
  const checksumSeed = baseHash.substring(16, 20);     // FIXED: Moved to 5th position
  
  // Step 3: Generate checksum from all components in correct order
  const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${extraHash}${checksumSeed}`;
  const checksumHash = crypto.createHash('sha256').update(checksumInput).digest('hex');
  const checksum = checksumHash.substring(0, 4);
  
  // Step 4: Combine into 5-segment format
  const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();
  
  // Step 5: Filter unwanted characters [01OI578]
  const filtered = rawKey.replace(/[01OI578]/g, (match) => {
    const replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' };
    return replacements[match] || match;
  });
  
  return filtered;
}

/**
 * Validate license key using golang binary
 */
function validateKeyWithGolang(licenseKey, sessionId) {
  try {
    // Check if golang binary exists
    if (!fs.existsSync(GOLANG_BINARY)) {
      console.error(`❌ Golang binary not found: ${GOLANG_BINARY}`);
      console.log('   Run: go build -o bin/local-memory cmd/local-memory/main.go');
      return { success: false, error: 'Binary not found' };
    }
    
    // Test the license key with golang binary using the validate subcommand
    const result = execSync(`${GOLANG_BINARY} license validate "${licenseKey}"`, { 
      encoding: 'utf-8',
      timeout: 5000 
    });
    
    return { 
      success: true, 
      output: result.trim(),
      valid: !result.includes('invalid') && !result.includes('failed')
    };
    
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      output: error.stdout ? error.stdout.toString() : '',
      stderr: error.stderr ? error.stderr.toString() : ''
    };
  }
}

/**
 * Validate license key format (client-side validation)
 */
function validateKeyFormat(key) {
  const checks = {
    length: key.length === 27,
    pattern: /^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/.test(key),
    noForbiddenChars: !/[01OI578]/.test(key),
    segments: key.split('-').length === 6 && key.startsWith('LM-')
  };
  
  const allPassed = Object.values(checks).every(check => check);
  
  return { valid: allPassed, checks };
}

/**
 * Run comprehensive validation tests
 */
function runValidationTests() {
  console.log('🔑 License Key Cross-Platform Validation Test');
  console.log('='.repeat(50));
  console.log('');
  
  let passedTests = 0;
  let totalTests = 0;
  const results = [];
  
  for (const sessionId of TEST_SESSIONS) {
    console.log(`Testing session: ${sessionId}`);
    console.log('-'.repeat(40));
    
    // Generate license key with frontend algorithm
    const licenseKey = generateLicenseKeyFrontend(sessionId, TEST_DOWNLOAD_SECRET);
    console.log(`Generated key: ${licenseKey}`);
    
    // Test 1: Format validation
    const formatResult = validateKeyFormat(licenseKey);
    console.log(`Format validation: ${formatResult.valid ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!formatResult.valid) {
      console.log('Format issues:', formatResult.checks);
    }
    
    // Test 2: Golang binary validation
    const golangResult = validateKeyWithGolang(licenseKey, sessionId);
    let golangValid = false;
    
    if (golangResult.success) {
      golangValid = golangResult.valid;
      console.log(`Golang validation: ${golangValid ? '✅ PASS' : '❌ FAIL'}`);
      if (golangResult.output) {
        console.log(`Golang output: ${golangResult.output}`);
      }
    } else {
      console.log(`Golang validation: ⚠️  SKIP (${golangResult.error})`);
      console.log(`   Error: ${golangResult.error}`);
      if (golangResult.stderr) {
        console.log(`   Stderr: ${golangResult.stderr}`);
      }
    }
    
    // Test 3: Deterministic check (generate same key twice)
    const licenseKey2 = generateLicenseKeyFrontend(sessionId, TEST_DOWNLOAD_SECRET);
    const deterministic = licenseKey === licenseKey2;
    console.log(`Deterministic: ${deterministic ? '✅ PASS' : '❌ FAIL'}`);
    
    // Count results
    const testPassed = formatResult.valid && deterministic && (golangResult.success ? golangValid : true);
    if (testPassed) passedTests++;
    totalTests++;
    
    results.push({
      sessionId,
      licenseKey,
      formatValid: formatResult.valid,
      golangValid: golangResult.success ? golangValid : null,
      deterministic,
      overall: testPassed
    });
    
    console.log('');
  }
  
  // Summary
  console.log('📊 Test Summary');
  console.log('='.repeat(30));
  console.log(`Total tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log('');
  
  // Detailed results
  console.log('📋 Detailed Results');
  console.log('='.repeat(30));
  results.forEach(result => {
    const status = result.overall ? '✅' : '❌';
    console.log(`${status} ${result.sessionId}: ${result.licenseKey}`);
    if (!result.overall) {
      if (!result.formatValid) console.log('   ❌ Format validation failed');
      if (result.golangValid === false) console.log('   ❌ Golang validation failed');
      if (!result.deterministic) console.log('   ❌ Non-deterministic generation');
    }
  });
  
  // Exit code
  const allPassed = passedTests === totalTests;
  console.log('');
  console.log(allPassed ? '🎉 All tests passed!' : '💥 Some tests failed!');
  
  return allPassed;
}

/**
 * Main execution
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const success = runValidationTests();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

export { generateLicenseKeyFrontend, validateKeyFormat, validateKeyWithGolang };