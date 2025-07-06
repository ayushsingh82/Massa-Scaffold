import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build on{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Massa
              </span>
              <br />
              with Confidence
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A modern, production-ready starter kit for building decentralized applications 
              on the Massa blockchain. Get started quickly with pre-configured components, 
              wallet integration, and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/counter"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Try Demo
              </Link>
              <Link
                href="/wallet"
                className="border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 font-semibold text-lg"
              >
                Wallet Demo
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold text-lg"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl opacity-30"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pre-configured with the latest tools and best practices for modern dApp development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Wallet Integration
              </h3>
              <p className="text-gray-300">
                Seamless integration with Bearby wallet for easy user onboarding and account management.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                TypeScript Ready
              </h3>
              <p className="text-gray-300">
                Full TypeScript support with proper type definitions for better development experience and code safety.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-300">
                Built with Next.js 15 and optimized for performance with automatic code splitting and static generation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Modern UI
              </h3>
              <p className="text-gray-300">
                Beautiful, responsive design with Tailwind CSS and dark mode support for a professional look.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Analytics Ready
              </h3>
              <p className="text-gray-300">
                Built-in analytics and monitoring capabilities to track user interactions and dApp performance.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Developer Tools
              </h3>
              <p className="text-gray-300">
                Hot reloading, ESLint configuration, and development tools for efficient development workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                About Massa Scaffold
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Massa Scaffold is designed to accelerate your dApp development on the Massa blockchain. 
                It provides a solid foundation with all the essential tools and configurations you need 
                to build, test, and deploy your decentralized applications.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Whether you're a seasoned blockchain developer or just getting started, this starter kit 
                will help you focus on building your application logic rather than setting up infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/counter"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-center"
                >
                  Explore Demo
                </Link>
                <Link
                  href="/wallet"
                  className="border-2 border-orange-500 text-orange-400 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 font-semibold text-center"
                >
                  Wallet Demo
                </Link>
                <a
                  href="https://docs.massa.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-2xl">
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your dApp?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Start building the future of decentralized applications on Massa today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              Get Started
            </a>
            <Link
              href="/wallet"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200 font-semibold text-lg"
            >
              Wallet Demo
            </Link>
            <Link
              href="/counter"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200 font-semibold text-lg"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
