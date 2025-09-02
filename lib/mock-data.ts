/**
 * Mock data for Socialgram layout system
 * Contains user profiles, posts, and navigation data
 */

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  location?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export interface NotificationState {
  messages: number;
  general: number;
}

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
  general: 3
};

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'emma_creates',
      displayName: 'Emma Creates',
      avatar: '/avatars/emma.jpg',
      verified: true
    },
    content: 'Living my best life in the city ✨ Coffee tastes better when you\'re chasing your dreams! #citylife #coffee #dreams',
    image: '/posts/coffee-city.jpg',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    likes: 142,
    comments: 23,
    location: 'Downtown NYC'
  }
];

// Helper function to get active navigation item
export function getActiveNavItem(): NavigationItem | undefined {
  return mockNavigationItems.find(item => item.active);
}

// Helper function to update navigation state
export function updateNavigationState(activeId: string): NavigationItem[] {
  return mockNavigationItems.map(item => ({
    ...item,
    active: item.id === activeId
  }));
}