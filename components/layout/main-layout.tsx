'use client'

import { useState, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { Header } from './header'

import type { LayoutContextType } from '@/types'

/**
 * Main layout wrapper component
 * Manages overall page structure and mobile navigation state
 * Follows technical plan TECH-1 specifications with React Context for navigation
 */

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a MainLayout');
  }
  return context;
}

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const contextValue: LayoutContextType = {
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  };

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleOverlayClick = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className={cn("min-h-screen bg-gray-900", className)}>
        {/* Header */}
        <Header onMobileMenuClick={handleMobileMenuClick} />

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            onClick={handleOverlayClick}
            aria-hidden="true"
          >
            <div className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-y-0 left-0 w-64">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main 
          className={cn(
            "md:ml-64 pt-16", // Account for sidebar width and header height
            "min-h-screen bg-gray-900"
          )}
          role="main"
        >
          <div className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </LayoutContext.Provider>
  );
}

/**
 * Mobile Sidebar Component
 * Separate component for mobile-specific sidebar behavior
 */
interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>
    </div>
  );
}