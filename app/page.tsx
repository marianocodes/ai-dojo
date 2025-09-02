import { MainLayout } from '@/components/layout/main-layout'

/**
 * Home page for Socialgram
 * Now uses the new MainLayout with sidebar and header
 * Follows technical plan TECH-1 implementation
 */
export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Content - Temporary content for initial layout */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Socialgram
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Connect, share, and discover amazing content
          </p>
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold text-white mb-4">
              Layout Implementation Complete
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li>✅ Fixed left sidebar with navigation</li>
              <li>✅ Top header with search and notifications</li>
              <li>✅ Responsive design for mobile devices</li>
              <li>✅ Dark theme styling</li>
              <li>✅ Mock data integration</li>
            </ul>
          </div>
        </div>

        {/* Content area ready for posts */}
        <div className="text-center py-8 border-t border-gray-700">
          <p className="text-gray-500">
            Post feed components will be implemented in the next phase
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
