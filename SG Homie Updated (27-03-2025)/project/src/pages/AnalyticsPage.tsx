import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { LOCATIONS, FLAT_TYPES } from '../lib/constants';

// Sample data based on data.gov.sg format
const priceData = {
  '2021': {
    'ANG MO KIO': { '4 ROOM': 450000, '5 ROOM': 550000 },
    'TAMPINES': { '4 ROOM': 480000, '5 ROOM': 580000 },
    // ... more data
  },
  '2022': {
    'ANG MO KIO': { '4 ROOM': 470000, '5 ROOM': 570000 },
    'TAMPINES': { '4 ROOM': 500000, '5 ROOM': 600000 },
    // ... more data
  },
  '2023': {
    'ANG MO KIO': { '4 ROOM': 490000, '5 ROOM': 590000 },
    'TAMPINES': { '4 ROOM': 520000, '5 ROOM': 620000 },
    // ... more data
  },
  '2024': {
    'ANG MO KIO': { '4 ROOM': 510000, '5 ROOM': 610000 },
    'TAMPINES': { '4 ROOM': 540000, '5 ROOM': 640000 },
    // ... more data
  }
};

const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedTown, setSelectedTown] = useState('all');
  const [selectedFlatType, setSelectedFlatType] = useState('all');

  // Process data for charts based on filters
  const processChartData = () => {
    const years = selectedYear === 'all' ? Object.keys(priceData) : [selectedYear];
    const towns = selectedTown === 'all' ? LOCATIONS : [selectedTown];
    const flatTypes = selectedFlatType === 'all' ? FLAT_TYPES : [selectedFlatType];

    const lineData = years.map(year => {
      const yearData = { year };
      towns.forEach(town => {
        flatTypes.forEach(type => {
          if (priceData[year]?.[town]?.[type]) {
            yearData[`${town} - ${type}`] = priceData[year][town][type];
          }
        });
      });
      return yearData;
    });

    const barData = towns.map(town => {
      const townData = { town };
      flatTypes.forEach(type => {
        if (priceData[years[years.length - 1]]?.[town]?.[type]) {
          townData[type] = priceData[years[years.length - 1]][town][type];
        }
      });
      return townData;
    });

    return { lineData, barData };
  };

  const { lineData, barData } = processChartData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Market Analytics</h1>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {Object.keys(priceData).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Town
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
            >
              <option value="all">All Towns</option>
              {LOCATIONS.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flat Type
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedFlatType}
              onChange={(e) => setSelectedFlatType(e.target.value)}
            >
              <option value="all">All Types</option>
              {FLAT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Average Price Trends</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(lineData[0] || {}).filter(key => key !== 'year').map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`hsl(${index * 45}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Town Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Price by Town</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="town" />
                <YAxis />
                <Tooltip />
                <Legend />
                {FLAT_TYPES.map((type, index) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    fill={`hsl(${index * 45}, 70%, 50%)`}
                    name={type}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Market Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Market Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-brand-600">$570,000</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Monthly Change</p>
              <p className="text-2xl font-bold text-green-600">+0.9%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-brand-600">1,234</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Days on Market</p>
              <p className="text-2xl font-bold text-brand-600">45</p>
            </div>
          </div>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-brand-600 pl-4">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;