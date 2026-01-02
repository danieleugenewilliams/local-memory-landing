import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Check, Circle } from 'lucide-react';
import { NavigationItem } from '@/types/documentation';

interface MobileNavigationProps {
  navigation: NavigationItem[];
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  className?: string;
}

interface MobileNavItemProps {
  item: NavigationItem;
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  onItemClick?: () => void;
  level?: number;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  item,
  currentSection,
  onSectionChange,
  onItemClick,
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
      onItemClick?.();
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
          flex items-center gap-3 px-4 py-3 border-b border-border/30 cursor-pointer transition-all duration-200
          ${isActive
            ? 'bg-[hsl(var(--brand-blue))]/10 text-[hsl(var(--brand-blue))] border-l-2 border-l-[hsl(var(--brand-blue))]'
            : 'hover:bg-card/50 text-muted-foreground hover:text-foreground'
          }
          ${level > 0 ? 'pl-8' : ''}
        `}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <div className="flex-shrink-0 w-5 h-5">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        )}

        {/* Status Icon */}
        {!hasChildren && (
          <div className="flex-shrink-0 w-5 h-5">
            {item.completed ? (
              <Check className="w-4 h-4 text-[hsl(var(--brand-green))]" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
          </div>
        )}

        {/* Title */}
        <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
          {item.title}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {item.children?.map((child) => (
            <MobileNavItem
              key={child.id}
              item={child}
              currentSection={currentSection}
              onSectionChange={onSectionChange}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigation,
  currentSection,
  onSectionChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const currentSectionTitle = React.useMemo(() => {
    const findSectionTitle = (items: NavigationItem[]): string | null => {
      for (const item of items) {
        if (item.id === currentSection) {
          return item.title;
        }
        if (item.children) {
          const childTitle = findSectionTitle(item.children);
          if (childTitle) return childTitle;
        }
      }
      return null;
    };
    return findSectionTitle(navigation) || 'Documentation';
  }, [currentSection, navigation]);

  return (
    <div className={`lg:hidden ${className}`}>
      {/* Menu Toggle Button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-wide py-4">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-between w-full p-3 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Menu className="h-5 w-5 text-[hsl(var(--brand-blue))]" />
              <span className="font-medium truncate">{currentSectionTitle}</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div className="fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto bg-background border-b border-border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Documentation</h3>
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
              {navigation.map((item) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  currentSection={currentSection}
                  onSectionChange={onSectionChange}
                  onItemClick={closeMenu}
                  level={0}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNavigation;