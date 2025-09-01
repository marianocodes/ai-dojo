/**
 * Constants for Socialgram UI text, navigation, and configuration
 * Used by client components for consistent messaging and structure
 */

import type { NavigationItem, Notification } from '@/types/social';

/**
 * Brand configuration
 */
export const BRAND = {
  name: 'Socialgram',
  logo: '🌐', // Emoji as placeholder for actual logo
  tagline: 'Connect, Share, Discover',
} as const;

/**
 * Main navigation items for sidebar
 * Icons use Lucide React icon names
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    isActive: true,
    ariaLabel: 'Navigate to home feed',
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
    ariaLabel: 'Search posts, people, and hashtags',
  },
  {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: 'Compass',
    ariaLabel: 'Explore trending content',
  },
  {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: 'MessageSquare',
    ariaLabel: 'View direct messages',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
    ariaLabel: 'View notifications and alerts',
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    ariaLabel: 'View your profile',
  },
];

/**
 * Secondary navigation item (separated in UI)
 */
export const SETTINGS_NAVIGATION: NavigationItem = {
  id: 'settings',
  label: 'Settings',
  path: '/settings',
  icon: 'Settings',
  ariaLabel: 'Access application settings',
};

/**
 * Mock notification data for header badges
 */
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'general',
    type: 'general',
    count: 3,
    color: 'green',
    ariaLabel: '3 new general notifications',
  },
  {
    id: 'alerts',
    type: 'alert',
    count: 7,
    color: 'red',
    ariaLabel: '7 new alert notifications',
  },
];

/**
 * UI text constants
 */
export const UI_TEXT = {
  search: {
    placeholder: 'Search posts, people, hashtags...',
    ariaLabel: 'Search input field',
  },
  post: {
    viewComments: (count: number) => `View all ${count} comments`,
    addComment: 'Add a comment...',
    postButton: 'Post',
    likeButton: 'Like post',
    commentButton: 'Comment on post',
    shareButton: 'Share post',
    bookmarkButton: 'Bookmark post',
  },
  profile: {
    logoutButton: 'Log out of account',
    logoutAriaLabel: 'Log out',
  },
  loading: {
    posts: 'Loading posts...',
    profile: 'Loading profile...',
    general: 'Loading...',
  },
  errors: {
    loadingFailed: 'Unable to load content. Please try again.',
    networkError: 'Connection lost. Checking for updates...',
    imageUnavailable: 'Image temporarily unavailable',
  },
} as const;

/**
 * Responsive breakpoints (px values)
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  large: 1440,
  xl: 2560,
} as const;

/**
 * Layout dimensions and spacing
 */
export const LAYOUT = {
  sidebar: {
    width: '256px', // 16rem
    collapsedWidth: '64px', // 4rem
    zIndex: 30,
  },
  header: {
    height: '64px', // 4rem
    zIndex: 40,
  },
  content: {
    maxWidth: '672px', // 42rem for feed
    padding: '24px', // 1.5rem
  },
} as const;

/**
 * Theme and color constants
 */
export const THEME = {
  colors: {
    primary: 'hsl(var(--primary))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    accent: {
      green: '#10B981', // Bright green for active states
      red: '#EF4444',   // Red for notifications/alerts
    },
  },
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
} as const;

/**
 * Animation and transition constants
 */
export const ANIMATIONS = {
  durations: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easings: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
} as const;

/**
 * Accessibility constants
 */
export const A11Y = {
  minimumTouchTarget: 44, // px - WCAG minimum touch target size
  focusRing: 'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  skipLink: 'Skip to main content',
} as const;