import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Check, Circle } from 'lucide-react';
import { NavigationItem } from '@/types/documentation';

interface NavigationSidebarProps {
  navigation: NavigationItem[];
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  className?: string;
}

interface NavItemProps {
  item: NavigationItem;
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  level?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  currentSection,
  onSectionChange,
  level = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(level <= 1);
  const isActive = currentSection === item.id;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onSectionChange?.(item.id);
      // Smooth scroll to section
      const element = document.getElementById(item.id);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
          ${isActive
            ? 'bg-[hsl(var(--brand-blue))]/10 text-[hsl(var(--brand-blue))] border border-[hsl(var(--brand-blue))]/20'
            : 'hover:bg-card/50 text-muted-foreground hover:text-foreground'
          }
          ${level > 0 ? 'ml-4' : ''}
        `}
        style={{ marginLeft: `${level * 16}px` }}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <div className="flex-shrink-0 w-4 h-4">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>
        )}

        {/* Status Icon */}
        {!hasChildren && (
          <div className="flex-shrink-0 w-4 h-4">
            {item.completed ? (
              <Check className="w-3 h-3 text-[hsl(var(--brand-green))]" />
            ) : (
              <Circle className="w-3 h-3" />
            )}
          </div>
        )}

        {/* Title */}
        <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
          {item.title}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              currentSection={currentSection}
              onSectionChange={onSectionChange}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  navigation,
  currentSection,
  onSectionChange,
  className = ""
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className={`sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto ${className}`}>
      <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground">Documentation</h3>
          <div className="mt-2 w-full bg-border rounded-full h-1">
            <div
              className="bg-[hsl(var(--brand-blue))] h-1 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              currentSection={currentSection}
              onSectionChange={onSectionChange}
              level={0}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Progress</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;