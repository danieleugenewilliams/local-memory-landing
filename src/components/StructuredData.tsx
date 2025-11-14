// Component for adding structured data to pages
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'article' | 'faq' | 'product';
  title?: string;
  description?: string;
  url?: string;
  content?: string;
  features?: string[];
  faqItems?: { question: string; answer: string }[];
}

export const StructuredData = ({
  type,
  title,
  description,
  url,
  content,
  features,
  faqItems
}: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseUrl = "https://localmemory.co";

    switch (type) {
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title || "Local Memory Features - Persistent AI Intelligence",
          "description": description || "Comprehensive features overview for Local Memory AI intelligence system",
          "url": url || `${baseUrl}/features`,
          "author": {
            "@type": "Organization",
            "name": "Local Memory"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Local Memory",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/favicon.png`
            }
          },
          "datePublished": "2025-01-01",
          "dateModified": new Date().toISOString().split('T')[0],
          "articleSection": "Technology",
          "keywords": [
            "AI memory system",
            "MCP integration",
            "persistent AI intelligence",
            "context engineering",
            "vector search",
            "AI agent memory"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url || `${baseUrl}/features`
          }
        };

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": title || "Local Memory",
          "description": description || "Transform developer expertise into persistent AI intelligence",
          "url": url || baseUrl,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": ["macOS", "Windows", "Linux"],
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": features || [
            "8 unified MCP tools",
            "97.5% token optimization",
            "10-57ms response times",
            "100% local operation",
            "Cross-agent compatibility"
          ]
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems?.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          })) || []
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;