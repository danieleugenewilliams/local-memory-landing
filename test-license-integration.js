#!/usr/bin/env node

/**
 * End-to-End License Key Integration Test Suite
 * 
 * This test suite validates that the webapp license key generation
 * is fully compatible with the golang license validation system.
 * 
 * Tests cover:
 * - Key generation consistency
 * - Character filtering edge cases  
 * - Salt retry mechanism
 * - Security pattern validation
 * - Performance benchmarks
 */

import CryptoJS from 'crypto-js';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

const DOWNLOAD_SECRET = process.env.VITE_DOWNLOAD_SECRET || 'test-secret-for-development-only-do-not-use-in-production-this-must-be-64-chars';
const GOLANG_BINARY = process.env.GOLANG_BINARY || '../local-memory-golang/bin/local-memory';

// Match the exact webapp algorithm
function generateProductKey(sessionId, paymentTimestamp) {
  const timestampInSeconds = paymentTimestamp > 1000000000000 ? Math.floor(paymentTimestamp / 1000) : paymentTimestamp;
  
  let attemptCount = 0;
  const maxAttempts = 10;
  
  while (attemptCount < maxAttempts) {
    const saltSuffix = attemptCount > 0 ? `:retry:${attemptCount}` : '';
    const data = `${DOWNLOAD_SECRET}:product-key:${sessionId}:${timestampInSeconds}${saltSuffix}`;
    const hash = CryptoJS.SHA256(data).toString();
    
    const cleanHash = hash.toUpperCase().replace(/[01OI]/g, '');
    
    if (cleanHash.length >= 16) {
      const keyChars = cleanHash.slice(0, 16);
      const formattedKey = `LM-${keyChars.slice(0, 4)}-${keyChars.slice(4, 8)}-${keyChars.slice(8, 12)}-${keyChars.slice(12, 16)}`;
      
      return {
        key: formattedKey,
        attemptCount,
        cleanHashLength: cleanHash.length,
        data,
        hash: hash.slice(0, 16) + '...'
      };
    }
    
    attemptCount++;
  }
  
  throw new Error('Unable to generate secure product key after 10 attempts');
}

// Test golang validation via CLI
async function validateKeyWithGolang(key, sessionId = null, timestamp = null) {
  return new Promise((resolve) => {
    const args = ['license', 'validate', key];
    if (sessionId && timestamp) {
      args.push(sessionId, timestamp.toString());
    }
    
    const child = spawn(GOLANG_BINARY, args, {
      env: { ...process.env, DOWNLOAD_SECRET },
      stdio: 'pipe'
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => stdout += data.toString());
    child.stderr.on('data', (data) => stderr += data.toString());
    
    child.on('close', (code) => {
      resolve({
        valid: code === 0,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode: code
      });
    });
    
    // Set timeout for validation
    setTimeout(() => {
      child.kill();
      resolve({
        valid: false,
        stdout: '',
        stderr: 'Timeout',
        exitCode: -1
      });
    }, 5000);
  });
}

// Test data sets
const testCases = [
  {
    name: 'Standard Stripe Session',
    sessionId: 'cs_test_1234567890abcdef',
    timestamp: 1703980800000,
    expectValid: true
  },
  {
    name: 'High Character Density (potential filtering issues)',
    sessionId: 'cs_test_000111OOOIIIabcdef',
    timestamp: 1000000000001,
    expectValid: true
  },
  {
    name: 'Edge Case Timestamp',
    sessionId: 'cs_test_edge_case_session',
    timestamp: 999999999999,
    expectValid: true
  },
  {
    name: 'Complex Session ID',
    sessionId: 'cs_test_b39c1b01-e1e0-4a1a-9b0c-1234567890ab',
    timestamp: 1703980800,
    expectValid: true
  },
  {
    name: 'Recent Production-Like',
    sessionId: 'cs_live_51234567890abcdef',
    timestamp: Date.now() - 60000,
    expectValid: true
  }
];

// Security test cases (should be rejected)
const securityTestCases = [
  'LM-ABCD-EFGH-2345-6789',
  'LM-2222-3333-4444-5555',
  'LM-TEST-DEMO-FAKE-NULL',
  'LM-QWER-ASDF-HJKL-ZXCV',
  'LM-A2A2-Z9Z9-2A2A-9Z9Z'
];

// Performance test configuration
const performanceTestCount = 100;

console.log('🔧 End-to-End License Key Integration Test Suite');
console.log('=' .repeat(60));

async function runTests() {
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];
  
  // Test 1: Basic Generation and Validation
  console.log('\n📊 Test 1: Basic Key Generation and Validation');
  console.log('-'.repeat(50));
  
  for (const testCase of testCases) {
    totalTests++;
    
    try {
      console.log(`\nTesting: ${testCase.name}`);
      console.log(`Session ID: ${testCase.sessionId}`);
      console.log(`Timestamp: ${testCase.timestamp}`);
      
      // Generate key using webapp algorithm
      const result = generateProductKey(testCase.sessionId, testCase.timestamp);
      console.log(`Generated Key: ${result.key}`);
      console.log(`Attempt Count: ${result.attemptCount}`);
      console.log(`Clean Hash Length: ${result.cleanHashLength}`);
      
      // Validate with golang (format only)
      const formatValidation = await validateKeyWithGolang(result.key);
      console.log(`Format Validation: ${formatValidation.valid ? '✅ PASS' : '❌ FAIL'}`);
      
      // Validate with golang (crypto verification)
      const cryptoValidation = await validateKeyWithGolang(
        result.key, 
        testCase.sessionId, 
        testCase.timestamp
      );
      console.log(`Crypto Validation: ${cryptoValidation.valid ? '✅ PASS' : '❌ FAIL'}`);
      
      if (formatValidation.valid && cryptoValidation.valid === testCase.expectValid) {
        passedTests++;
        console.log(`Result: ✅ PASS`);
      } else {
        failedTests.push({
          name: testCase.name,
          expected: testCase.expectValid,
          formatResult: formatValidation.valid,
          cryptoResult: cryptoValidation.valid,
          details: { formatValidation, cryptoValidation }
        });
        console.log(`Result: ❌ FAIL`);
      }
      
    } catch (error) {
      totalTests++;
      failedTests.push({
        name: testCase.name,
        error: error.message
      });
      console.log(`Result: ❌ ERROR - ${error.message}`);
    }
  }
  
  // Test 2: Security Pattern Rejection
  console.log('\n🔒 Test 2: Security Pattern Rejection');
  console.log('-'.repeat(50));
  
  for (const fakeKey of securityTestCases) {
    totalTests++;
    
    console.log(`\nTesting Security: ${fakeKey}`);
    const validation = await validateKeyWithGolang(fakeKey);
    
    if (!validation.valid) {
      passedTests++;
      console.log(`Result: ✅ PASS (correctly rejected)`);
    } else {
      failedTests.push({
        name: `Security Test: ${fakeKey}`,
        expected: false,
        actual: true,
        details: validation
      });
      console.log(`Result: ❌ FAIL (should have been rejected)`);
    }
  }
  
  // Test 3: Character Filtering Edge Cases
  console.log('\n⚡ Test 3: Character Filtering Edge Cases');
  console.log('-'.repeat(50));
  
  // Generate keys that might trigger retry mechanism
  const edgeCases = [
    'session_with_lots_of_0000000000',
    'session_OOOOOOOOOOOOOOOOO',
    'session_1111111111111111',
    'session_IIIIIIIIIIIIIIIII'
  ];
  
  for (const sessionId of edgeCases) {
    totalTests++;
    
    try {
      console.log(`\nTesting Edge Case: ${sessionId}`);
      const result = generateProductKey(sessionId, 1703980800000);
      
      console.log(`Generated Key: ${result.key}`);
      console.log(`Required Attempts: ${result.attemptCount}`);
      
      if (result.key.length === 19 && result.key.startsWith('LM-')) {
        passedTests++;
        console.log(`Result: ✅ PASS`);
      } else {
        failedTests.push({
          name: `Edge Case: ${sessionId}`,
          issue: 'Invalid key format',
          result
        });
        console.log(`Result: ❌ FAIL`);
      }
      
    } catch (error) {
      failedTests.push({
        name: `Edge Case: ${sessionId}`,
        error: error.message
      });
      console.log(`Result: ❌ ERROR - ${error.message}`);
    }
  }
  
  // Test 4: Performance Benchmark
  console.log('\n⚡ Test 4: Performance Benchmark');
  console.log('-'.repeat(50));
  
  console.log(`Generating ${performanceTestCount} keys for performance analysis...`);
  
  const startTime = Date.now();
  const generationTimes = [];
  const validationTimes = [];
  
  for (let i = 0; i < performanceTestCount; i++) {
    const sessionId = `cs_test_perf_${i}_${Math.random().toString(36).substring(7)}`;
    const timestamp = Date.now() - Math.random() * 86400000;
    
    // Time key generation
    const genStart = Date.now();
    const result = generateProductKey(sessionId, timestamp);
    const genTime = Date.now() - genStart;
    generationTimes.push(genTime);
    
    // Time validation
    const valStart = Date.now();
    await validateKeyWithGolang(result.key);
    const valTime = Date.now() - valStart;
    validationTimes.push(valTime);
  }
  
  const totalTime = Date.now() - startTime;
  const avgGenTime = generationTimes.reduce((a, b) => a + b, 0) / generationTimes.length;
  const avgValTime = validationTimes.reduce((a, b) => a + b, 0) / validationTimes.length;
  
  console.log(`\nPerformance Results:`);
  console.log(`Total Time: ${totalTime}ms`);
  console.log(`Average Generation Time: ${avgGenTime.toFixed(2)}ms`);
  console.log(`Average Validation Time: ${avgValTime.toFixed(2)}ms`);
  console.log(`Keys/Second: ${((performanceTestCount / totalTime) * 1000).toFixed(2)}`);
  
  // Final Results
  console.log('\n📊 Final Test Results');
  console.log('='.repeat(60));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  console.log(`Failed: ${failedTests.length}`);
  
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests:');
    failedTests.forEach((test, i) => {
      console.log(`${i+1}. ${test.name}`);
      if (test.error) console.log(`   Error: ${test.error}`);
      if (test.expected !== undefined) console.log(`   Expected: ${test.expected}, Got: ${test.actual || test.formatResult || test.cryptoResult}`);
    });
  }
  
  console.log(`\n${passedTests === totalTests ? '🎉 ALL TESTS PASSED!' : '⚠️  SOME TESTS FAILED'}`);
  
  return {
    totalTests,
    passedTests,
    failedTests,
    performanceMetrics: {
      avgGenTime,
      avgValTime,
      keysPerSecond: (performanceTestCount / totalTime) * 1000
    }
  };
}

// Run the test suite
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests, generateProductKey, validateKeyWithGolang };