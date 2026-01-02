import { DocumentationConfig, NavigationItem } from '@/types/documentation';
import { gettingStartedContent } from './gettingStarted';
import { configurationContent } from './configuration';
import { cliReferenceContent } from './cliReference';
import { mcpToolsContent } from './mcpTools';
import { restApiContent } from './restApi';

// Create navigation structure
export const navigationItems: NavigationItem[] = [
  {
    id: 'quick-start',
    title: 'Quick Start',
    href: '#quick-start',
    level: 0,
    children: [
      { id: 'quick-installation', title: 'Quick Installation', href: '#quick-installation', level: 1 },
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    href: '#getting-started',
    level: 0,
    children: [
      { id: 'what-is-local-memory', title: 'What is Local Memory?', href: '#what-is-local-memory', level: 1 },
      { id: 'installation', title: 'Installation', href: '#installation', level: 1 },
      { id: 'basic-workflow', title: 'Basic Workflow', href: '#basic-workflow', level: 1 },
      { id: 'core-concepts', title: 'Core Concepts', href: '#core-concepts', level: 1 },
      { id: 'integration-options', title: 'Integration Options', href: '#integration-options', level: 1 },
    ]
  },
  {
    id: 'configuration',
    title: 'Configuration',
    href: '#configuration',
    level: 0,
    children: [
      { id: 'configuration-directory-structure', title: 'Directory Structure', href: '#configuration-directory-structure', level: 1 },
      { id: 'configuration-file-hierarchy', title: 'File Hierarchy', href: '#configuration-file-hierarchy', level: 1 },
      { id: 'service-integration', title: 'Service Integration', href: '#service-integration', level: 1 },
      { id: 'environment-variables', title: 'Environment Variables', href: '#environment-variables', level: 1 },
    ]
  },
  {
    id: 'cli-reference',
    title: 'CLI Reference',
    href: '#cli-reference',
    level: 0,
    children: [
      { id: 'core-memory-commands', title: 'Memory Commands', href: '#core-memory-commands', level: 1 },
      { id: 'relationship-commands', title: 'Relationship Commands', href: '#relationship-commands', level: 1 },
      { id: 'analysis-commands', title: 'Analysis Commands', href: '#analysis-commands', level: 1 },
      { id: 'daemon-management-commands', title: 'System Commands', href: '#daemon-management-commands', level: 1 },
    ]
  },
  {
    id: 'mcp-tools',
    title: 'MCP Tools',
    href: '#mcp-tools',
    level: 0,
    children: [
      { id: 'memory-management-tools', title: 'Memory Management', href: '#memory-management-tools', level: 1 },
      { id: 'search-analysis-tools', title: 'Search & Analysis', href: '#search-analysis-tools', level: 1 },
      { id: 'organization-tools', title: 'Organization Tools', href: '#organization-tools', level: 1 },
      { id: 'administration-tools', title: 'Administration', href: '#administration-tools', level: 1 },
    ]
  },
  {
    id: 'rest-api',
    title: 'REST API',
    href: '#rest-api',
    level: 0,
    children: [
      { id: '1-memory-operations', title: 'Memory Operations', href: '#1-memory-operations', level: 1 },
      { id: '2-ai-analysis-operations', title: 'AI Analysis', href: '#2-ai-analysis-operations', level: 1 },
      { id: '3-relationship-operations', title: 'Relationships', href: '#3-relationship-operations', level: 1 },
      { id: '6-system-management-operations', title: 'System Management', href: '#6-system-management-operations', level: 1 },
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    href: '#troubleshooting',
    level: 0,
    children: [
      { id: 'common-issues', title: 'Common Issues', href: '#common-issues', level: 1 },
      { id: 'diagnostics', title: 'Diagnostics', href: '#diagnostics', level: 1 },
      { id: 'performance', title: 'Performance', href: '#performance', level: 1 },
    ]
  }
];

// Documentation sections
export const documentationSections = [
  gettingStartedContent,
  configurationContent,
  cliReferenceContent,
  mcpToolsContent,
  restApiContent
];

// Main documentation configuration
export const documentationConfig: DocumentationConfig = {
  sections: documentationSections,
  navigation: navigationItems
};

export * from './gettingStarted';
export * from './configuration';
export * from './cliReference';
export * from './mcpTools';
export * from './restApi';