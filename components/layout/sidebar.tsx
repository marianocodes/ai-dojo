'use client'

import { useState } from 'react'
import { 
  Home, 
  Search, 
  Compass, 
  MessageCircle, 
  Bell, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockNavigationItems, mockCurrentUser } from '@/lib/mock-data'
import type { NavigationItem } from '@/types'

/**
 * Fixed left sidebar navigation component
 * Displays navigation menu, user profile, and settings
 * Follows technical plan TECH-1 specifications
 */

interface SidebarProps {
  className?: string;
}

const iconMap = {
  Home,
  Search,
  Compass: Compass,
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut
};

export function Sidebar({ className }: SidebarProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(mockNavigationItems);

  const handleNavClick = (itemId: string) => {
    setNavigationItems(prev => 
      prev.map(item => ({
        ...item,
        active: item.id === itemId
      }))
    );
  };

  const renderNavItem = (item: NavigationItem) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    
    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
          "text-left text-base font-medium",
          item.active
            ? "bg-green-500 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        )}
        aria-current={item.active ? 'page' : undefined}
      >
        <IconComponent 
          className="w-6 h-6 flex-shrink-0" 
          aria-hidden="true" 
        />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-gray-800 text-white",
        "flex flex-col border-r border-gray-700",
        "md:block hidden", // Hide on mobile, show on desktop
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Socialgram Logo and Branding */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white">Socialgram</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map(renderNavItem)}
        </div>
      </nav>

      {/* Settings Section */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "text-left text-base font-medium",
            "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
          <span>Settings</span>
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{mockCurrentUser.username}</p>
              <p className="text-xs text-gray-400">{mockCurrentUser.displayName}</p>
            </div>
          </div>
          <button
            className={cn(
              "p-2 rounded-lg transition-colors",
              "text-gray-400 hover:text-white hover:bg-gray-700"
            )}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}