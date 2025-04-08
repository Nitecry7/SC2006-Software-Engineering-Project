import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Home, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Property } from '../types/supabase';

const LOCATIONS = [
  'ALL',
  'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
  'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
  'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
  'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
  'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
  'TOA PAYOH', 'WOODLANDS', 'YISHUN'
].sort();

const ROOM_TYPES = ['ALL', '2 ROOM', '3 ROOM', '4 ROOM', 'EXECUTIVE'];

const Search = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [useProfileRecommendations, setUseProfileRecommendations] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    preferred_locations: string[];
    preferred_property_type: string;
  } | null>(null);
  const [filters, setFilters] = useState({
    location: 'ALL',
    roomType: 'ALL',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('preferred_locations, preferred_property_type')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setUserProfile(data);
        if (data && useProfileRecommendations) {
          setFilters(prev => ({
            ...prev,
            location: data.preferred_locations?.[0] || 'ALL',
            roomType: data.preferred_property_type || 'ALL'
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let query = supabase
        .from('properties')
        .select('*')
        .eq('type', 'HDB')
        .eq('status', 'approved'); // Only fetch approved properties

      if (filters.location !== 'ALL') {
        query = query.eq('location', filters.location);
      }
      if (filters.roomType !== 'ALL') {
        query = query.eq('bedrooms', parseInt(filters.roomType.split(' ')[0]));
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    if (useProfileRecommendations && (field === 'location' || field === 'roomType')) {
      return; // Don't allow changes to location and roomType when using profile recommendations
    }
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const toggleProfileRecommendations = () => {
    setUseProfileRecommendations(!useProfileRecommendations);
    if (!useProfileRecommendations && userProfile) {
      // When enabling recommendations, use profile preferences
      setFilters(prev => ({
        ...prev,
        location: userProfile.preferred_locations?.[0] || 'ALL',
        roomType: userProfile.preferred_property_type || 'ALL'
      }));
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Find Your Dream HDB</h1>
          <p className="mt-4 text-lg text-gray-600">
            Search through our curated list of HDB properties across Singapore
          </p>
        </div>

        {/* Search Filters */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          {user && (
            <div className="mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useProfileRecommendations}
                  onChange={toggleProfileRecommendations}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Use recommendations from profile</span>
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Location Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className={`block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    useProfileRecommendations ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  disabled={useProfileRecommendations}
                >
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <div className="relative">
                <select
                  value={filters.roomType}
                  onChange={(e) => handleFilterChange('roomType', e.target.value)}
                  className={`block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    useProfileRecommendations ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  disabled={useProfileRecommendations}
                >
                  {ROOM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Minimum Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              {loading ? 'Searching...' : 'Search Properties'}
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {property.bedrooms} Room HDB
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    S${property.price.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Home className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{property.bathrooms} Bathrooms</span>
                  <span>{property.area_sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No properties found. Try adjusting your search filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;