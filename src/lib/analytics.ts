/**
 * Google Analytics 4 Event Tracking for Local Memory Sales Funnel
 * Integrated with Stripe payments and Substack newsletter
 */

// Enhanced ecommerce events for GA4
export interface EcommerceItem {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
}

// Custom event types for Local Memory funnel
export type LocalMemoryEvent = 
  | 'page_view'
  | 'view_item'
  | 'add_to_cart'
  | 'begin_checkout' 
  | 'purchase'
  | 'download_initiated'
  | 'license_key_generated'
  | 'substack_subscribe'
  | 'cta_click'
  | 'demo_interaction'
  | 'docs_visit'
  | 'support_contact';

// Product information for consistent tracking
export const LOCAL_MEMORY_PRODUCT: EcommerceItem = {
  item_id: 'local-memory-v1',
  item_name: 'Local Memory - AI Agent Memory System',
  category: 'AI Tools',
  price: 49, // Current launch price
  currency: 'USD',
  quantity: 1
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Centralized function to determine if analytics should be tracked
 * Filters out test transactions and development scenarios
 */
const shouldTrackAnalytics = (sessionId?: string): boolean => {
  // Skip tracking in development mode unless explicitly enabled
  if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_DEV_ANALYTICS) {
    return false;
  }
  
  // Filter out Stripe test transactions
  if (sessionId && sessionId.startsWith('cs_test_')) {
    console.log('📊 Skipping analytics for test transaction:', sessionId.slice(0, 12) + '...');
    return false;
  }
  
  return true;
};

/**
 * Track custom events with enhanced ecommerce data
 */
export const trackEvent = (
  eventName: LocalMemoryEvent,
  parameters: Record<string, unknown> = {}
) => {
  // Check if we should track analytics (filters test data and dev mode)
  const sessionId = parameters.session_id as string;
  if (!shouldTrackAnalytics(sessionId)) {
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    // Add timestamp and session info to all events
    const eventData = {
      ...parameters,
      event_timestamp: Date.now(),
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      page_title: document.title
    };

    window.gtag('event', eventName, eventData);
    console.log(`📊 GA4 Event: ${eventName}`, eventData);
  }
};

/**
 * Track page views with enhanced data
 */
export const trackPageView = (pageName?: string, customParameters: Record<string, unknown> = {}) => {
  const parameters = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_name: pageName || window.location.pathname,
    ...customParameters
  };

  trackEvent('page_view', parameters);
};

/**
 * Track when user views the product (for funnel step 2)
 * Using view_item for GA4 Enhanced Ecommerce compatibility
 */
export const trackViewItem = () => {
  trackEvent('view_item', {
    currency: LOCAL_MEMORY_PRODUCT.currency,
    value: LOCAL_MEMORY_PRODUCT.price,
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track CTA button clicks throughout the funnel
 */
export const trackCTAClick = (
  ctaLocation: 'hero' | 'features' | 'demo' | 'pricing' | 'footer',
  ctaText: string,
  destination: string
) => {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
    cta_destination: destination,
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track when user views the payment page (add_to_cart equivalent)
 */
export const trackAddToCart = () => {
  trackEvent('add_to_cart', {
    currency: LOCAL_MEMORY_PRODUCT.currency,
    value: LOCAL_MEMORY_PRODUCT.price,
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track when user initiates Stripe checkout
 */
export const trackBeginCheckout = (paymentMethod: 'stripe_payment_link' = 'stripe_payment_link') => {
  trackEvent('begin_checkout', {
    currency: LOCAL_MEMORY_PRODUCT.currency,
    value: LOCAL_MEMORY_PRODUCT.price,
    payment_method: paymentMethod,
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track successful purchase completion
 */
export const trackPurchase = (
  sessionId: string,
  transactionId?: string
) => {
  trackEvent('purchase', {
    transaction_id: transactionId || sessionId,
    currency: LOCAL_MEMORY_PRODUCT.currency,
    value: LOCAL_MEMORY_PRODUCT.price,
    session_id: sessionId,
    payment_processor: 'stripe',
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track download initiation (post-purchase)
 */
export const trackDownloadInitiated = (
  platform: string,
  downloadUrl: string,
  sessionId: string
) => {
  trackEvent('download_initiated', {
    platform: platform,
    download_url: downloadUrl,
    session_id: sessionId,
    currency: LOCAL_MEMORY_PRODUCT.currency,
    value: LOCAL_MEMORY_PRODUCT.price,
    items: [LOCAL_MEMORY_PRODUCT]
  });
};

/**
 * Track license key generation
 */
export const trackLicenseKeyGenerated = (
  sessionId: string,
  keyFormat: string = 'LM-XXXX-XXXX-XXXX-XXXX-XXXX'
) => {
  trackEvent('license_key_generated', {
    session_id: sessionId,
    key_format: keyFormat,
    generation_method: 'deterministic-hash'
  });
};

/**
 * Track Substack newsletter signups
 */
export const trackSubstackSubscribe = (
  location: 'hero' | 'footer' | 'docs' | 'success',
  email?: string
) => {
  trackEvent('substack_subscribe', {
    signup_location: location,
    email_provided: !!email,
    newsletter_type: 'substack'
  });
};

/**
 * Track demo interactions
 */
export const trackDemoInteraction = (
  interactionType: 'play' | 'pause' | 'complete' | 'expand',
  demoSection: string
) => {
  trackEvent('demo_interaction', {
    interaction_type: interactionType,
    demo_section: demoSection,
    demo_name: 'local-memory-demo'
  });
};

/**
 * Track documentation page visits
 */
export const trackDocsVisit = (
  docsSection: string,
  fromPage: string = window.location.pathname
) => {
  trackEvent('docs_visit', {
    docs_section: docsSection,
    referrer_page: fromPage,
    content_type: 'documentation'
  });
};

/**
 * Track support contact attempts
 */
export const trackSupportContact = (
  contactMethod: 'discord' | 'email' | 'github',
  contactLocation: string
) => {
  trackEvent('support_contact', {
    contact_method: contactMethod,
    contact_location: contactLocation,
    support_type: 'technical'
  });
};

/**
 * Set up custom user properties
 */
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-6PENS9FSFW', {
      custom_map: properties
    });
  }
};

/**
 * Enhanced conversion tracking for different funnel stages
 */
export const trackConversion = (
  conversionType: 'lead' | 'trial' | 'purchase' | 'activation',
  value?: number,
  currency: string = 'USD'
) => {
  const conversionData: Record<string, unknown> = {
    conversion_type: conversionType,
    event_category: 'conversion',
    event_label: conversionType
  };

  if (value !== undefined) {
    conversionData.value = value;
    conversionData.currency = currency;
  }

  trackEvent(conversionType as LocalMemoryEvent, conversionData);
};

/**
 * Initialize GA4 with enhanced ecommerce and custom dimensions
 */
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set up enhanced ecommerce
    window.gtag('config', 'G-6PENS9FSFW', {
      // Enhanced ecommerce settings
      send_page_view: true,
      
      // Custom dimensions for funnel analysis
      custom_map: {
        'dimension1': 'user_platform',
        'dimension2': 'traffic_source',
        'dimension3': 'funnel_stage',
        'dimension4': 'payment_method',
        'dimension5': 'referrer_domain'
      },

      // Conversion settings
      allow_enhanced_conversions: true,
      allow_google_signals: true,
      
      // Privacy settings
      anonymize_ip: true,
      respect_dnt: true
    });

    // Set initial user properties
    setUserProperties({
      user_platform: navigator.platform,
      referrer_domain: document.referrer ? new URL(document.referrer).hostname : 'direct',
      session_start: Date.now()
    });

    console.log('📊 GA4 Analytics initialized for Local Memory funnel tracking');
  }
};

/**
 * Utility to detect and track user journey stage
 */
export const detectAndTrackFunnelStage = () => {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  
  let funnelStage = 'awareness';
  const customData: Record<string, unknown> = {};

  switch (path) {
    case '/':
      funnelStage = 'awareness';
      break;
    case '/payment':
      funnelStage = 'consideration';
      // trackAddToCart() is now handled in Payment page useEffect
      break;
    case '/success':
      if (searchParams.get('session_id')) {
        funnelStage = 'conversion';
        // trackPurchase() is handled in Success page component
      }
      break;
    case '/docs':
      funnelStage = 'education';
      trackDocsVisit('main', document.referrer);
      break;
    default:
      funnelStage = 'exploration';
  }

  // Track the funnel stage
  trackEvent('page_view', {
    funnel_stage: funnelStage,
    ...customData
  });

  return funnelStage;
};