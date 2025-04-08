import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PredictionPage = () => {
  const [selectedTown, setSelectedTown] = useState('TAMPINES');
  const [selectedFlatType, setSelectedFlatType] = useState('4 ROOM');

  // Dummy data for demonstration
  const dummyPredictionData = [
    { year: '2017', price: 450000, predicted: null },
    { year: '2018', price: 470000, predicted: null },
    { year: '2019', price: 485000, predicted: null },
    { year: '2020', price: 495000, predicted: null },
    { year: '2021', price: 520000, predicted: null },
    { year: '2022', price: 550000, predicted: null },
    { year: '2023', price: 580000, predicted: null },
    { year: '2024', price: 600000, predicted: null },
    { year: '2025', price: null, predicted: 620000 },
    { year: '2026', price: null, predicted: 640000 },
    { year: '2027', price: null, predicted: 665000 },
    { year: '2028', price: null, predicted: 690000 },
  ];

  const towns = [
    'TAMPINES', 'WOODLANDS', 'JURONG EAST', 'PUNGGOL', 'SENGKANG',
    'ANG MO KIO', 'BEDOK', 'CLEMENTI', 'PASIR RIS', 'YISHUN'
  ];

  const flatTypes = [
    '2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Price Prediction</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Select Location</h2>
          <select
            value={selectedTown}
            onChange={(e) => setSelectedTown(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {towns.map(town => (
              <option key={town} value={town}>{town}</option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Select Flat Type</h2>
          <select
            value={selectedFlatType}
            onChange={(e) => setSelectedFlatType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {flatTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Price Prediction Chart</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyPredictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#0284c7" 
                name="Historical Price" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#0ea5e9" 
                name="Predicted Price" 
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Prediction Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Selected Area</h3>
            <p className="text-2xl font-bold text-blue-600">{selectedTown}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Flat Type</h3>
            <p className="text-2xl font-bold text-blue-600">{selectedFlatType}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Current Average Price</h3>
            <p className="text-2xl font-bold text-blue-600">$600,000</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Predicted Price (2028)</h3>
            <p className="text-2xl font-bold text-blue-600">$690,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;