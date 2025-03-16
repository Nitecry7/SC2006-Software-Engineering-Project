import React from 'react';
import { Building2, Search } from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';

function HomePage() {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2940&auto=format&fit=crop")',
          filter: 'brightness(0.4)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 text-center">
          SG HOM-E
        </h1>
        <p className="text-xl md:text-2xl text-cyan-300 mb-12 text-center max-w-3xl">
          Find your dream Home with AI-Driven Insights
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl mx-auto relative">
          <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-cyan-500/30">
            <Search className="w-6 h-6 text-cyan-400 mr-3" />
            <input
              type="text"
              placeholder="Find your ideal home..."
              className="w-full bg-transparent text-white placeholder-cyan-300 outline-none"
            />
            <button className="ml-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl mx-auto px-4">
          <FeatureCard
            icon={<Building2 className="w-8 h-8 text-cyan-400" />}
            title="AI-Powered Search"
            description="Smart property recommendations based on your preferences"
          />
          <FeatureCard
            icon={<Building2 className="w-8 h-8 text-cyan-400" />}
            title="Market Analytics"
            description="Real-time market trends and price predictions"
          />
          <FeatureCard
            icon={<Building2 className="w-8 h-8 text-cyan-400" />}
            title="Smart Insights"
            description="Data-driven decision making for property investment"
          />
        </div>
      </div>

      {/* Notification Panel */}
      <div className="absolute top-24 right-4">
        <NotificationPanel />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-cyan-300">{description}</p>
    </div>
  );
}

export default HomePage;