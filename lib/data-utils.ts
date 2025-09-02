/**
 * Data utility functions for Socialgram
 * Complementary utilities for mock data management
 * Follows technical plan TECH-2 factory pattern implementation
 */

import type {
  User,
  Post,
  Comment,
  NavigationItem,
  InteractionState,
  PostEngagement,
  SearchResult,
  FeedFilter,
  PaginatedResponse,
  ApiResponse
} from '@/types';

import {
  mockUsers,
  mockPosts,
  mockComments,
  mockCurrentUser,
  getUserById,
  getPostsByUserId
} from '@/lib/mock-data';

/**
 * Data generation utilities
 * Factory functions for creating consistent test data
 */

/**
 * Generate mock user data
 * Creates a new user with realistic data
 */
export function generateMockUser(overrides: Partial<User> = {}): User {
  const baseUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username: `user${Math.floor(Math.random() * 1000)}`,
    displayName: 'Mock User',
    avatar: `/avatars/default.jpg`,
    verified: Math.random() > 0.8, // 20% chance of being verified
    bio: 'Generated mock user for testing',
    followersCount: Math.floor(Math.random() * 10000),
    followingCount: Math.floor(Math.random() * 1000),
    postsCount: Math.floor(Math.random() * 500)
  };

  return { ...baseUser, ...overrides };
}

/**
 * Generate mock post data
 * Creates a new post with realistic engagement metrics
 */
export function generateMockPost(user: User, overrides: Partial<Post> = {}): Post {
  const basePost: Post = {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    user,
    content: 'This is a generated mock post for testing purposes.',
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    hashtags: ['mock', 'test'],
    isLiked: Math.random() > 0.5,
    isBookmarked: Math.random() > 0.8
  };

  basePost.comments = Math.floor(basePost.likes * 0.1); // Comments are typically ~10% of likes

  return { ...basePost, ...overrides };
}

/**
 * Generate mock comment data
 * Creates a new comment for a post
 */
export function generateMockComment(user: User, overrides: Partial<Comment> = {}): Comment {
  const baseComment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    user,
    content: 'This is a generated mock comment.',
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random time within last day
    likes: Math.floor(Math.random() * 50)
  };

  return { ...baseComment, ...overrides };
}

/**
 * Data retrieval utilities
 * Functions for accessing and filtering mock data
 */

/**
 * Get paginated posts
 * Returns posts with pagination metadata
 */
export function getPaginatedPosts(
  page: number = 1, 
  limit: number = 10,
  filter?: FeedFilter
): PaginatedResponse<Post> {
  let filteredPosts = [...mockPosts];

  // Apply filters
  if (filter?.type === 'following') {
    // Mock: only show posts from followed users (simplified)
    filteredPosts = filteredPosts.slice(0, Math.ceil(filteredPosts.length * 0.6));
  } else if (filter?.type === 'trending') {
    // Mock: sort by engagement for trending
    filteredPosts = filteredPosts.sort((a, b) => 
      (b.likes + b.comments) - (a.likes + a.comments)
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedPosts,
    pagination: {
      page,
      limit,
      total: filteredPosts.length,
      hasMore: endIndex < filteredPosts.length
    }
  };
}

/**
 * Search across multiple content types
 * Returns unified search results
 */
export function performGlobalSearch(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();

  // Search users
  const userResults = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm) ||
    user.displayName.toLowerCase().includes(searchTerm)
  ).map(user => ({
    type: 'user' as const,
    data: user
  }));

  // Search posts
  const postResults = mockPosts.filter(post =>
    post.content.toLowerCase().includes(searchTerm) ||
    post.hashtags?.some(tag => tag.toLowerCase().includes(searchTerm))
  ).map(post => ({
    type: 'post' as const,
    data: post
  }));

  // Search hashtags
  const hashtagCounts: Record<string, number> = {};
  mockPosts.forEach(post => {
    post.hashtags?.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
      }
    });
  });

  const hashtagResults = Object.entries(hashtagCounts).map(([tag, count]) => ({
    type: 'hashtag' as const,
    data: { tag, count }
  }));

  return [...userResults, ...postResults, ...hashtagResults];
}

/**
 * Get user feed recommendations
 * Returns recommended posts based on user preferences
 */
export function getRecommendedPosts(userId: string, limit: number = 10): Post[] {
  // Mock recommendation algorithm
  const userPosts = getPostsByUserId(userId);
  const userHashtags = userPosts.flatMap(post => post.hashtags || []);
  
  // Find posts with similar hashtags
  const recommendations = mockPosts
    .filter(post => post.user.id !== userId)
    .filter(post => 
      post.hashtags?.some(tag => userHashtags.includes(tag))
    )
    .sort((a, b) => b.likes - a.likes) // Sort by popularity
    .slice(0, limit);

  return recommendations;
}

/**
 * Data transformation utilities
 * Functions for formatting and processing data
 */

/**
 * Transform posts for efficient rendering
 * Optimizes post data for UI consumption
 */
export function transformPostsForFeed(posts: Post[]): Post[] {
  return posts.map(post => ({
    ...post,
    // Add computed properties for UI
    timeAgo: formatTimeAgo(post.timestamp),
    engagementRate: calculateEngagementRate(post),
    isRecent: isPostRecent(post.timestamp)
  })) as Post[];
}

/**
 * Format relative time display
 * Converts timestamp to human-readable relative time
 */
export function formatTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) return 'now';
  if (diff < hour) return `${Math.floor(diff / minute)}m`;
  if (diff < day) return `${Math.floor(diff / hour)}h`;
  if (diff < week) return `${Math.floor(diff / day)}d`;
  if (diff < month) return `${Math.floor(diff / week)}w`;
  if (diff < year) return `${Math.floor(diff / month)}mo`;
  return `${Math.floor(diff / year)}y`;
}

/**
 * Calculate engagement rate for posts
 * Returns engagement percentage based on likes and comments
 */
export function calculateEngagementRate(post: Post): number {
  const totalEngagement = post.likes + post.comments;
  const followerEstimate = post.user.followersCount || 1000; // Default estimate
  return Math.round((totalEngagement / followerEstimate) * 100 * 100) / 100; // Round to 2 decimal places
}

/**
 * Check if post is recent (within 24 hours)
 */
export function isPostRecent(timestamp: Date): boolean {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return timestamp > oneDayAgo;
}

/**
 * Validation utilities
 * Data validation and sanitization functions
 */

/**
 * Validate post content
 * Checks if post content meets requirements
 */
export function validatePostContent(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!content.trim()) {
    errors.push('Post content cannot be empty');
  }
  
  if (content.length > 280) {
    errors.push('Post content cannot exceed 280 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user input
 * Removes potentially harmful content from user input
 */
export function sanitizeUserInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+="[^"]*"/gi, ''); // Remove event handlers
}

/**
 * Extract hashtags from content
 * Finds and returns hashtags from post content
 */
export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const hashtags: string[] = [];
  let match;
  
  while ((match = hashtagRegex.exec(content)) !== null) {
    hashtags.push(match[1].toLowerCase());
  }
  
  return [...new Set(hashtags)]; // Remove duplicates
}

/**
 * Cache utilities
 * Simple caching for improved performance
 */
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached data or execute function
 * Simple caching mechanism for expensive operations
 */
export function getCachedData<T>(key: string, fn: () => T): T {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = fn();
  cache.set(key, { data, timestamp: now });
  return data;
}

/**
 * Clear all cached data
 * Utility for cache management
 */
export function clearCache(): void {
  cache.clear();
}

// Export all utility functions
export default {
  generateMockUser,
  generateMockPost,
  generateMockComment,
  getPaginatedPosts,
  performGlobalSearch,
  getRecommendedPosts,
  transformPostsForFeed,
  formatTimeAgo,
  calculateEngagementRate,
  isPostRecent,
  validatePostContent,
  sanitizeUserInput,
  extractHashtags,
  getCachedData,
  clearCache
};