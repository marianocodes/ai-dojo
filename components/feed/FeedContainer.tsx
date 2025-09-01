'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockPosts } from '@/lib/mock-data';
import PostCard, { PostCardSkeleton } from '@/components/post/PostCard';
import type { Post } from '@/types/social';

/**
 * Main feed container component managing posts and engagement interactions
 * Handles post state management and user engagement tracking
 * Based on architect's example: Client component with posts and engagement state
 * Follows existing pattern: Dark theme with scrollable feed area and responsive design
 */
interface FeedContainerProps {
  /** Optional posts data (defaults to mock data) */
  posts?: Post[];
  /** Optional custom CSS classes */
  className?: string;
  /** Whether to show loading skeletons */
  isLoading?: boolean;
  /** Number of skeleton cards to show when loading */
  skeletonCount?: number;
  /** Maximum width constraint for the feed */
  maxWidth?: string;
  /** Whether posts should have priority loading for images */
  priorityLoading?: boolean;
}

export default function FeedContainer({
  posts = mockPosts,
  className,
  isLoading = false,
  skeletonCount = 3,
  maxWidth = '42rem', // 672px - matches technical plan content maxWidth
  priorityLoading = true
}: FeedContainerProps) {
  // Engagement state management as specified in technical plan
  const [engagements, setEngagements] = useState<Record<string, {
    isLiked: boolean;
    isBookmarked: boolean;
    localLikes: number;
  }>>({});

  // Initialize engagement data for posts
  const postsWithEngagement = useMemo(() => {
    return posts.map(post => ({
      ...post,
      ...engagements[post.id]
    }));
  }, [posts, engagements]);

  // Handle like action
  const handleLike = (postId: string, isLiked: boolean) => {
    setEngagements(prev => {
      const current = prev[postId] || { isLiked: false, isBookmarked: false, localLikes: 0 };
      const post = posts.find(p => p.id === postId);
      const baseLikes = post?.likes || 0;
      
      return {
        ...prev,
        [postId]: {
          ...current,
          isLiked,
          localLikes: isLiked 
            ? (current.localLikes || baseLikes) + (current.isLiked ? 0 : 1)
            : (current.localLikes || baseLikes) - (current.isLiked ? 1 : 0)
        }
      };
    });
    
    // Mock engagement logging
    console.log(`Post ${postId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  // Handle bookmark action
  const handleBookmark = (postId: string, isBookmarked: boolean) => {
    setEngagements(prev => {
      const current = prev[postId] || { isLiked: false, isBookmarked: false, localLikes: 0 };
      
      return {
        ...prev,
        [postId]: {
          ...current,
          isBookmarked
        }
      };
    });
    
    // Mock engagement logging
    console.log(`Post ${postId} ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
  };

  // Handle comment action
  const handleComment = (postId: string) => {
    console.log(`Comment section opened for post ${postId}`);
    // Future implementation: navigate to detailed post view or expand comments
  };

  // Handle share action
  const handleShare = (postId: string) => {
    console.log(`Share dialog opened for post ${postId}`);
    // Mock share functionality
    if (navigator.share) {
      const post = posts.find(p => p.id === postId);
      navigator.share({
        title: `Post by ${post?.author.username}`,
        text: post?.content,
        url: `${window.location.origin}/post/${postId}`
      }).catch(console.error);
    }
  };

  // Handle new comment submission
  const handleNewComment = (postId: string, content: string) => {
    console.log(`New comment on post ${postId}: "${content}"`);
    // Mock comment submission - in real app would update comments array
  };

  // Handle post options
  const handlePostOptions = (postId: string) => {
    console.log(`Post options opened for post ${postId}`);
    // Future implementation: show options menu (report, hide, etc.)
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)} style={{ maxWidth }}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <PostCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className={cn("text-center py-12", className)} style={{ maxWidth }}>
        <div className="text-gray-400">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
          <p className="text-sm">Posts from people you follow will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("space-y-6", className)} 
      style={{ maxWidth }}
    >
      {postsWithEngagement.map((post, index) => {
        const engagement = engagements[post.id] || { 
          isLiked: false, 
          isBookmarked: false, 
          localLikes: post.likes 
        };

        return (
          <PostCard
            key={post.id}
            post={{
              ...post,
              likes: engagement.localLikes || post.likes
            }}
            isLiked={engagement.isLiked}
            isBookmarked={engagement.isBookmarked}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onBookmark={handleBookmark}
            onNewComment={handleNewComment}
            onOptionsClick={handlePostOptions}
            priority={priorityLoading && index < 2} // Prioritize first 2 posts
          />
        );
      })}
    </div>
  );
}

/**
 * Infinite scroll feed container for handling large post lists
 */
interface InfiniteFeedProps extends Omit<FeedContainerProps, 'posts'> {
  /** Function to load more posts */
  onLoadMore?: () => void;
  /** Whether more posts are available */
  hasMore?: boolean;
  /** Whether currently loading more posts */
  isLoadingMore?: boolean;
}

export function InfiniteFeed({
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  ...props
}: InfiniteFeedProps) {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Trigger load more when near bottom (100px threshold)
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !isLoadingMore) {
      onLoadMore?.();
    }
  };

  return (
    <div onScroll={handleScroll} className="overflow-auto">
      <FeedContainer {...props} />
      
      {/* Load more indicator */}
      {isLoadingMore && (
        <div className="py-6 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-green-500 rounded-full" />
            Loading more posts...
          </div>
        </div>
      )}
      
      {/* End of feed indicator */}
      {!hasMore && !isLoadingMore && (
        <div className="py-6 text-center text-gray-500 text-sm">
          You're all caught up! ✨
        </div>
      )}
    </div>
  );
}