import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  // Dummy data for charts
  const priceData = [
    { month: 'Jan 2024', average: 550000 },
    { month: 'Feb 2024', average: 555000 },
    { month: 'Mar 2024', average: 558000 },
    { month: 'Apr 2024', average: 562000 },
    { month: 'May 2024', average: 565000 },
    { month: 'Jun 2024', average: 570000 },
  ];

  const townData = [
    { town: 'Tampines', average: 550000 },
    { town: 'Woodlands', average: 480000 },
    { town: 'Jurong East', average: 520000 },
    { town: 'Punggol', average: 580000 },
    { town: 'Sengkang', average: 560000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Market Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Trends */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Average Price Trends</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#0284c7"
                  name="Average Price"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Town Comparison */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Price by Town</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={townData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="town" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="average"
                  fill="#0284c7"
                  name="Average Price"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Market Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-blue-600">$570,000</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Monthly Change</p>
              <p className="text-2xl font-bold text-green-600">+0.9%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Days on Market</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold">Rising Demand in Punggol</h3>
              <p className="text-gray-600">Property prices in Punggol have increased by 5% in the last quarter due to new amenities.</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold">New MRT Impact</h3>
              <p className="text-gray-600">Areas near the upcoming Cross Island Line stations show increased buyer interest.</p>
            </div>
            <div className="border-l-4 border-yellow-600 pl-4">
              <h3 className="font-semibold">Market Trend</h3>
              <p className="text-gray-600">4-room flats remain the most popular choice among buyers, with stable price growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;