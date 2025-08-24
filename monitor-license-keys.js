#!/usr/bin/env node

/**
 * License Key Generation Monitoring Script
 * 
 * This script monitors the health of license key generation and can be used
 * for alerting when issues occur. It runs continuous checks and reports metrics.
 * 
 * Usage:
 *   node monitor-license-keys.js [--interval=30] [--alert-threshold=0.95]
 *   npm run monitor:license-keys
 */

import { generateLicenseKeyFrontend, validateKeyFormat } from './test-license-key-validation.js';

// Configuration
const DEFAULT_INTERVAL_SECONDS = 30;
const DEFAULT_ALERT_THRESHOLD = 0.95; // 95% success rate required
const TEST_DOWNLOAD_SECRET = 'test-secret-key';

// Test session pool for monitoring
const TEST_SESSIONS = [
  'cs_monitor_001',
  'cs_monitor_002', 
  'cs_monitor_003',
  'cs_monitor_004',
  'cs_monitor_005'
];

// Metrics storage
let metrics = {
  totalTests: 0,
  successfulTests: 0,
  failedTests: 0,
  errorTypes: {},
  lastSuccessTime: null,
  lastFailureTime: null,
  startTime: new Date(),
  uptime: 0
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  let interval = DEFAULT_INTERVAL_SECONDS;
  let alertThreshold = DEFAULT_ALERT_THRESHOLD;
  
  args.forEach(arg => {
    if (arg.startsWith('--interval=')) {
      interval = parseInt(arg.split('=')[1]) || DEFAULT_INTERVAL_SECONDS;
    } else if (arg.startsWith('--alert-threshold=')) {
      alertThreshold = parseFloat(arg.split('=')[1]) || DEFAULT_ALERT_THRESHOLD;
    }
  });
  
  return { interval, alertThreshold };
}

/**
 * Run a single license key generation test
 */
function runSingleTest(sessionId) {
  try {
    const startTime = Date.now();
    
    // Generate license key
    const licenseKey = generateLicenseKeyFrontend(sessionId, TEST_DOWNLOAD_SECRET);
    
    // Validate format
    const formatValidation = validateKeyFormat(licenseKey);
    
    // Check deterministic behavior
    const licenseKey2 = generateLicenseKeyFrontend(sessionId, TEST_DOWNLOAD_SECRET);
    const isDeterministic = licenseKey === licenseKey2;
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const result = {
      sessionId,
      licenseKey,
      success: formatValidation.valid && isDeterministic,
      formatValid: formatValidation.valid,
      deterministic: isDeterministic,
      duration,
      errors: formatValidation.errors,
      timestamp: new Date().toISOString()
    };
    
    return result;
    
  } catch (error) {
    return {
      sessionId,
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Run monitoring tests for all sessions
 */
function runMonitoringTests() {
  console.log(`🔍 Running license key monitoring tests... (${new Date().toLocaleTimeString()})`);
  
  const results = TEST_SESSIONS.map(runSingleTest);
  
  // Update metrics
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  metrics.totalTests += results.length;
  metrics.successfulTests += successful;
  metrics.failedTests += failed;
  
  if (successful > 0) {
    metrics.lastSuccessTime = new Date();
  }
  
  if (failed > 0) {
    metrics.lastFailureTime = new Date();
    
    // Track error types
    results.filter(r => !r.success).forEach(result => {
      const errorKey = result.error || 'validation_failed';
      metrics.errorTypes[errorKey] = (metrics.errorTypes[errorKey] || 0) + 1;
    });
  }
  
  // Calculate success rate
  const successRate = metrics.totalTests > 0 ? metrics.successfulTests / metrics.totalTests : 0;
  
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`📊 Overall Success Rate: ${(successRate * 100).toFixed(2)}%`);
  
  // Show recent failures
  const failures = results.filter(r => !r.success);
  if (failures.length > 0) {
    console.log('❌ Recent Failures:');
    failures.forEach(failure => {
      console.log(`   ${failure.sessionId}: ${failure.error || 'Format/deterministic validation failed'}`);
    });
  }
  
  return { results, successRate };
}

/**
 * Check if alerting is needed based on success rate
 */
async function checkAlertConditions(successRate, threshold) {
  if (successRate < threshold) {
    const alertMessage = {
      level: 'CRITICAL',
      message: `License key generation success rate (${(successRate * 100).toFixed(2)}%) is below threshold (${(threshold * 100).toFixed(2)}%)`,
      metrics: {
        successRate,
        totalTests: metrics.totalTests,
        failedTests: metrics.failedTests,
        lastFailureTime: metrics.lastFailureTime,
        errorTypes: metrics.errorTypes
      },
      timestamp: new Date().toISOString()
    };
    
    console.error('🚨 ALERT:', JSON.stringify(alertMessage, null, 2));
    
    // Write alert to file for external monitoring
    try {
      const fs = await import('fs');
      fs.default.appendFileSync('./license-key-alerts.log', 
        JSON.stringify(alertMessage) + '\\n'
      );
    } catch (error) {
      console.error('Failed to write alert to log file:', error.message);
    }
    
    return true;
  }
  
  return false;
}

/**
 * Display comprehensive status report
 */
function displayStatusReport() {
  const uptime = Math.floor((Date.now() - metrics.startTime.getTime()) / 1000);
  const successRate = metrics.totalTests > 0 ? metrics.successfulTests / metrics.totalTests : 0;
  
  console.log('');
  console.log('📊 LICENSE KEY GENERATION STATUS REPORT');
  console.log('='.repeat(50));
  console.log(`Uptime: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`);
  console.log(`Total Tests: ${metrics.totalTests}`);
  console.log(`Successful: ${metrics.successfulTests}`);
  console.log(`Failed: ${metrics.failedTests}`);
  console.log(`Success Rate: ${(successRate * 100).toFixed(2)}%`);
  console.log(`Last Success: ${metrics.lastSuccessTime?.toLocaleString() || 'Never'}`);
  console.log(`Last Failure: ${metrics.lastFailureTime?.toLocaleString() || 'Never'}`);
  
  if (Object.keys(metrics.errorTypes).length > 0) {
    console.log('');
    console.log('Error Types:');
    Object.entries(metrics.errorTypes).forEach(([error, count]) => {
      console.log(`  ${error}: ${count}`);
    });
  }
  
  console.log('');
}

/**
 * Main monitoring loop
 */
async function startMonitoring(interval, alertThreshold) {
  console.log('🚀 Starting License Key Generation Monitoring');
  console.log(`   Interval: ${interval} seconds`);
  console.log(`   Alert Threshold: ${(alertThreshold * 100).toFixed(2)}%`);
  console.log(`   Test Sessions: ${TEST_SESSIONS.length}`);
  console.log('');
  
  // Initial test
  const { successRate } = runMonitoringTests();
  await checkAlertConditions(successRate, alertThreshold);
  
  // Set up periodic monitoring
  const monitoringInterval = setInterval(async () => {
    try {
      const { successRate } = runMonitoringTests();
      await checkAlertConditions(successRate, alertThreshold);
      
      // Show status report every 10 cycles
      if (metrics.totalTests % (TEST_SESSIONS.length * 10) === 0) {
        displayStatusReport();
      }
      
    } catch (error) {
      console.error('❌ Monitoring cycle failed:', error.message);
      metrics.failedTests += TEST_SESSIONS.length; // Assume all failed
      metrics.totalTests += TEST_SESSIONS.length;
      metrics.lastFailureTime = new Date();
    }
  }, interval * 1000);
  
  // Graceful shutdown handling
  process.on('SIGINT', () => {
    console.log('');
    console.log('🛑 Shutting down monitoring...');
    clearInterval(monitoringInterval);
    displayStatusReport();
    console.log('Monitoring stopped.');
    process.exit(0);
  });
  
  // Keep process alive
  process.stdin.resume();
}

/**
 * Main execution
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { interval, alertThreshold } = parseArgs();
    await startMonitoring(interval, alertThreshold);
  } catch (error) {
    console.error('❌ Monitoring startup failed:', error.message);
    process.exit(1);
  }
}

export { runSingleTest, runMonitoringTests, checkAlertConditions };