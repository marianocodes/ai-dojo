'use client'

import { useState } from 'react'
import { Search, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockNotifications } from '@/lib/mock-data'

/**
 * Top header bar component
 * Contains branding, search functionality, and notification indicators
 * Follows technical plan TECH-1 specifications
 */

interface HeaderProps {
  className?: string;
  onMobileMenuClick?: () => void;
}

interface NotificationBadgeProps {
  count: number;
  type?: 'default' | 'message';
  className?: string;
}

function NotificationBadge({ count, type = 'default', className }: NotificationBadgeProps) {
  if (count === 0) return null;
  
  return (
    <span 
      className={cn(
        "absolute -top-2 -right-2 rounded-full text-xs font-medium",
        "min-w-[20px] h-5 flex items-center justify-center",
        type === 'message' ? 'bg-red-500 text-white' : 'bg-green-500 text-white',
        className
      )}
      aria-label={`${count} unread ${type === 'message' ? 'messages' : 'notifications'}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Header({ className, onMobileMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality - no actual implementation needed per requirements
    console.log('Search query:', searchQuery);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700",
        "flex items-center justify-between px-4 md:px-6",
        "z-40", // Ensure header stays above other content
        className
      )}
      role="banner"
    >
      {/* Left Section - Mobile Menu + Branding */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuClick}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            "text-gray-300 hover:text-white hover:bg-gray-700"
          )}
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Branding - hidden on mobile where sidebar shows it */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white">Socialgram</span>
        </div>

        {/* Mobile-only Branding */}
        <div className="md:hidden flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white">Socialgram</span>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-lg mx-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, people, hashtags..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-full",
              "bg-gray-700 text-white placeholder-gray-400",
              "border border-gray-600 focus:border-green-500",
              "focus:outline-none focus:ring-2 focus:ring-green-500/20",
              "transition-colors duration-200"
            )}
            aria-label="Search posts, people, and hashtags"
          />
        </form>
      </div>

      {/* Right Section - Notification Indicators */}
      <div className="flex items-center gap-4">
        {/* General Notifications */}
        <div className="relative">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center",
            "transition-colors duration-200 hover:bg-gray-600"
          )}>
            <div className="w-6 h-6 rounded-full bg-gray-600"></div>
          </div>
          <NotificationBadge 
            count={mockNotifications.general} 
            type="default"
          />
        </div>

        {/* Message Notifications */}
        <div className="relative">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center",
            "transition-colors duration-200 hover:bg-gray-600"
          )}>
            <div className="w-6 h-6 rounded-full bg-gray-600"></div>
          </div>
          <NotificationBadge 
            count={mockNotifications.messages} 
            type="message"
          />
        </div>
      </div>
    </header>
  );
}