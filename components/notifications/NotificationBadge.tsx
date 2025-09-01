'use client';

import { cn } from '@/lib/utils';
import type { Notification } from '@/types/social';

/**
 * Reusable notification badge component with color variants and pulse animation
 * Extracted from Header component for modularity and reusability
 * Based on architect's example: Client component with notification display
 * Follows existing pattern: Color-coded badges with accessibility support
 */
interface NotificationBadgeProps {
  /** Notification data with count and color */
  notification: Notification;
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when badge is clicked */
  onClick?: () => void;
  /** Whether to show pulse animation for unread notifications */
  showPulse?: boolean;
  /** Size variant for the badge */
  size?: 'sm' | 'md' | 'lg';
}

export default function NotificationBadge({
  notification,
  className,
  onClick,
  showPulse = true,
  size = 'md'
}: NotificationBadgeProps) {
  
  const sizeClasses = {
    sm: 'h-5 w-5 text-xs',
    md: 'h-6 w-6 text-xs',
    lg: 'h-8 w-8 text-sm'
  };

  const pulseClasses = {
    sm: 'h-2 w-2 -top-0.5 -right-0.5',
    md: 'h-3 w-3 -top-1 -right-1',
    lg: 'h-4 w-4 -top-1.5 -right-1.5'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 rounded-full transition-colors duration-200",
        "hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      aria-label={notification.ariaLabel}
    >
      {/* Notification Badge */}
      <div 
        className={cn(
          "rounded-full flex items-center justify-center",
          "font-bold text-white",
          notification.color === 'green' ? "bg-green-500" : "bg-red-500",
          sizeClasses[size]
        )}
      >
        {notification.count}
      </div>

      {/* Pulse animation for unread notifications */}
      {showPulse && (
        <div 
          className={cn(
            "absolute rounded-full animate-pulse",
            notification.color === 'green' ? "bg-green-400" : "bg-red-400",
            pulseClasses[size]
          )}
        />
      )}
    </button>
  );
}

/**
 * Collection of notification badges for multiple notifications
 */
interface NotificationGroupProps {
  /** Array of notifications to display */
  notifications: Notification[];
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when a badge is clicked, receives notification */
  onBadgeClick?: (notification: Notification) => void;
  /** Whether to show pulse animation for all badges */
  showPulse?: boolean;
  /** Size variant for all badges */
  size?: 'sm' | 'md' | 'lg';
}

export function NotificationGroup({
  notifications,
  className,
  onBadgeClick,
  showPulse = true,
  size = 'md'
}: NotificationGroupProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {notifications.map((notification) => (
        <NotificationBadge
          key={notification.id}
          notification={notification}
          onClick={() => onBadgeClick?.(notification)}
          showPulse={showPulse}
          size={size}
        />
      ))}
    </div>
  );
}

/**
 * Simple notification indicator without detailed count
 */
interface NotificationIndicatorProps {
  /** Whether there are unread notifications */
  hasNotifications: boolean;
  /** Color variant for the indicator */
  color?: 'green' | 'red' | 'blue';
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when indicator is clicked */
  onClick?: () => void;
}

export function NotificationIndicator({
  hasNotifications,
  color = 'red',
  className,
  onClick
}: NotificationIndicatorProps) {
  if (!hasNotifications) return null;

  const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 rounded-full transition-colors duration-200",
        "hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      aria-label="New notifications available"
    >
      {/* Simple notification dot */}
      <div 
        className={cn(
          "h-3 w-3 rounded-full animate-pulse",
          colorClasses[color]
        )}
      />
    </button>
  );
}