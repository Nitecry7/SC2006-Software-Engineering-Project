import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, MapPin, Home, DollarSign, Sparkles } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { LOCATIONS, FLAT_TYPES, DUMMY_PROPERTIES } from '../lib/constants';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  price: number;
  size: string;
  floor: string;
  yearBuilt: string;
  coordinates: [number, number];
  image: string;
  amenities: Array<{
    name: string;
    type: string;
    distance: string;
  }>;
  score: number;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [useRecommendation, setUseRecommendation] = useState(true);
  const [searchParams, setSearchParams] = useState({
    location: '',
    flatType: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: ''
  });
  const [properties, setProperties] = useState<Property[]>(DUMMY_PROPERTIES);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update search params when recommendation is toggled
  useEffect(() => {
    if (useRecommendation && profile) {
      setSearchParams(prev => ({
        ...prev,
        location: profile.preferred_location || '',
        flatType: profile.preferred_flat_type || ''
      }));
    }
  }, [useRecommendation, profile]);

  const handleSearch = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filtered = [...properties];

    if (searchParams.location) {
      filtered = filtered.filter(p => p.location === searchParams.location);
    }
    if (searchParams.flatType) {
      filtered = filtered.filter(p => p.type === searchParams.flatType);
    }
    if (searchParams.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(searchParams.minPrice));
    }
    if (searchParams.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(searchParams.maxPrice));
    }
    if (searchParams.minSize) {
      filtered = filtered.filter(p => parseInt(p.size) >= parseInt(searchParams.minSize));
    }
    if (searchParams.maxSize) {
      filtered = filtered.filter(p => parseInt(p.size) <= parseInt(searchParams.maxSize));
    }

    setFilteredProperties(filtered);
    setShowResults(true);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (useRecommendation && (field === 'location' || field === 'flatType')) {
      setUseRecommendation(false);
    }
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-8"
      >
        Find Your Dream Home
      </motion.h1>
      
      {/* Recommendation Toggle */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 p-4 rounded-lg mb-6"
      >
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useRecommendation}
            onChange={(e) => setUseRecommendation(e.target.checked)}
            className="form-checkbox h-5 w-5 text-brand-600"
          />
          <Sparkles className="h-5 w-5 text-brand-600" />
          <span className="text-gray-900">Use recommendations from my profile</span>
        </label>
      </motion.div>

      {/* Search Filters */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white shadow rounded-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 w-full p-2 border rounded-md"
                value={searchParams.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={useRecommendation}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flat Type
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 w-full p-2 border rounded-md"
                value={searchParams.flatType}
                onChange={(e) => handleInputChange('flatType', e.target.value)}
                disabled={useRecommendation}
              >
                <option value="">All Types</option>
                {FLAT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min"
                  className="pl-10 w-full p-2 border rounded-md"
                  value={searchParams.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max"
                  className="pl-10 w-full p-2 border rounded-md"
                  value={searchParams.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="mt-4 w-full md:w-auto bg-brand-600 text-white px-6 py-2 rounded-md hover:bg-brand-700 flex items-center justify-center transition-colors duration-300"
        >
          <SearchIcon className="h-5 w-5 mr-2" />
          Search Properties
        </motion.button>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 mb-6">
              Found {filteredProperties.length} properties matching your criteria
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/property/${property.id}`, { state: { property } })}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-600 font-bold">
                        ${property.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500">{property.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchPage;