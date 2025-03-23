import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Home, DollarSign, Sparkles } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  size: string;
  image: string;
  description: string;
  floor: string;
  yearBuilt: string;
  score: number;
  coordinates: [number, number];
  amenities: Array<{
    name: string;
    type: string;
    distance: string;
  }>;
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
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Price ranges based on flat types
  const priceRanges = {
    '2 ROOM': { min: 200000, max: 300000 },
    '3 ROOM': { min: 300000, max: 450000 },
    '4 ROOM': { min: 450000, max: 600000 },
    '5 ROOM': { min: 600000, max: 750000 },
    'EXECUTIVE': { min: 750000, max: 900000 },
  };

  // Generate dummy properties with more detailed information
  useEffect(() => {
    const locations = [
      { name: 'TAMPINES', coords: [1.3521, 103.9198] },
      { name: 'WOODLANDS', coords: [1.4382, 103.7891] },
      { name: 'JURONG EAST', coords: [1.3329, 103.7436] },
      { name: 'PUNGGOL', coords: [1.4041, 103.9025] },
      { name: 'SENGKANG', coords: [1.3868, 103.8914] }
    ];
    const flatTypes = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'];
    const streets = ['Street', 'Avenue', 'Road', 'Drive', 'Lane'];
    const imageUrls = [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    ];

    const amenityTypes = [
      { type: 'transport', names: ['MRT Station', 'Bus Interchange', 'LRT Station'] },
      { type: 'shopping', names: ['Shopping Mall', 'Supermarket', 'Market'] },
      { type: 'education', names: ['Primary School', 'Secondary School', 'Kindergarten'] },
      { type: 'healthcare', names: ['Polyclinic', 'Hospital', 'Clinic'] },
      { type: 'lifestyle', names: ['Park', 'Community Club', 'Sports Complex'] }
    ];
    
    const dummyProperties: Property[] = [];
    
    locations.forEach(location => {
      for (let i = 1; i <= 100; i++) {
        const type = flatTypes[Math.floor(Math.random() * flatTypes.length)];
        const priceRange = priceRanges[type as keyof typeof priceRanges];
        const price = Math.floor(
          Math.random() * (priceRange.max - priceRange.min) + priceRange.min
        );
        
        // Generate random amenities
        const propertyAmenities = amenityTypes.map(amenityType => {
          const name = `${location.name} ${amenityType.names[Math.floor(Math.random() * amenityType.names.length)]}`;
          return {
            name,
            type: amenityType.type,
            distance: `${Math.floor(Math.random() * 1000) + 100}m`
          };
        });

        // Generate a property score (1-10) based on amenities and price
        const amenityScore = Math.min(10, Math.floor(Math.random() * 5) + 6);
        const priceScore = Math.min(10, Math.floor(Math.random() * 5) + 6);
        const score = Math.floor((amenityScore + priceScore) / 2);
        
        dummyProperties.push({
          id: dummyProperties.length + 1,
          title: `${type} Flat in ${location.name}`,
          location: `${location.name} ${streets[Math.floor(Math.random() * streets.length)]} ${Math.floor(Math.random() * 50) + 1}`,
          price,
          type,
          size: `${Math.floor(Math.random() * (150 - 65) + 65)} sqm`,
          image: imageUrls[Math.floor(Math.random() * imageUrls.length)],
          description: `Beautiful and spacious ${type} flat in a prime location of ${location.name}. Recently renovated with modern finishes and excellent amenities nearby.`,
          floor: `${Math.floor(Math.random() * 25) + 1}`,
          yearBuilt: `${Math.floor(Math.random() * (2023 - 1990) + 1990)}`,
          score,
          coordinates: location.coords,
          amenities: propertyAmenities
        });
      }
    });

    setProperties(dummyProperties);
  }, []);

  // Apply recommendations from profile
  useEffect(() => {
    if (useRecommendation && profile) {
      const flatType = profile.preferred_flat_type || '';
      const location = profile.preferred_location || '';
      const priceRange = priceRanges[flatType as keyof typeof priceRanges] || { min: 0, max: 0 };

      setSearchParams({
        location,
        flatType,
        minPrice: priceRange.min.toString(),
        maxPrice: priceRange.max.toString(),
      });
    }
  }, [useRecommendation, profile]);

  const handleSearch = () => {
    let filtered = [...properties];

    if (searchParams.location) {
      filtered = filtered.filter(p => p.location.includes(searchParams.location));
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

    setFilteredProperties(filtered);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Dream Home</h1>
      
      {/* Recommendation Toggle */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useRecommendation}
            onChange={(e) => setUseRecommendation(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span className="text-blue-900">Use recommendations from my profile</span>
        </label>
      </div>

      {/* Search Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 w-full p-2 border rounded-md"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              >
                <option value="">All Locations</option>
                <option value="TAMPINES">Tampines</option>
                <option value="WOODLANDS">Woodlands</option>
                <option value="JURONG EAST">Jurong East</option>
                <option value="PUNGGOL">Punggol</option>
                <option value="SENGKANG">Sengkang</option>
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
                onChange={(e) => setSearchParams({ ...searchParams, flatType: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="2 ROOM">2 Room</option>
                <option value="3 ROOM">3 Room</option>
                <option value="4 ROOM">4 Room</option>
                <option value="5 ROOM">5 Room</option>
                <option value="EXECUTIVE">Executive</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                className="pl-10 w-full p-2 border rounded-md"
                placeholder="Min price"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                className="pl-10 w-full p-2 border rounded-md"
                placeholder="Max price"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          className="mt-4 w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <SearchIcon className="h-5 w-5 mr-2" />
          Search Properties
        </button>
      </div>

      {/* Results Summary */}
      {showResults && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredProperties.length} properties matching your criteria
          </p>
        </div>
      )}

      {/* Property Listings */}
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">
                  <MapPin className="inline-block h-4 w-4 mr-1" />
                  {property.location}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">{property.size}</span>
                </div>
                <div className="mt-2 mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Property Score: 
                    <span className={`ml-1 ${
                      property.score >= 8 ? 'text-green-600' :
                      property.score >= 6 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {property.score}/10
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/property/${property.id}`, { state: { property } })}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;