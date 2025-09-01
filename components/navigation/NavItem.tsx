'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * Reusable navigation item component for sidebar navigation
 * Implements active state detection and consistent styling
 * Based on architect's example: Client component with Next.js Link and usePathname
 * Follows existing pattern: Dark theme with bright green active states
 */
interface NavItemProps {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** Route path for Next.js navigation */
  path: string;
  /** Lucide icon component for the navigation item */
  icon: LucideIcon;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when item is clicked (for mobile sidebar closing) */
  onClick?: () => void;
  /** Whether this item should be treated as active regardless of path */
  forceActive?: boolean;
}

export default function NavItem({
  id,
  label,
  path,
  icon: Icon,
  ariaLabel,
  className,
  onClick,
  forceActive = false
}: NavItemProps) {
  const pathname = usePathname();
  
  // Determine if this navigation item is currently active
  const isActive = forceActive || pathname === path || (pathname === '/' && id === 'home');

  return (
    <Link
      href={path}
      className={cn(
        // Base navigation item styles
        "flex items-center gap-4 px-4 py-3 rounded-lg",
        "text-sm font-medium transition-all duration-200",
        "hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
        "group", // For hover effects on child elements
        
        // Active state - bright green as specified in requirements
        isActive ? (
          "bg-green-600 text-white hover:bg-green-700"
        ) : (
          "text-gray-300 hover:text-white"
        ),
        
        // Custom classes
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Navigation Icon */}
      <Icon 
        className={cn(
          "h-6 w-6 flex-shrink-0 transition-colors duration-200",
          // Icon color changes based on active state and hover
          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
        )}
        aria-hidden="true"
      />
      
      {/* Navigation Label */}
      <span className="truncate">
        {label}
      </span>
      
      {/* Active indicator (optional visual enhancement) */}
      {isActive && (
        <div 
          className="ml-auto h-2 w-2 rounded-full bg-white opacity-75"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/**
 * Variant of NavItem for settings or secondary navigation items
 * Provides different styling to visually separate from main navigation
 */
interface SecondaryNavItemProps extends Omit<NavItemProps, 'forceActive'> {
  /** Whether this is a destructive action (like logout) */
  isDestructive?: boolean;
}

export function SecondaryNavItem({
  id,
  label,
  path,
  icon: Icon,
  ariaLabel,
  className,
  onClick,
  isDestructive = false
}: SecondaryNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        // Base secondary navigation styles
        "flex items-center gap-4 px-4 py-3 rounded-lg",
        "text-sm font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "group",
        
        // Color scheme for secondary items
        isDestructive ? (
          "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
        ) : (
          isActive ? (
            "bg-gray-700 text-white"
          ) : (
            "text-gray-400 hover:text-white hover:bg-gray-700"
          )
        ),
        
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Secondary Navigation Icon */}
      <Icon 
        className={cn(
          "h-6 w-6 flex-shrink-0 transition-colors duration-200",
          isDestructive ? (
            "text-gray-500 group-hover:text-red-400"
          ) : (
            isActive ? "text-white" : "text-gray-500 group-hover:text-white"
          )
        )}
        aria-hidden="true"
      />
      
      {/* Secondary Navigation Label */}
      <span className="truncate">
        {label}
      </span>
    </Link>
  );
}

/**
 * Button variant for non-navigation actions (like logout)
 * Uses button element instead of Link for actions that don't navigate
 */
interface NavButtonProps extends Omit<NavItemProps, 'path'> {
  /** Function called when button is clicked */
  onAction: () => void;
  /** Whether this is a destructive action */
  isDestructive?: boolean;
}

export function NavButton({
  id,
  label,
  icon: Icon,
  ariaLabel,
  className,
  onClick,
  onAction,
  isDestructive = false
}: NavButtonProps) {
  const handleClick = () => {
    onAction();
    onClick?.(); // Call optional onClick (for mobile sidebar closing)
  };

  return (
    <button
      type="button"
      className={cn(
        // Base button navigation styles
        "flex items-center gap-4 px-4 py-3 rounded-lg w-full text-left",
        "text-sm font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "group",
        
        // Color scheme for action buttons
        isDestructive ? (
          "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
        ) : (
          "text-gray-400 hover:text-white hover:bg-gray-700"
        ),
        
        className
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {/* Action Button Icon */}
      <Icon 
        className={cn(
          "h-6 w-6 flex-shrink-0 transition-colors duration-200",
          isDestructive ? (
            "text-gray-500 group-hover:text-red-400"
          ) : (
            "text-gray-500 group-hover:text-white"
          )
        )}
        aria-hidden="true"
      />
      
      {/* Action Button Label */}
      <span className="truncate">
        {label}
      </span>
    </button>
  );
}