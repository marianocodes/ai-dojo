'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Search, 
  Compass, 
  MessageSquare, 
  Bell, 
  User, 
  Settings
} from 'lucide-react';
import { NAVIGATION_ITEMS, SETTINGS_NAVIGATION, BRAND } from '@/lib/constants';
import { mockCurrentUser } from '@/lib/mock-data';
import NavItem, { SecondaryNavItem } from '@/components/navigation/NavItem';
import UserProfile from '@/components/profile/UserProfile';

/**
 * Fixed sidebar component with modular navigation and user profile
 * Refactored to use compound component pattern with NavItem and UserProfile
 * Based on architect's example: Client component with compound component pattern
 * Follows existing pattern: Dark theme with proper ARIA labels and modular structure
 */
interface SidebarProps {
  /** Whether sidebar is open on mobile */
  isOpen: boolean;
  /** Function to toggle sidebar state */
  onToggle: (open: boolean) => void;
  /** Whether current viewport is mobile */
  isMobile: boolean;
}

// Icon mapping for navigation items
const iconMap = {
  Home,
  Search,
  Compass,
  MessageSquare,
  Bell,
  User,
  Settings,
};

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  isMobile 
}: SidebarProps) {
  const [currentUser] = useState(mockCurrentUser);

  // Handle mobile sidebar closing when navigation items are clicked
  const handleNavClick = () => {
    if (isMobile) {
      onToggle(false);
    }
  };

  // Handle logout action
  const handleLogout = () => {
    // Mock logout functionality - just log to console
    console.log('Logout clicked (mock functionality)');
    // Close sidebar on mobile after logout
    if (isMobile) {
      onToggle(false);
    }
  };

  return (
    <aside
      className={cn(
        // Base styles - fixed positioning and dark theme
        "fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700",
        "flex flex-col z-30 transition-transform duration-300 ease-in-out",
        
        // Desktop: Always visible with fixed width
        "lg:translate-x-0 w-64",
        
        // Mobile: Slide in/out based on isOpen state
        isMobile ? (
          isOpen ? "translate-x-0" : "-translate-x-full"
        ) : "translate-x-0",
        
        // Shadow for depth
        "shadow-lg lg:shadow-none"
      )}
      role="navigation"
      aria-label="Main navigation sidebar"
    >
      {/* Brand Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
        <div className="text-2xl" role="img" aria-label="Socialgram logo">
          {BRAND.logo}
        </div>
        <h1 className="text-xl font-bold text-white">
          {BRAND.name}
        </h1>
      </header>

      {/* Main Navigation Section */}
      <nav 
        className="flex-1 px-4 py-6 space-y-2"
        aria-label="Main navigation"
      >
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          
          return (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              path={item.path}
              icon={IconComponent}
              ariaLabel={item.ariaLabel}
              onClick={handleNavClick}
            />
          );
        })}
      </nav>

      {/* Settings Section (separated from main navigation) */}
      <section 
        className="px-4 py-4 border-t border-gray-700"
        aria-label="Settings navigation"
      >
        <SecondaryNavItem
          id={SETTINGS_NAVIGATION.id}
          label={SETTINGS_NAVIGATION.label}
          path={SETTINGS_NAVIGATION.path}
          icon={Settings}
          ariaLabel={SETTINGS_NAVIGATION.ariaLabel}
          onClick={handleNavClick}
        />
      </section>

      {/* User Profile Section */}
      <section 
        className="px-4 py-4 border-t border-gray-700"
        aria-label="User profile"
      >
        <UserProfile
          user={currentUser}
          onLogout={handleLogout}
          onClick={handleNavClick}
          showLogout={true}
        />
      </section>
    </aside>
  );
}