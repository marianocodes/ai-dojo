import FeedContainer from '@/components/feed/FeedContainer';

/**
 * Home page component displaying the main social media feed
 * Refactored to use modular FeedContainer and PostCard components
 * Uses the new MainLayout with sidebar, header, and responsive main content area
 */
export default function Home() {
  return (
    <div className="space-y-6">

      {/* Main Feed Container */}
      <div className="max-w-2xl mx-auto mt-20">
        <FeedContainer />
      </div>

    </div>
  );
}
