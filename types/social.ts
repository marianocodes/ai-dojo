/**
 * TypeScript interfaces for Socialgram social media entities
 * Used by client components for mock data structure and type safety
 */

/**
 * User entity representing social media users
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** Username handle (e.g., 'emma_creates') */
  username: string;
  /** Full display name shown in UI */
  displayName: string;
  /** Optional profile avatar image URL */
  avatar?: string;
  /** Whether user has verified account status */
  verified: boolean;
  /** Optional location information */
  location?: string;
}

/**
 * Comment entity for post interactions
 */
export interface Comment {
  /** Unique identifier for the comment */
  id: string;
  /** User who made the comment */
  author: User;
  /** Comment text content */
  content: string;
  /** When the comment was created */
  timestamp: Date;
  /** Number of likes on the comment */
  likes: number;
}

/**
 * Post entity representing social media posts
 */
export interface Post {
  /** Unique identifier for the post */
  id: string;
  /** User who created the post */
  author: User;
  /** Post text content */
  content: string;
  /** Optional post image URL */
  image?: string;
  /** When the post was created */
  timestamp: Date;
  /** Optional location where post was made */
  location?: string;
  /** Number of likes on the post */
  likes: number;
  /** Array of comments on the post */
  comments: Comment[];
  /** Array of hashtags used in the post */
  hashtags: string[];
  /** Array of mentioned users in the post */
  mentions: string[];
}

/**
 * Notification entity for user alerts
 */
export interface Notification {
  /** Unique identifier for the notification */
  id: string;
  /** Type of notification for styling */
  type: 'general' | 'alert';
  /** Number to display in badge */
  count: number;
  /** Color scheme for the badge */
  color: 'green' | 'red';
  /** Accessible label for screen readers */
  ariaLabel: string;
}

/**
 * Navigation item entity for sidebar navigation
 */
export interface NavigationItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** Route path for Next.js navigation */
  path: string;
  /** Lucide icon name for the navigation item */
  icon: string;
  /** Whether this is the active/current page */
  isActive?: boolean;
  /** Accessible label for screen readers */
  ariaLabel: string;
}

/**
 * Current user session data
 */
export interface CurrentUser extends User {
  /** Whether user is logged in (always true for mock) */
  isAuthenticated: boolean;
  /** User's role or permissions */
  role: 'user' | 'admin' | 'moderator';
}

/**
 * Engagement actions available on posts
 */
export interface PostEngagement {
  /** Whether current user liked this post */
  isLiked: boolean;
  /** Whether current user bookmarked this post */
  isBookmarked: boolean;
  /** Whether comments section is expanded */
  showComments: boolean;
  /** Current comment being typed */
  commentDraft: string;
}