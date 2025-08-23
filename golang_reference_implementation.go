package main

import (
	"crypto/sha256"
	"fmt"
	"regexp"
	"strings"
)

// generateTimestamplessKey generates a license key using only sessionId and secret
func generateTimestamplessKey(sessionId, downloadSecret string) string {
	// Step 1: Create base hash from session + secret
	baseInput := sessionId + "-" + downloadSecret
	baseHashBytes := sha256.Sum256([]byte(baseInput))
	baseHash := fmt.Sprintf("%x", baseHashBytes)

	// Step 2: Extract 5 components (4 chars each)
	sessionHash := baseHash[0:4]
	verificationHash := baseHash[4:8]
	integrityHash := baseHash[8:12]
	extraHash := baseHash[12:16]
	checksumSeed := baseHash[16:20]

	// Step 3: Generate checksum
	checksumInput := sessionHash + verificationHash + integrityHash + extraHash + checksumSeed
	checksumHashBytes := sha256.Sum256([]byte(checksumInput))
	checksumHash := fmt.Sprintf("%x", checksumHashBytes)
	checksum := checksumHash[0:4]

	// Step 4: Assemble raw key
	rawKey := "LM-" + sessionHash + "-" + verificationHash + "-" + integrityHash + "-" + extraHash + "-" + checksum
	rawKey = strings.ToUpper(rawKey)

	// Step 5: Character filtering
	filtered := filterForbiddenChars(rawKey)

	return filtered
}

// filterForbiddenChars replaces [01OI578] with [ABCDEFG] respectively
func filterForbiddenChars(key string) string {
	replacements := map[rune]rune{
		'0': 'A',
		'1': 'B',
		'O': 'C',
		'I': 'D',
		'5': 'E',
		'7': 'F',
		'8': 'G',
	}

	result := make([]rune, len(key))
	for i, char := range key {
		if replacement, exists := replacements[char]; exists {
			result[i] = replacement
		} else {
			result[i] = char
		}
	}

	return string(result)
}

// validateLicenseKeyFormat checks if key matches expected format
func validateLicenseKeyFormat(key string) bool {
	// Check length
	if len(key) != 27 {
		return false
	}

	// Check pattern: LM-XXXX-XXXX-XXXX-XXXX-XXXX
	pattern := `^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$`
	matched, _ := regexp.MatchString(pattern, key)
	if !matched {
		return false
	}

	// Check for forbidden characters
	forbiddenPattern := `[01OI578]`
	hasForbidden, _ := regexp.MatchString(forbiddenPattern, key)
	if hasForbidden {
		return false
	}

	return true
}

// validateLicenseKeyCrypto performs cryptographic validation
func validateLicenseKeyCrypto(key, sessionId, downloadSecret string) bool {
	// Generate expected key with same inputs
	expectedKey := generateTimestamplessKey(sessionId, downloadSecret)

	// Compare with provided key
	return key == expectedKey
}

// validateLicenseKey performs complete validation (format + crypto)
func validateLicenseKey(key, sessionId, downloadSecret string) (bool, string) {
	// Step 1: Format validation
	if !validateLicenseKeyFormat(key) {
		return false, "format validation failed"
	}

	// Step 2: Cryptographic validation
	if !validateLicenseKeyCrypto(key, sessionId, downloadSecret) {
		return false, "cryptographic validation failed"
	}

	return true, "validation successful"
}

func main() {
	// Test cases
	testCases := []struct {
		sessionId string
		secret    string
		expected  string
	}{
		{"cs_test_12345", "test-secret-key", "LM-EB2B-6DAD-E6BB-AGE2-C9D2"},
		{"cs_live_67890", "test-secret-key", "LM-CACE-9FCB-GGFF-BAFF-FBCA"},
		{"cs_test_abcdef", "test-secret-key", "LM-F2A4-ADEA-DFEB-2FCB-4EDE"},
	}

	fmt.Println("=== GOLANG TIMESTAMP-LESS ALGORITHM TEST ===\n")

	for _, tc := range testCases {
		generated := generateTimestamplessKey(tc.sessionId, tc.secret)

		fmt.Printf("Session: %s\n", tc.sessionId)
		fmt.Printf("Generated: %s\n", generated)
		fmt.Printf("Expected:  %s\n", tc.expected)
		fmt.Printf("Match: %t\n", generated == tc.expected)

		// Test validation
		isValid, message := validateLicenseKey(generated, tc.sessionId, tc.secret)
		fmt.Printf("Validation: %t (%s)\n", isValid, message)
		fmt.Println("---")
	}
}
