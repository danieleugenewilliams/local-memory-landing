import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Platform = 'macos-arm' | 'macos-intel' | 'windows' | 'linux' | 'unknown'

export interface PlatformInfo {
  platform: Platform
  label: string
  filename: string
  icon: string
  description: string
  isRecommended: boolean
}

export function detectUserPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown'

  try {
    // Modern approach: userAgentData (Chrome, Edge, Opera)
    if ('userAgentData' in navigator) {
      const userAgentData = (navigator as unknown as { userAgentData?: { platform?: string; getBrands?: () => unknown[] } }).userAgentData
      if (userAgentData?.platform) {
        const platform = userAgentData.platform.toLowerCase()
        if (platform.includes('mac')) {
          // Detect Apple Silicon vs Intel
          if (userAgentData.getBrands) {
            userAgentData.getBrands()
            // This is a basic heuristic - more sophisticated detection could be added
            return 'macos-arm' // Default to ARM for modern browsers
          }
          return 'macos-arm'
        }
        if (platform.includes('win')) return 'windows'
        if (platform.includes('linux')) return 'linux'
      }
    }

    // Fallback: navigator.platform (widely supported)
    if (navigator.platform) {
      const platform = navigator.platform.toLowerCase()
      
      // macOS detection
      if (platform.includes('mac') || platform === 'macintosh') {
        // Detect Apple Silicon vs Intel
        if (platform === 'macintosh' || platform.includes('arm') || platform.includes('aarch')) {
          return 'macos-arm'
        }
        // Intel detection
        if (platform.includes('intel') || platform.includes('x86')) {
          return 'macos-intel'
        }
        // Default to ARM for newer Macs (2020+)
        return 'macos-arm'
      }
      
      // Windows detection
      if (platform.includes('win')) return 'windows'
      
      // Linux detection
      if (platform.includes('linux')) return 'linux'
    }

    // Final fallback: User Agent string parsing
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('mac os x') || userAgent.includes('macos')) {
      // Basic heuristic: newer browsers likely on Apple Silicon
      const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome')
      const isModernSafari = isSafari && userAgent.includes('version/1')
      return isModernSafari ? 'macos-arm' : 'macos-intel'
    }
    if (userAgent.includes('windows')) return 'windows'
    if (userAgent.includes('linux')) return 'linux'

  } catch (error) {
    console.warn('Platform detection error:', error)
  }

  return 'unknown'
}

export function getPlatformInfo(platform: Platform): PlatformInfo {
  const detectedPlatform = detectUserPlatform()
  
  const platformConfigs: Record<Platform, PlatformInfo> = {
    'macos-arm': {
      platform: 'macos-arm',
      label: 'macOS (Apple Silicon)',
      filename: 'local-memory-macos-arm',
      icon: '',
      description: 'M1, M2, M3, M4 chips (2020+)',
      isRecommended: detectedPlatform === 'macos-arm'
    },
    'macos-intel': {
      platform: 'macos-intel',
      label: 'macOS (Intel)',
      filename: 'local-memory-macos-intel',
      icon: '',
      description: 'Intel processors (2019 and earlier)',
      isRecommended: detectedPlatform === 'macos-intel'
    },
    'windows': {
      platform: 'windows',
      label: 'Windows',
      filename: 'local-memory-windows.exe',
      icon: '',
      description: 'Windows 10/11 (64-bit)',
      isRecommended: detectedPlatform === 'windows'
    },
    'linux': {
      platform: 'linux',
      label: 'Linux',
      filename: 'local-memory-linux',
      icon: '',
      description: 'Ubuntu, Debian, CentOS, etc.',
      isRecommended: detectedPlatform === 'linux'
    },
    'unknown': {
      platform: 'unknown',
      label: 'Universal Package (all platforms included)',
      filename: 'local-memory-universal.zip',
      icon: '',
      description: 'Please note: A browser security warning may display strictly due to multiple executables in the zip file.',
      isRecommended: detectedPlatform === 'unknown'
    }
  }

  return platformConfigs[platform]
}

export function getAllPlatforms(): PlatformInfo[] {
  return [
    getPlatformInfo('macos-arm'),
    getPlatformInfo('macos-intel'),
    getPlatformInfo('windows'),
    getPlatformInfo('linux'),
    getPlatformInfo('unknown')
  ]
}
