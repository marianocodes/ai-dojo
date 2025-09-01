'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, MapPin } from 'lucide-react';
import { formatTimestamp, generateAvatarUrl } from '@/lib/mock-data';
import type { User } from '@/types/social';

/**
 * Reusable post header component with user profile information
 * Displays user avatar, username, verification badge, location, and timestamp
 * Based on architect's example: Client component with user profile display
 * Follows existing pattern: Dark theme with proper accessibility and responsive design
 */
interface PostHeaderProps {
  /** Post author information */
  author: User;
  /** Post timestamp */
  timestamp: Date;
  /** Post location (optional) */
  location?: string;
  /** Optional custom CSS classes */
  className?: string;
  /** Function called when options menu is clicked */
  onOptionsClick?: () => void;
  /** Whether to show the options menu button */
  showOptions?: boolean;
}

export default function PostHeader({
  author,
  timestamp,
  location,
  className,
  onOptionsClick,
  showOptions = true
}: PostHeaderProps) {
  const [avatarError, setAvatarError] = useState(false);

  // Generate avatar URL using the utility function
  const avatarUrl = generateAvatarUrl(author.username, 80);

  // Handle options menu click
  const handleOptionsClick = () => {
    console.log(`Options clicked for post by ${author.username}`);
    onOptionsClick?.();
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4",
      className
    )}>
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            {!avatarError ? (
              <img
                src={avatarUrl}
                alt={`${author.displayName} avatar`}
                className="h-full w-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              /* Fallback Avatar with Initials */
              <div className="h-full w-full flex items-center justify-center text-white text-sm font-medium bg-gradient-to-br from-green-500 to-green-600">
                {author.displayName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
              </div>
            )}
          </div>

          {/* Verification Badge */}
          {author.verified && (
            <div 
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-white flex items-center justify-center"
              title="Verified account"
            >
              <span className="text-xs">✓</span>
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold text-green-400">
              {author.username}
            </h3>
            {author.verified && (
              <div className="text-green-400" title="Verified account">
                ✓
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            {location && (
              <>
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
                <span>•</span>
              </>
            )}
            <span>{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
      
      {/* Post Options */}
      {showOptions && (
        <button 
          onClick={handleOptionsClick}
          className={cn(
            "p-2 hover:bg-gray-700 rounded-full transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          aria-label="Post options"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}

/**
 * Compact variant of PostHeader for smaller spaces
 */
interface CompactPostHeaderProps extends Omit<PostHeaderProps, 'showOptions'> {}

export function CompactPostHeader(props: CompactPostHeaderProps) {
  return <PostHeader {...props} showOptions={false} />;
}

/**
 * Simple user info component for use in other contexts
 */
interface UserInfoProps {
  /** User information */
  user: User;
  /** Optional timestamp to display */
  timestamp?: Date;
  /** Optional custom CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function UserInfo({
  user,
  timestamp,
  className,
  size = 'md'
}: UserInfoProps) {
  const [avatarError, setAvatarError] = useState(false);

  // Generate avatar URL using the utility function
  const avatarUrl = generateAvatarUrl(user.username, 64);

  const sizeClasses = {
    sm: { avatar: 'h-6 w-6', text: 'text-xs', name: 'text-sm' },
    md: { avatar: 'h-8 w-8', text: 'text-sm', name: 'text-base' },
    lg: { avatar: 'h-10 w-10', text: 'text-sm', name: 'text-lg' }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* User Avatar */}
      <div className={cn("rounded-full bg-gray-600 flex items-center justify-center overflow-hidden", sizes.avatar)}>
        {!avatarError ? (
          <img
            src={avatarUrl}
            alt={`${user.displayName} avatar`}
            className="h-full w-full object-cover"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-green-500 to-green-600">
            {user.displayName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
          </div>
        )}
      </div>

      {/* User Details */}
      <div>
        <div className="flex items-center gap-1">
          <span className={cn("font-semibold text-green-400", sizes.name)}>
            {user.username}
          </span>
          {user.verified && (
            <span className="text-green-400" title="Verified account">✓</span>
          )}
        </div>
        {timestamp && (
          <div className={cn("text-gray-400", sizes.text)}>
            {formatTimestamp(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
}