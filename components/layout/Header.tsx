'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { BRAND, MOCK_NOTIFICATIONS } from '@/lib/constants';
import SearchBar from '@/components/search/SearchBar';
import { NotificationGroup } from '@/components/notifications/NotificationBadge';

/**
 * Fixed header component with branding, search, and notifications
 * Refactored to use modular SearchBar and NotificationBadge components
 * Based on architect's example: Client component with compound component pattern
 * Follows existing pattern: Dark theme with modular composition
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
  // Search state management (now handled by SearchBar component)
  const [searchQuery, setSearchQuery] = useState('');

  // Handle notification badge clicks
  const handleNotificationClick = (notification: any) => {
    // Mock notification click functionality
    console.log(`Clicked notification: ${notification.type} with ${notification.count} items`);
  };

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
      <div className="mx-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-2xl"
        />
      </div>

      {/* Right Section - Notifications */}
      <NotificationGroup
        notifications={MOCK_NOTIFICATIONS}
        onBadgeClick={handleNotificationClick}
      />
    </header>
  );
}