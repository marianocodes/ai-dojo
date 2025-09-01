'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { formatLikeCount } from '@/lib/mock-data';
import { mockCurrentUser } from '@/lib/mock-data';
import type { Comment } from '@/types/social';

/**
 * Reusable post engagement component with interactive controls
 * Handles like, comment, share, and bookmark actions with state management
 * Based on architect's example: Client component with engagement state management
 * Follows existing pattern: Dark theme with hover states and accessibility
 */
interface PostEngagementProps {
  /** Post ID for engagement tracking */
  postId: string;
  /** Number of likes */
  likes: number;
  /** Array of comments */
  comments: Comment[];
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
  /** Optional custom CSS classes */
  className?: string;
  /** Whether to show the comment input section */
  showCommentInput?: boolean;
}

export default function PostEngagement({
  postId,
  likes,
  comments,
  isLiked: initialIsLiked = false,
  isBookmarked: initialIsBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onNewComment,
  className,
  showCommentInput = true
}: PostEngagementProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [commentText, setCommentText] = useState('');
  const [localLikes, setLocalLikes] = useState(likes);

  // Handle like button click
  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalLikes(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(postId, newLikedState);
  };

  // Handle comment button click
  const handleComment = () => {
    console.log(`Comment clicked for post ${postId}`);
    onComment?.(postId);
  };

  // Handle share button click
  const handleShare = () => {
    console.log(`Share clicked for post ${postId}`);
    onShare?.(postId);
  };

  // Handle bookmark button click
  const handleBookmark = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    onBookmark?.(postId, newBookmarkedState);
  };

  // Handle new comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log(`New comment on post ${postId}: ${commentText}`);
      onNewComment?.(postId, commentText);
      setCommentText('');
    }
  };

  // Handle comment input key press
  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <div className={cn("p-4 space-y-3", className)}>
      {/* Engagement Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button 
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 transition-colors duration-200",
              isLiked 
                ? "text-red-500 hover:text-red-600" 
                : "text-gray-400 hover:text-red-500"
            )}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <Heart 
              className={cn(
                "h-6 w-6 transition-transform duration-200",
                isLiked ? "fill-current scale-110" : "hover:scale-110"
              )}
            />
          </button>
          
          {/* Comment Button */}
          <button 
            onClick={handleComment}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
            aria-label="Comment on post"
          >
            <MessageCircle className="h-6 w-6 hover:scale-110 transition-transform duration-200" />
          </button>
          
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors duration-200"
            aria-label="Share post"
          >
            <Share className="h-6 w-6 hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
        
        {/* Bookmark Button */}
        <button 
          onClick={handleBookmark}
          className={cn(
            "transition-colors duration-200",
            isBookmarked 
              ? "text-yellow-500 hover:text-yellow-600" 
              : "text-gray-400 hover:text-yellow-500"
          )}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
        >
          <Bookmark 
            className={cn(
              "h-6 w-6 transition-transform duration-200",
              isBookmarked ? "fill-current scale-110" : "hover:scale-110"
            )}
          />
        </button>
      </div>

      {/* Like Count */}
      <p className="font-semibold text-white">
        {formatLikeCount(localLikes)} likes
      </p>

      {/* Comments */}
      <button 
        onClick={handleComment}
        className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200"
      >
        View all {comments.length} comments
      </button>

      {/* Add Comment */}
      {showCommentInput && (
        <div className="flex items-center gap-3 pt-2 border-t border-gray-700">
          {/* Current User Avatar */}
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            <span className="text-white text-xs font-medium">
              {mockCurrentUser.displayName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
            </span>
          </div>
          
          {/* Comment Input */}
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={handleCommentKeyPress}
            className={cn(
              "flex-1 bg-transparent text-white placeholder-gray-500",
              "focus:outline-none text-sm",
              "focus:placeholder-gray-400 transition-colors duration-200"
            )}
            aria-label="Add a comment"
          />
          
          {/* Post Button */}
          <button
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
            className={cn(
              "font-semibold text-sm transition-colors duration-200",
              commentText.trim()
                ? "text-green-500 hover:text-green-400"
                : "text-gray-500 cursor-not-allowed"
            )}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Simplified engagement component without comment input
 */
interface SimpleEngagementProps extends Omit<PostEngagementProps, 'showCommentInput' | 'onNewComment'> {}

export function SimpleEngagement(props: SimpleEngagementProps) {
  return <PostEngagement {...props} showCommentInput={false} />;
}

/**
 * Engagement stats component for displaying counts only
 */
interface EngagementStatsProps {
  /** Number of likes */
  likes: number;
  /** Number of comments */
  comments: number;
  /** Number of shares (optional) */
  shares?: number;
  /** Optional custom CSS classes */
  className?: string;
}

export function EngagementStats({
  likes,
  comments,
  shares,
  className
}: EngagementStatsProps) {
  return (
    <div className={cn("flex items-center gap-4 text-sm text-gray-400", className)}>
      <span>{formatLikeCount(likes)} likes</span>
      <span>{comments} comments</span>
      {shares !== undefined && <span>{shares} shares</span>}
    </div>
  );
}