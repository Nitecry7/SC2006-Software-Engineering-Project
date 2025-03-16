import React from 'react';
import { TrendingUp, PieChart, BarChart3, Activity } from 'lucide-react';

function AnalyticsPage() {
  return (
    <div className="pt-16 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Market Analytics</h1>
        
        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Trends */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Price Trends</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-cyan-300">
              Price trend chart will be implemented here
            </div>
          </div>

          {/* Market Distribution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-cyan-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Market Distribution</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-cyan-300">
              Distribution chart will be implemented here
            </div>
          </div>

          {/* Transaction Volume */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-cyan-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Transaction Volume</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-cyan-300">
              Volume chart will be implemented here
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-cyan-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Market Sentiment</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-cyan-300">
              Sentiment analysis will be implemented here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;