/**
 * Mock data for Socialgram layout system
 * Contains user profiles, posts, and navigation data
 * Implements TECH-2: Mock Data Structure and Management
 */

import type {
  User,
  Post,
  NavigationItem,
  NotificationState,
  Comment,
  InteractionState,
  PostEngagement
} from '@/types';

/**
 * Mock data generation utilities
 * Factory pattern for creating consistent test data
 */

// Mock current user
export const mockCurrentUser: User = {
  id: 'current-user',
  username: 'john_doe',
  displayName: 'John Doe',
  avatar: '/avatars/john-doe.jpg',
  verified: false
};

// Mock navigation items
export const mockNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'Home',
    href: '/',
    active: true
  },
  {
    id: 'search',
    label: 'Search',
    icon: 'Search',
    href: '/search',
    active: false
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: 'Compass',
    href: '/explore',
    active: false
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: 'MessageCircle',
    href: '/messages',
    active: false
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'Bell',
    href: '/notifications',
    active: false
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'User',
    href: '/profile',
    active: false
  }
];

// Mock notification counts
export const mockNotifications: NotificationState = {
  messages: 7,
  general: 3,
  total: 10
};

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'emma_creates',
    displayName: 'Emma Creates',
    avatar: '/avatars/emma.jpg',
    verified: true,
    bio: '✨ Creative soul | Coffee enthusiast | City explorer',
    followersCount: 12500,
    followingCount: 892,
    postsCount: 156
  },
  {
    id: '2',
    username: 'alex_adventures',
    displayName: 'Alex Rodriguez',
    avatar: '/avatars/alex.jpg',
    verified: false,
    bio: '🌍 Adventure seeker | Photography lover | Nature enthusiast',
    followersCount: 3200,
    followingCount: 445,
    postsCount: 89
  },
  {
    id: '3',
    username: 'maya_moments',
    displayName: 'Maya Patel',
    avatar: '/avatars/maya.jpg',
    verified: true,
    bio: '📸 Photographer | Art director | Capturing moments',
    followersCount: 8900,
    followingCount: 234,
    postsCount: 312
  },
  {
    id: '4',
    username: 'chef_marco',
    displayName: 'Marco Santos',
    avatar: '/avatars/marco.jpg',
    verified: false,
    bio: '👨‍🍳 Chef | Food lover | Sharing my culinary journey',
    followersCount: 15600,
    followingCount: 678,
    postsCount: 203
  },
  {
    id: '5',
    username: 'fitness_sarah',
    displayName: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    verified: true,
    bio: '💪 Fitness trainer | Wellness coach | Motivating others',
    followersCount: 22100,
    followingCount: 567,
    postsCount: 445
  }
];

// Mock posts data with diverse content
export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0], // Emma Creates
    content: 'Living my best life in the city ✨ Coffee tastes better when you\'re chasing your dreams! #citylife #coffee #dreams',
    image: '/posts/coffee-city.jpg',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    likes: 142,
    comments: 23,
    location: 'Downtown NYC',
    hashtags: ['citylife', 'coffee', 'dreams'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '2',
    user: mockUsers[1], // Alex Adventures
    content: 'Caught the most incredible sunrise this morning 🌅 Nature never fails to amaze me. Sometimes you just need to wake up early and chase the light!',
    image: '/posts/sunrise-mountain.jpg',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5h ago
    likes: 89,
    comments: 12,
    location: 'Rocky Mountain National Park',
    hashtags: ['sunrise', 'nature', 'photography', 'mountains'],
    isLiked: true,
    isBookmarked: true
  },
  {
    id: '3',
    user: mockUsers[2], // Maya Moments
    content: 'Working on a new art piece today. The creative process is such a beautiful journey of discovery. What inspires you to create? 🎨',
    image: '/posts/art-studio.jpg',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8h ago
    likes: 256,
    comments: 45,
    location: 'Brooklyn Art Studio',
    hashtags: ['art', 'creativity', 'inspiration', 'process'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '4',
    user: mockUsers[3], // Chef Marco
    content: 'Fresh pasta made from scratch tonight! 🍝 There\'s something magical about working with your hands and creating something delicious from simple ingredients.',
    image: '/posts/fresh-pasta.jpg',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    likes: 187,
    comments: 34,
    location: 'Home Kitchen',
    hashtags: ['cooking', 'pasta', 'homemade', 'Italian'],
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '5',
    user: mockUsers[4], // Fitness Sarah
    content: 'Morning workout complete! 💪 Remember, consistency is key. Small steps every day lead to big transformations. What\'s your favorite way to stay active?',
    image: '/posts/morning-workout.jpg',
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14h ago
    likes: 445,
    comments: 67,
    location: 'Central Park',
    hashtags: ['fitness', 'motivation', 'health', 'workout'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '6',
    user: mockUsers[0], // Emma Creates
    content: 'Just finished reading an incredible book about mindfulness 📚 It\'s amazing how the right words at the right time can shift your entire perspective.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 78,
    comments: 15,
    hashtags: ['reading', 'mindfulness', 'books', 'growth'],
    isLiked: true,
    isBookmarked: false
  }
];

// Mock comments data
export const mockComments: Comment[] = [
  {
    id: 'c1',
    user: mockUsers[1],
    content: 'This looks absolutely amazing! The lighting in this shot is perfect ✨',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    likes: 12
  },
  {
    id: 'c2',
    user: mockUsers[2],
    content: 'Such a beautiful moment captured! Coffee and city views are the perfect combination ☕',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    likes: 8
  },
  {
    id: 'c3',
    user: mockUsers[3],
    content: 'This is giving me major inspiration for my next adventure! 🌟',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    likes: 5
  }
];

// Data utility functions following technical plan factory pattern

/**
 * Get active navigation item
 * Returns the currently active navigation item
 */
export function getActiveNavItem(): NavigationItem | undefined {
  return mockNavigationItems.find(item => item.active);
}

/**
 * Update navigation state
 * Sets active state for navigation items
 */
export function updateNavigationState(activeId: string): NavigationItem[] {
  return mockNavigationItems.map(item => ({
    ...item,
    active: item.id === activeId
  }));
}

/**
 * Get user by ID
 * Returns user data for a given ID
 */
export function getUserById(userId: string): User | undefined {
  if (userId === mockCurrentUser.id) {
    return mockCurrentUser;
  }
  return mockUsers.find(user => user.id === userId);
}

/**
 * Get posts by user ID
 * Returns all posts for a specific user
 */
export function getPostsByUserId(userId: string): Post[] {
  return mockPosts.filter(post => post.user.id === userId);
}

/**
 * Get comments for a post
 * Returns comments for a specific post ID
 */
export function getCommentsForPost(postId: string): Comment[] {
  // In a real app, this would filter by postId
  // For now, return sample comments
  return mockComments;
}

/**
 * Generate mock interaction state
 * Creates interaction state for a post
 */
export function generateInteractionState(postId: string): InteractionState {
  const post = mockPosts.find(p => p.id === postId);
  return {
    postId,
    isLiked: post?.isLiked || false,
    isBookmarked: post?.isBookmarked || false,
    likeCount: post?.likes || 0
  };
}

/**
 * Get trending hashtags
 * Returns popular hashtags from posts
 */
export function getTrendingHashtags(): { tag: string; count: number }[] {
  const hashtagCounts: Record<string, number> = {};
  
  mockPosts.forEach(post => {
    post.hashtags?.forEach(tag => {
      hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(hashtagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

/**
 * Format timestamp for display
 * Converts timestamp to human-readable format
 */
export function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return '1d';
  if (days < 7) return `${days}d`;
  
  return timestamp.toLocaleDateString();
}

/**
 * Generate mock engagement metrics
 * Creates realistic engagement data for posts
 */
export function generateEngagementMetrics(post: Post): PostEngagement {
  const baseViews = post.likes * 8; // Rough estimate
  return {
    views: baseViews + Math.floor(Math.random() * 100),
    likes: post.likes,
    comments: post.comments,
    shares: Math.floor(post.likes * 0.1),
    bookmarks: Math.floor(post.likes * 0.05),
    clickThroughRate: Math.random() * 0.1 + 0.02
  };
}

/**
 * Search posts by content
 * Basic text search across post content
 */
export function searchPosts(query: string): Post[] {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  return mockPosts.filter(post => 
    post.content.toLowerCase().includes(searchTerm) ||
    post.user.displayName.toLowerCase().includes(searchTerm) ||
    post.user.username.toLowerCase().includes(searchTerm) ||
    post.hashtags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get suggested users
 * Returns users for discovery/suggestions
 */
export function getSuggestedUsers(): User[] {
  return mockUsers.filter(user => user.id !== mockCurrentUser.id).slice(0, 3);
}