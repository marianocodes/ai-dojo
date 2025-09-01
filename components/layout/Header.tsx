'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Menu, X } from 'lucide-react';
import { BRAND, MOCK_NOTIFICATIONS, UI_TEXT } from '@/lib/constants';

/**
 * Fixed header component with branding, search, and notifications
 * Implements responsive header spanning full width with search functionality
 * Based on architect's example: Client component with search state management
 * Follows existing pattern: Dark theme with notification badges
 */
interface HeaderProps {
  /** Function to toggle mobile menu */
  onMenuToggle: () => void;
  /** Whether current viewport is mobile */
  isMobile: boolean;
  /** Whether sidebar is currently open */
  sidebarOpen: boolean;
}

export default function Header({ 
  onMenuToggle, 
  isMobile, 
  sidebarOpen 
}: HeaderProps) {
  // Search state management
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header 
      className={cn(
        // Fixed positioning and responsive margins
        "fixed top-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-40",
        "flex items-center justify-between px-4 sm:px-6",
        
        // Desktop: margin for sidebar (256px)
        "lg:left-64",
        // Mobile: full width
        "left-0"
      )}
      role="banner"
    >
      {/* Left Section - Mobile menu button and branding */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className={cn(
              "p-2 rounded-md text-gray-400 hover:text-white",
              "hover:bg-gray-700 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              "lg:hidden" // Hide on desktop since sidebar is always visible
            )}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        )}

        {/* Brand - visible on mobile when sidebar is closed */}
        <div className={cn(
          "flex items-center gap-2",
          // Show on mobile when sidebar is closed, always show on desktop for wider screens
          isMobile ? (sidebarOpen ? "hidden" : "flex") : "hidden xl:flex"
        )}>
          <div className="text-xl" role="img" aria-label="Socialgram logo">
            {BRAND.logo}
          </div>
          <h1 className="text-lg font-semibold text-white">
            {BRAND.name}
          </h1>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <div 
            className={cn(
              "relative flex items-center",
              "transition-all duration-200",
              isSearchFocused ? "scale-[1.02]" : "scale-100"
            )}
          >
            {/* Search Icon */}
            <Search 
              className={cn(
                "absolute left-3 h-5 w-5 transition-colors duration-200",
                isSearchFocused ? "text-green-500" : "text-gray-400"
              )}
              aria-hidden="true"
            />
            
            {/* Search Input */}
            <input
              type="text"
              placeholder={UI_TEXT.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                // Base styles
                "w-full pl-10 pr-4 py-2 rounded-full",
                "bg-gray-700 border border-gray-600",
                "text-white placeholder-gray-400",
                "transition-all duration-200",
                
                // Focus styles
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
                "focus:bg-gray-600",
                
                // Hover styles
                "hover:border-gray-500"
              )}
              aria-label={UI_TEXT.search.ariaLabel}
            />

            {/* Clear Search Button (visible when there's text) */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={cn(
                  "absolute right-3 p-1 rounded-full",
                  "text-gray-400 hover:text-white",
                  "hover:bg-gray-600 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-green-500"
                )}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown Placeholder */}
          {searchQuery && isSearchFocused && (
            <div className={cn(
              "absolute top-full left-0 right-0 mt-1 py-2",
              "bg-gray-700 border border-gray-600 rounded-lg shadow-lg",
              "z-50"
            )}>
              <div className="px-4 py-2 text-sm text-gray-400">
                Search for "{searchQuery}" (mock functionality)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Notifications */}
      <div className="flex items-center gap-2">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <button
            key={notification.id}
            className={cn(
              "relative p-2 rounded-full transition-colors duration-200",
              "hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
            aria-label={notification.ariaLabel}
          >
            {/* Notification Badge */}
            <div 
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center",
                "text-xs font-bold text-white",
                notification.color === 'green' ? "bg-green-500" : "bg-red-500"
              )}
            >
              {notification.count}
            </div>

            {/* Pulse animation for unread notifications */}
            <div 
              className={cn(
                "absolute -top-1 -right-1 h-3 w-3 rounded-full",
                "animate-pulse",
                notification.color === 'green' ? "bg-green-400" : "bg-red-400"
              )}
            />
          </button>
        ))}
      </div>
    </header>
  );
}