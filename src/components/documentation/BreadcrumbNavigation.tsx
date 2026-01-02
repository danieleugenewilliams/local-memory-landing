import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { NavigationItem } from '@/types/documentation';

interface BreadcrumbNavigationProps {
  navigation: NavigationItem[];
  currentSection: string;
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

interface BreadcrumbItem {
  id: string;
  title: string;
  isLast?: boolean;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  navigation,
  currentSection,
  onNavigate,
  className = ''
}) => {
  // Build breadcrumb trail
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { id: 'home', title: 'Home' },
      { id: 'docs', title: 'Documentation' }
    ];

    // Find current section in navigation
    for (const item of navigation) {
      if (item.id === currentSection) {
        breadcrumbs.push({ id: item.id, title: item.title, isLast: true });
        break;
      }

      // Check children
      if (item.children) {
        for (const child of item.children) {
          if (child.id === currentSection) {
            breadcrumbs.push({ id: item.id, title: item.title });
            breadcrumbs.push({ id: child.id, title: child.title, isLast: true });
            break;
          }
        }
      }
    }

    return breadcrumbs;
  };

  const handleClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();

    if (itemId === 'home') {
      window.location.href = '/';
      return;
    }

    if (itemId === 'docs') {
      // Scroll to top of docs
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Update hash and navigate
    window.history.pushState(null, '', `#${itemId}`);
    onNavigate?.(itemId);

    const element = document.getElementById(itemId);
    if (element) {
      const offset = 80;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
    >
      <div className="container-wide">
        <div className="flex items-center py-3 overflow-x-auto scrollbar-hide">
          <ol className="flex items-center space-x-2 text-sm whitespace-nowrap">
            {breadcrumbs.map((item, index) => (
              <li key={item.id} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}

                {item.id === 'home' && (
                  <button
                    onClick={(e) => handleClick(e, item.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-current={item.isLast ? 'page' : undefined}
                  >
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.title}</span>
                  </button>
                )}

                {item.id !== 'home' && !item.isLast && (
                  <button
                    onClick={(e) => handleClick(e, item.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-current={item.isLast ? 'page' : undefined}
                  >
                    {item.title}
                  </button>
                )}

                {item.isLast && (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile breadcrumb - simplified */}
      <div className="sm:hidden container-wide pb-2">
        <div className="text-xs text-muted-foreground">
          {breadcrumbs.length > 2 && (
            <span className="truncate">
              {breadcrumbs[breadcrumbs.length - 2].title} / {breadcrumbs[breadcrumbs.length - 1].title}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;