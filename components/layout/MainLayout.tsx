'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Main layout component for Socialgram application
 * Implements client-side layout composition with responsive sidebar and fixed header
 * Based on architect's example: Technical plan TECH-2 with useState sidebar management
 * Follows existing pattern: Next.js App Router layout with client components
 */
interface MainLayoutProps {
  /** Page content to be rendered in main area */
  children: React.ReactNode;
  /** Optional CSS class for customization */
  className?: string;
}

export default function MainLayout({ 
  children, 
  className 
}: MainLayoutProps) {
  // Sidebar state management for mobile responsiveness
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile when window is resized to desktop
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  const handleBackdropClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gray-900 text-gray-100",
      "relative overflow-hidden", // Prevent horizontal scroll
      className
    )}>
      {/* Mobile backdrop overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Fixed Sidebar - responsive width and positioning */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={setSidebarOpen}
        isMobile={isMobile}
      />

      {/* Fixed Header - spans full width, adjusts margin for sidebar */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content Area - responsive margins and padding */}
      <main 
        className={cn(
          // Desktop: margin for fixed sidebar (256px) and header (64px)
          "lg:ml-64 pt-16",
          // Mobile: full width when sidebar is closed
          "transition-all duration-300 ease-in-out",
          // Ensure proper spacing and scrolling
          "min-h-[calc(100vh-4rem)] overflow-auto",
          // Responsive padding
          "px-4 py-6 sm:px-6 lg:px-8"
        )}
        role="main"
        aria-label="Main content area"
      >
        {/* Content container with max width for readability */}
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}