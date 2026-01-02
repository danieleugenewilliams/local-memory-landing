// Documentation type definitions
export interface DocumentationSection {
  id: string;
  title: string;
  description?: string;
  content: string;
  subsections?: DocumentationSubsection[];
  codeExamples?: CodeExample[];
  nextSection?: string;
  prevSection?: string;
}

export interface DocumentationSubsection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
  copyable?: boolean;
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  level: number;
  children?: NavigationItem[];
  completed?: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  section: string;
  content: string;
  href: string;
  relevance: number;
}

export interface DocumentationConfig {
  sections: DocumentationSection[];
  navigation: NavigationItem[];
  searchIndex?: any;
}