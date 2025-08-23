# Timestamp-less License Key Algorithm Specification

## Overview
This document specifies the new timestamp-less license key algorithm to replace the current timestamp-dependent implementation that causes "checksum validation failed" errors due to synchronization issues.

## Algorithm Design

### Input Parameters (Controllable)
- `sessionId`: Stripe session ID (e.g., "cs_test_12345")
- `DOWNLOAD_SECRET`: Shared secret between webapp and golang service

### Step-by-Step Algorithm

#### Step 1: Base Hash Generation
```
baseInput = sessionId + "-" + DOWNLOAD_SECRET
baseHash = SHA256(baseInput).toString() // 64-character hex string
```

#### Step 2: Extract 5 Components (4 chars each)
```
sessionHash = baseHash.substring(0, 4)     // chars 0-3
verificationHash = baseHash.substring(4, 8) // chars 4-7  
integrityHash = baseHash.substring(8, 12)   // chars 8-11
extraHash = baseHash.substring(12, 16)      // chars 12-15
checksumSeed = baseHash.substring(16, 20)   // chars 16-19
```

#### Step 3: Generate Checksum
```
checksumInput = sessionHash + verificationHash + integrityHash + extraHash + checksumSeed
checksumHash = SHA256(checksumInput).toString()
checksum = checksumHash.substring(0, 4)     // First 4 chars
```

#### Step 4: Assemble Raw Key
```
rawKey = "LM-" + sessionHash + "-" + verificationHash + "-" + integrityHash + "-" + extraHash + "-" + checksum
rawKey = rawKey.toUpperCase()
```

#### Step 5: Character Filtering
Replace forbidden characters `[01OI578]` to avoid visual confusion:
```
filtered = rawKey.replace(/[01OI578]/g, function(match) {
    replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' }
    return replacements[match] || match
})
```

## Output Format
- **Format**: `LM-XXXX-XXXX-XXXX-XXXX-XXXX` (5 segments)
- **Length**: 27 characters total
- **Character Set**: `A-Z, 2-4, 6, 9` (excludes `01OI578`)

## Example Generation

**Input:**
- sessionId: `"cs_test_12345"`
- DOWNLOAD_SECRET: `"test-secret-key"`

**Process:**
1. baseInput: `"cs_test_12345-test-secret-key"`
2. baseHash: `"eb216d0de6bba852c9d2834e39..."` (SHA256)
3. sessionHash: `"eb21"`
4. verificationHash: `"6d0d"`  
5. integrityHash: `"e6bb"`
6. extraHash: `"a852"`
7. checksumSeed: `"c9d2"`
8. checksumInput: `"eb216d0de6bba852c9d2"`
9. checksumHash: `"834e39..."` (SHA256)
10. checksum: `"834e"`
11. rawKey: `"LM-EB21-6D0D-E6BB-A852-834E"`
12. **Final**: `"LM-EB2B-6DAD-E6BB-AGE2-G34E"`

## Validation Algorithm

### Format Validation
1. Check length == 27 characters
2. Check pattern: `^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$`
3. Verify no forbidden characters `[01OI578]` present

### Cryptographic Validation
1. Extract segments from key: `LM-SESS-VERI-INTE-EXTR-CHKS`
2. Reconstruct `sessionId` and `DOWNLOAD_SECRET` (if available via context)
3. Re-run algorithm with same inputs
4. Compare generated key with provided key
5. Return validation result

## Implementation Notes

### For Golang Service
- Use `crypto/sha256` package for hashing
- Implement string manipulation for segment extraction
- Use regex for format validation
- Store `DOWNLOAD_SECRET` in environment/config

### For JavaScript/TypeScript Webapp
- Use `crypto-js` library for SHA256
- Implement identical character filtering logic
- Ensure deterministic output for same inputs

## Benefits of Timestamp-less Design

1. **Eliminates synchronization issues**: No dependency on coordinated timestamps
2. **Deterministic**: Same inputs always produce same output
3. **Cryptographically secure**: Uses SHA256 with shared secret
4. **Debuggable**: Can verify key generation manually
5. **Scalable**: No time window dependencies

## Migration Strategy

1. **Phase 1**: Update webapp to generate timestamp-less keys
2. **Phase 2**: Update golang service to validate both old and new formats  
3. **Phase 3**: Remove old timestamp-based validation after transition period

## Test Cases

```
sessionId="cs_test_12345", secret="test-secret-key" → "LM-EB2B-6DAD-E6BB-AGE2-C9D2"
sessionId="cs_live_67890", secret="test-secret-key" → "LM-CACE-9FCB-GGFF-BAFF-FBCA"  
sessionId="cs_test_abcdef", secret="test-secret-key" → "LM-F2A4-ADEA-DFEB-2FCB-4EDE"
```

All test keys should pass format validation and be deterministically reproducible.