/**
 * Mock data for Socialgram social media entities
 * Provides static data for client components without backend dependencies
 * Based on the reference design showing emma_creates post in Downtown NYC
 */

import type { User, Post, Comment, CurrentUser } from '@/types/social';

/**
 * Mock users data
 */
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'emma_creates',
    displayName: 'Emma Creates',
    avatar: '/mock-avatars/emma.jpg',
    verified: true,
    location: 'Downtown NYC',
  },
  {
    id: '2',
    username: 'john_doe',
    displayName: 'John Doe',
    avatar: '/mock-avatars/john.jpg',
    verified: false,
    location: 'Brooklyn, NY',
  },
  {
    id: '3',
    username: 'sarah_designs',
    displayName: 'Sarah Wilson',
    avatar: '/mock-avatars/sarah.jpg',
    verified: true,
    location: 'Manhattan, NY',
  },
  {
    id: '4',
    username: 'mike_photos',
    displayName: 'Mike Photography',
    avatar: '/mock-avatars/mike.jpg',
    verified: false,
    location: 'Queens, NY',
  },
  {
    id: '5',
    username: 'lisa_travels',
    displayName: 'Lisa Adventures',
    avatar: '/mock-avatars/lisa.jpg',
    verified: true,
    location: 'Central Park, NY',
  },
];

/**
 * Mock comments data
 */
export const mockComments: Comment[] = [
  {
    id: 'c1',
    author: mockUsers[1], // john_doe
    content: 'Love this vibe! NYC coffee hits different ☕️',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    likes: 12,
  },
  {
    id: 'c2',
    author: mockUsers[2], // sarah_designs
    content: 'That green coat is absolutely stunning! Where did you get it?',
    timestamp: new Date('2024-01-15T11:15:00Z'),
    likes: 8,
  },
  {
    id: 'c3',
    author: mockUsers[3], // mike_photos
    content: 'Perfect capture of the city energy ✨',
    timestamp: new Date('2024-01-15T12:00:00Z'),
    likes: 5,
  },
];

/**
 * Mock posts data based on reference design
 */
export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[0], // emma_creates
    content: `Living my best life in the city ✨ Coffee tastes better when you're chasing your dreams! #citylife #coffee #dreams`,
    image: '/mock-posts/emma-coffee-city.jpg',
    timestamp: new Date('2024-01-15T09:45:00Z'),
    location: 'Downtown NYC',
    likes: 142,
    comments: mockComments,
    hashtags: ['citylife', 'coffee', 'dreams'],
    mentions: [],
  },
  {
    id: 'p2',
    author: mockUsers[2], // sarah_designs
    content: `New design project in the works! Sometimes the best inspiration comes from unexpected places 🎨 What inspires you?`,
    image: '/mock-posts/sarah-design.jpg',
    timestamp: new Date('2024-01-15T08:20:00Z'),
    location: 'Manhattan, NY',
    likes: 89,
    comments: [
      {
        id: 'c4',
        author: mockUsers[0],
        content: 'Your work always amazes me! Can\'t wait to see the final result 🔥',
        timestamp: new Date('2024-01-15T08:45:00Z'),
        likes: 15,
      },
    ],
    hashtags: ['design', 'inspiration', 'creativity'],
    mentions: [],
  },
  {
    id: 'p3',
    author: mockUsers[3], // mike_photos
    content: `Golden hour magic in the city 📸 There's something about this time of day that makes everything look cinematic`,
    image: '/mock-posts/mike-golden-hour.jpg',
    timestamp: new Date('2024-01-15T07:10:00Z'),
    location: 'Brooklyn Bridge',
    likes: 234,
    comments: [
      {
        id: 'c5',
        author: mockUsers[4],
        content: 'This is absolutely breathtaking! The lighting is perfect 😍',
        timestamp: new Date('2024-01-15T07:30:00Z'),
        likes: 22,
      },
      {
        id: 'c6',
        author: mockUsers[1],
        content: 'You have such a great eye for photography!',
        timestamp: new Date('2024-01-15T07:45:00Z'),
        likes: 18,
      },
    ],
    hashtags: ['photography', 'goldenhour', 'nyc'],
    mentions: [],
  },
  {
    id: 'p4',
    author: mockUsers[4], // lisa_travels
    content: `Found the perfect spot for some weekend relaxation 🌳 Central Park never disappoints! Who wants to join me for a picnic?`,
    image: '/mock-posts/lisa-park.jpg',
    timestamp: new Date('2024-01-15T06:30:00Z'),
    location: 'Central Park, NY',
    likes: 67,
    comments: [
      {
        id: 'c7',
        author: mockUsers[0],
        content: 'Count me in! I know the perfect spot for sandwiches 🥪',
        timestamp: new Date('2024-01-15T06:45:00Z'),
        likes: 8,
      },
    ],
    hashtags: ['centralpark', 'weekend', 'picnic', 'nature'],
    mentions: [],
  },
  {
    id: 'p5',
    author: mockUsers[1], // john_doe
    content: `Monday motivation: Remember that every expert was once a beginner 💪 What new skill are you working on this week?`,
    timestamp: new Date('2024-01-15T06:00:00Z'),
    location: 'Brooklyn, NY',
    likes: 156,
    comments: [
      {
        id: 'c8',
        author: mockUsers[2],
        content: 'Learning to code! It\'s challenging but so rewarding 👨‍💻',
        timestamp: new Date('2024-01-15T06:15:00Z'),
        likes: 25,
      },
      {
        id: 'c9',
        author: mockUsers[3],
        content: 'Working on my Spanish! ¡Hola amigos! 🇪🇸',
        timestamp: new Date('2024-01-15T06:20:00Z'),
        likes: 12,
      },
    ],
    hashtags: ['motivation', 'learning', 'mondaymood'],
    mentions: [],
  },
];

/**
 * Current user session (john_doe as the logged-in user)
 */
export const mockCurrentUser: CurrentUser = {
  id: '2',
  username: 'john_doe',
  displayName: 'John Doe',
  avatar: '/mock-avatars/john.jpg',
  verified: false,
  location: 'Brooklyn, NY',
  isAuthenticated: true,
  role: 'user',
};

/**
 * Helper functions for mock data manipulation
 */

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

/**
 * Get user by username
 */
export function getUserByUsername(username: string): User | undefined {
  return mockUsers.find(user => user.username === username);
}

/**
 * Get posts by user ID
 */
export function getPostsByUserId(userId: string): Post[] {
  return mockPosts.filter(post => post.author.id === userId);
}

/**
 * Get posts sorted by timestamp (newest first)
 */
export function getPostsSortedByTime(): Post[] {
  return [...mockPosts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Format timestamp for display (e.g., "2h", "1d")
 */
export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks}w`;
  }
}

/**
 * Format like count for display (e.g., "1.2K", "142")
 */
export function formatLikeCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Extract hashtags from post content
 */
export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const matches = content.match(hashtagRegex);
  return matches ? matches.map(tag => tag.substring(1)) : [];
}

/**
 * Extract mentions from post content
 */
export function extractMentions(content: string): string[] {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  const matches = content.match(mentionRegex);
  return matches ? matches.map(mention => mention.substring(1)) : [];
}

/**
 * Generate mock avatar URL (fallback for missing avatars)
 */
export function generateAvatarUrl(username: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6366f1&color=fff&size=40`;
}

/**
 * Generate mock post image URL (fallback for missing images)
 */
export function generatePostImageUrl(postId: string): string {
  return `https://picsum.photos/600/400?random=${postId}`;
}