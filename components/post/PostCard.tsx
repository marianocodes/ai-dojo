'use client';

import React, { useState, memo } from 'react';
import { cn } from '@/lib/utils';
import { generatePostImageUrl } from '@/lib/mock-data';
import PostHeader from './PostHeader';
import PostEngagement from './PostEngagement';
import type { Post } from '@/types/social';

/**
 * Individual post card component with header, content, and engagement sections
 * Uses compound component pattern for modularity and reusability
 * Based on architect's example: Client component with post structure composition
 * Follows existing pattern: Dark theme with responsive image handling and content display
 */
interface PostCardProps {
  /** Post data to display */
  post: Post;
  /** Whether the current user has liked this post */
  isLiked?: boolean;
  /** Whether the current user has bookmarked this post */
  isBookmarked?: boolean;
  /** Function called when like button is clicked */
  onLike?: (postId: string, isLiked: boolean) => void;
  /** Function called when comment button is clicked */
  onComment?: (postId: string) => void;
  /** Function called when share button is clicked */
  onShare?: (postId: string) => void;
  /** Function called when bookmark button is clicked */
  onBookmark?: (postId: string, isBookmarked: boolean) => void;
  /** Function called when new comment is posted */
  onNewComment?: (postId: string, content: string) => void;
  /** Function called when post options are clicked */
  onOptionsClick?: (postId: string) => void;
  /** Optional custom CSS classes */
  className?: string;
  /** Whether to show the comment input section */
  showCommentInput?: boolean;
  /** Image loading priority for Next.js Image optimization */
  priority?: boolean;
}

const PostCard = memo(function PostCard({
  post,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onNewComment,
  onOptionsClick,
  className,
  showCommentInput = true,
  priority = false
}: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Always use generated image URL for consistent loading
  const imageUrl = generatePostImageUrl(post.id);

  // Handle post options click
  const handleOptionsClick = () => {
    onOptionsClick?.(post.id);
  };

  // Process content for hashtags and mentions (visual styling only)
  const processContent = (content: string) => {
    return content.replace(
      /#(\w+)/g,
      '<span class="text-blue-400 hover:text-blue-300 cursor-pointer">#$1</span>'
    ).replace(
      /@(\w+)/g,
      '<span class="text-green-400 hover:text-green-300 cursor-pointer">@$1</span>'
    );
  };

  return (
    <article className={cn(
      "bg-gray-800 border border-gray-700 rounded-lg overflow-hidden",
      "transition-all duration-200 hover:border-gray-600",
      className
    )}>
      {/* Post Header */}
      <PostHeader
        author={post.author}
        timestamp={post.timestamp}
        location={post.location}
        onOptionsClick={handleOptionsClick}
      />

      {/* Post Image */}
      <div className="relative aspect-square bg-gradient-to-br from-green-600 to-green-800">
        <img
          src={imageUrl}
          alt={`Post by ${post.author.username}`}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            imageLoaded && !imageError ? "opacity-100" : "opacity-0"
          )}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          loading={priority ? "eager" : "lazy"}
        />
        
        {/* Loading/Error State Overlay */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              {!imageLoaded && !imageError ? (
                /* Loading State */
                <>
                  <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mb-2 mx-auto"></div>
                  <div className="text-sm opacity-75">Loading image...</div>
                </>
              ) : (
                /* Error/Fallback State */
                <>
                  <div className="text-6xl mb-4 opacity-90">📷</div>
                  <div className="text-lg font-medium mb-2">Post by {post.author.username}</div>
                  <div className="text-sm opacity-75 px-4">
                    Image unavailable
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
          <p 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />
        </div>
      </div>


      {/* Engagement Section */}
      <PostEngagement
        postId={post.id}
        likes={post.likes}
        comments={post.comments}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onBookmark={onBookmark}
        onNewComment={onNewComment}
        showCommentInput={showCommentInput}
      />
    </article>
  );
});

export default PostCard;

/**
 * Compact variant of PostCard for smaller spaces or previews
 */
interface CompactPostCardProps extends Omit<PostCardProps, 'showCommentInput'> {
  /** Maximum number of lines to show for content */
  maxLines?: number;
}

export const CompactPostCard = memo(function CompactPostCard({
  maxLines = 2,
  ...props
}: CompactPostCardProps) {
  return (
    <div className="transform scale-95">
      <PostCard 
        {...props} 
        showCommentInput={false}
        className={cn(
          "text-sm",
          maxLines && `line-clamp-${maxLines}`,
          props.className
        )}
      />
    </div>
  );
});

/**
 * Post card skeleton for loading states
 */
export function PostCardSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn(
      "bg-gray-800 border border-gray-700 rounded-lg overflow-hidden animate-pulse",
      className
    )}>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-600" />
          <div>
            <div className="h-4 w-24 bg-gray-600 rounded mb-1" />
            <div className="h-3 w-32 bg-gray-700 rounded" />
          </div>
        </div>
        <div className="h-6 w-6 bg-gray-600 rounded" />
      </div>

      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-700" />

      {/* Engagement Skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-6 w-6 bg-gray-600 rounded" />
            <div className="h-6 w-6 bg-gray-600 rounded" />
            <div className="h-6 w-6 bg-gray-600 rounded" />
          </div>
          <div className="h-6 w-6 bg-gray-600 rounded" />
        </div>
        <div className="h-4 w-20 bg-gray-600 rounded" />
        <div className="h-3 w-28 bg-gray-700 rounded" />
        <div className="flex items-center gap-3 pt-2 border-t border-gray-700">
          <div className="h-8 w-8 bg-gray-600 rounded-full" />
          <div className="h-4 flex-1 bg-gray-700 rounded" />
          <div className="h-4 w-12 bg-gray-700 rounded" />
        </div>
      </div>
    </article>
  );
}