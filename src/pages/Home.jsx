import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="animate-float">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Text-Translator + String Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the power of modern React development with our
            beautifully crafted tools
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl card-hover">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3"></h2>
            <p className="text-gray-600 leading-relaxed">
              A powerful Translator app using RapidAPI integration, a secure
              Random String generator built with React hooks, and seamless
              client-side routing for the best user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Translator Card */}
        <div className="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                AI Translator
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Break language barriers with our intelligent translator. Powered
              by RapidAPI, supporting 16+ languages with real-time translation
              capabilities.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Hindi
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Spanish
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                French
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                +13 more
              </span>
            </div>
            <Link
              to="/translator"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-medium btn-animate shadow-lg group-hover:shadow-xl"
            >
              <span>Open Translator</span>
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Random String Card */}
        <div className="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">🎲</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                String Generator
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Generate cryptographically secure random strings with customizable
              length and character sets. Perfect for passwords, tokens, and
              unique identifiers.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                Secure
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                Customizable
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                React Hooks
              </span>
            </div>
            <Link
              to="/random-string"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-medium btn-animate shadow-lg group-hover:shadow-xl"
            >
              <span>Open Generator</span>
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Project Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">16+</div>
            <div className="text-gray-600 text-sm">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">3</div>
            <div className="text-gray-600 text-sm">React Pages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-gray-600 text-sm">Responsive Design</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">∞</div>
            <div className="text-gray-600 text-sm">Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
