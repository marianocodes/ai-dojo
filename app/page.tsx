import { mockPosts, formatTimestamp, formatLikeCount } from '@/lib/mock-data';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Home page component displaying the main social media feed
 * Demonstrates the layout structure with mock posts and interactions
 * Uses the new MainLayout with sidebar, header, and responsive main content area
 */
export default function Home() {
  // Get sample posts for demonstration
  const samplePost = mockPosts[0]; // emma_creates coffee post matching reference image

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to Socialgram
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          The layout structure is now complete! This demonstrates the fixed sidebar navigation, 
          top header with search, and main content area.
        </p>
      </div>

      {/* Sample Post Card - Matching Reference Design */}
      <div className="max-w-2xl mx-auto">
        <article className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                <div className="text-white text-sm font-medium">
                  {samplePost.author.displayName.charAt(0)}
                </div>
              </div>
              
              {/* User Info */}
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-green-400">
                    {samplePost.author.username}
                  </h3>
                  {samplePost.author.verified && (
                    <div className="text-green-400" title="Verified account">
                      ✓
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin className="h-3 w-3" />
                  <span>{samplePost.author.location}</span>
                  <span>•</span>
                  <span>{formatTimestamp(samplePost.timestamp)}</span>
                </div>
              </div>
            </div>
            
            {/* Post Options */}
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Post Image Placeholder */}
          <div className="relative aspect-square bg-gradient-to-br from-green-600 to-green-800">
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
              Post Image Area
              <br />
              <span className="text-sm opacity-75">(Image from reference design would go here)</span>
            </div>
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
              <p className="text-sm leading-relaxed">
                {samplePost.content}
              </p>
            </div>
          </div>

          {/* Engagement Actions */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors">
                  <Share className="h-6 w-6" />
                </button>
              </div>
              <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>

            {/* Like Count */}
            <p className="font-semibold text-white">
              {formatLikeCount(samplePost.likes)} likes
            </p>

            {/* Comments */}
            <button className="text-gray-400 hover:text-gray-300 text-sm">
              View all {samplePost.comments.length} comments
            </button>

            {/* Add Comment */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-700">
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-xs font-medium">JD</span>
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              <button className="text-green-500 font-semibold text-sm hover:text-green-400">
                Post
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Layout Information */}
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-3">Layout Structure Complete ✅</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• <span className="text-green-400">Fixed Sidebar:</span> Navigation menu with active states and user profile</p>
          <p>• <span className="text-green-400">Top Header:</span> Search bar with notification badges (3 green, 7 red)</p>
          <p>• <span className="text-green-400">Main Content:</span> Responsive area with proper spacing and layout</p>
          <p>• <span className="text-green-400">Dark Theme:</span> Consistent color scheme throughout</p>
          <p>• <span className="text-green-400">Mobile Responsive:</span> Collapsible sidebar and adaptive layout</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-xs text-gray-400">
            Next: TECH-3 will implement the navigation system, TECH-4 the header functionality, 
            and TECH-5 the post components with full interactivity.
          </p>
        </div>
      </div>
    </div>
  );
}
