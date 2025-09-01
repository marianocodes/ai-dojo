import FeedContainer from '@/components/feed/FeedContainer';

/**
 * Home page component displaying the main social media feed
 * Refactored to use modular FeedContainer and PostCard components
 * Uses the new MainLayout with sidebar, header, and responsive main content area
 */
export default function Home() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to Socialgram
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Your social media feed with interactive posts, engagement controls, and real-time updates.
        </p>
      </div>

      {/* Main Feed Container */}
      <div className="max-w-2xl mx-auto">
        <FeedContainer />
      </div>

      {/* Feature Information */}
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-3">Interactive Feed Features ✨</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• <span className="text-green-400">Post Engagement:</span> Like, comment, share, and bookmark functionality</p>
          <p>• <span className="text-green-400">Modular Components:</span> PostCard, PostHeader, and PostEngagement</p>
          <p>• <span className="text-green-400">Content Processing:</span> Hashtag and mention styling support</p>
          <p>• <span className="text-green-400">State Management:</span> Real-time engagement tracking</p>
          <p>• <span className="text-green-400">Responsive Design:</span> Mobile-optimized touch interactions</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-xs text-gray-400">
            Try interacting with the posts above! Like, comment, and bookmark functionality is fully working 
            with mock data and state management.
          </p>
        </div>
      </div>
    </div>
  );
}
