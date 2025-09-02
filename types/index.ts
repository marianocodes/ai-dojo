/**
 * Type definitions for Socialgram application
 * Centralized TypeScript interfaces and types
 * Follows technical plan TECH-2 specifications
 */

/**
 * User profile interface
 * Represents a user on the platform
 */
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}

/**
 * Post interface
 * Represents a social media post with all associated data
 */
export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  location?: string;
  hashtags?: string[];
  isLiked?: boolean;
  isBookmarked?: boolean;
}

/**
 * Comment interface
 * Represents a comment on a post
 */
export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  parentId?: string; // For nested comments
}

/**
 * Navigation item interface
 * Represents sidebar navigation items
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
  badge?: number; // For notification counts
}

/**
 * Notification state interface
 * Tracks notification counts by type
 */
export interface NotificationState {
  messages: number;
  general: number;
  total: number;
}

/**
 * Search result interface
 * Represents search results for posts, users, hashtags
 */
export interface SearchResult {
  type: 'user' | 'post' | 'hashtag';
  data: User | Post | { tag: string; count: number };
}

/**
 * Interactive state interface
 * Tracks user interactions with posts
 */
export interface InteractionState {
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
}

/**
 * Layout context interface
 * Manages layout state across components
 */
export interface LayoutContextType {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

/**
 * Feed filter options
 * Controls what content is displayed in the feed
 */
export interface FeedFilter {
  type: 'all' | 'following' | 'trending';
  timeRange?: 'today' | 'week' | 'month' | 'all';
}

/**
 * Media type enum
 * Defines supported media types for posts
 */
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  GIF = 'gif'
}

/**
 * Post engagement metrics
 * Detailed analytics for posts
 */
export interface PostEngagement {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  clickThroughRate?: number;
}

/**
 * User preferences interface
 * Stores user settings and preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    messages: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    activityStatus: boolean;
  };
}

// Type utilities for better type safety

/**
 * Partial user for lightweight operations
 */
export type UserSummary = Pick<User, 'id' | 'username' | 'displayName' | 'avatar' | 'verified'>;

/**
 * Post without user details for efficient loading
 */
export type PostPreview = Omit<Post, 'user'> & { userId: string };

/**
 * Navigation item without active state
 */
export type NavigationItemConfig = Omit<NavigationItem, 'active'>;

/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination interface
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: Pagination;
}

export default {
  User,
  Post,
  Comment,
  NavigationItem,
  NotificationState,
  SearchResult,
  InteractionState,
  LayoutContextType,
  FeedFilter,
  MediaType,
  PostEngagement,
  UserPreferences
};