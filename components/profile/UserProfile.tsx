'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { generateAvatarUrl } from '@/lib/mock-data';
import type { CurrentUser } from '@/types/social';

/**
 * Reusable user profile display component for sidebar
 * Shows user avatar, username, display name, and logout functionality
 * Based on architect's example: Client component with mock user data
 * Follows existing pattern: Dark theme with proper accessibility
 */
interface UserProfileProps {
  /** Current user data (from mock data) */
  user: CurrentUser;
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when logout is clicked */
  onLogout?: () => void;
  /** Function called when profile is clicked (for mobile sidebar closing) */
  onClick?: () => void;
  /** Whether to show the logout button */
  showLogout?: boolean;
  /** Compact mode for reduced height */
  compact?: boolean;
}

export default function UserProfile({
  user,
  className,
  onLogout,
  onClick,
  showLogout = true,
  compact = false
}: UserProfileProps) {
  const [avatarError, setAvatarError] = useState(false);

  // Generate avatar URL using the utility function
  const avatarUrl = generateAvatarUrl(user.username, compact ? 64 : 80);

  const handleLogoutClick = () => {
    // Mock logout functionality - just log to console
    console.log('Logout clicked (mock functionality)');
    onLogout?.();
  };

  const handleProfileClick = () => {
    onClick?.();
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3",
        compact ? "px-2 py-2" : "px-2 py-3",
        className
      )}
    >
      {/* User Avatar Section */}
      <button
        onClick={handleProfileClick}
        className={cn(
          "relative flex-shrink-0 group",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        )}
        aria-label={`View ${user.displayName} profile`}
      >
        <div 
          className={cn(
            "rounded-full bg-gray-600 flex items-center justify-center overflow-hidden",
            "transition-all duration-200 group-hover:ring-2 group-hover:ring-gray-400",
            compact ? "h-8 w-8" : "h-10 w-10"
          )}
          role="img"
          aria-label={`${user.displayName} profile picture`}
        >
          {/* User Avatar Image */}
          {!avatarError ? (
            <img
              src={avatarUrl}
              alt={`${user.displayName} avatar`}
              className="h-full w-full object-cover"
              onError={() => setAvatarError(true)}
            />
          ) : (
            /* Fallback Avatar with Initials */
            <div 
              className={cn(
                "h-full w-full flex items-center justify-center",
                "text-white font-medium bg-gradient-to-br from-green-500 to-green-600",
                compact ? "text-xs" : "text-sm"
              )}
            >
              {user.displayName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
            </div>
          )}

          {/* Verification Badge (if verified) */}
          {user.verified && (
            <div 
              className={cn(
                "absolute -bottom-1 -right-1 rounded-full bg-green-500 text-white",
                "flex items-center justify-center",
                compact ? "h-3 w-3" : "h-4 w-4"
              )}
              title="Verified account"
            >
              <span className={compact ? "text-[8px]" : "text-xs"}>✓</span>
            </div>
          )}
        </div>
      </button>

      {/* User Info Section */}
      <button
        onClick={handleProfileClick}
        className={cn(
          "flex-1 min-w-0 text-left group",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 -m-1",
          "hover:bg-gray-700/50 transition-colors duration-200"
        )}
        aria-label={`View ${user.displayName} profile details`}
      >
        <div className="space-y-0.5">
          {/* Username */}
          <p 
            className={cn(
              "font-medium text-white truncate group-hover:text-green-400 transition-colors",
              compact ? "text-xs" : "text-sm"
            )}
          >
            @{user.username}
          </p>
          
          {/* Display Name */}
          <p 
            className={cn(
              "text-gray-400 truncate",
              compact ? "text-xs" : "text-xs"
            )}
          >
            {user.displayName}
          </p>

          {/* User Role Badge (if not regular user) */}
          {user.role !== 'user' && (
            <span 
              className={cn(
                "inline-block px-1.5 py-0.5 rounded text-xs font-medium",
                "bg-blue-600/20 text-blue-400 border border-blue-600/30",
                compact && "text-xs"
              )}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          )}
        </div>
      </button>

      {/* Logout Button */}
      {showLogout && (
        <button
          onClick={handleLogoutClick}
          className={cn(
            "flex-shrink-0 rounded-md transition-colors duration-200",
            "text-gray-400 hover:text-red-400 hover:bg-red-900/20",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            compact ? "p-1.5" : "p-2"
          )}
          aria-label="Log out of account"
          title="Log out"
        >
          <LogOut 
            className={cn(
              "transition-transform duration-200 hover:scale-110",
              compact ? "h-3 w-3" : "h-4 w-4"
            )}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

/**
 * Compact variant of UserProfile for smaller spaces
 */
interface CompactUserProfileProps extends Omit<UserProfileProps, 'compact'> {}

export function CompactUserProfile(props: CompactUserProfileProps) {
  return <UserProfile {...props} compact={true} />;
}

/**
 * UserProfile variant without logout button
 */
interface UserProfileDisplayProps extends Omit<UserProfileProps, 'showLogout'> {}

export function UserProfileDisplay(props: UserProfileDisplayProps) {
  return <UserProfile {...props} showLogout={false} />;
}

/**
 * Simple user avatar component for use in other parts of the app
 */
interface UserAvatarProps {
  /** User data for avatar display */
  user: Pick<CurrentUser, 'displayName' | 'avatar' | 'verified'>;
  /** Size of the avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when avatar is clicked */
  onClick?: () => void;
}

export function UserAvatar({
  user,
  size = 'md',
  className,
  onClick
}: UserAvatarProps) {
  const [avatarError, setAvatarError] = useState(false);

  // Generate avatar URL using the utility function
  const sizeMap = { sm: 48, md: 80, lg: 128 };
  const avatarUrl = generateAvatarUrl(user.username || user.displayName, sizeMap[size]);
  
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg'
  };

  const badgeSizeClasses = {
    sm: 'h-2 w-2 text-[6px] -bottom-0.5 -right-0.5',
    md: 'h-4 w-4 text-xs -bottom-1 -right-1',
    lg: 'h-6 w-6 text-sm -bottom-1.5 -right-1.5'
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={cn(
        "relative flex-shrink-0",
        onClick && "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full group",
        className
      )}
      {...(onClick && { 'aria-label': `${user.displayName} avatar` })}
    >
      <div 
        className={cn(
          "rounded-full bg-gray-600 flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-green-500 to-green-600",
          onClick && "group-hover:ring-2 group-hover:ring-gray-400 transition-all duration-200",
          sizeClasses[size]
        )}
        role="img"
        aria-label={`${user.displayName} avatar`}
      >
        {!avatarError ? (
          <img
            src={avatarUrl}
            alt={`${user.displayName} avatar`}
            className="h-full w-full object-cover"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white font-medium">
            {user.displayName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
          </div>
        )}
      </div>

      {/* Verification Badge */}
      {user.verified && (
        <div 
          className={cn(
            "absolute rounded-full bg-green-500 text-white",
            "flex items-center justify-center",
            badgeSizeClasses[size]
          )}
          title="Verified account"
        >
          <span>✓</span>
        </div>
      )}
    </Component>
  );
}