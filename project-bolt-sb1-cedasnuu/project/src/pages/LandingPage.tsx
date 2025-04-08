import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Brain } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          filter: 'brightness(0.7)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Find your dream home</span>
              <span className="block text-blue-400">Powered by AI</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Make smarter decisions with data-driven insights for Singapore's HDB market
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                to="/auth"
                className="rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700"
              >
                Get Started
              </Link>
              <Link
                to="/search"
                className="rounded-md bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50"
              >
                Explore Properties
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
              <Search className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold">Smart Search</h3>
              <p className="mt-2 text-gray-600">
                Find your perfect HDB flat with our intelligent search and filter system
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
              <Brain className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold">AI Predictions</h3>
              <p className="mt-2 text-gray-600">
                Get accurate price predictions powered by advanced machine learning
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold">Market Analytics</h3>
              <p className="mt-2 text-gray-600">
                Stay informed with real-time market trends and analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;