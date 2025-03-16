import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Building2, DollarSign, Maximize2 } from 'lucide-react';

type PropertyType = 'HDB' | 'Condo' | 'Landed';

interface FilterState {
  propertyType: PropertyType[];
  priceRange: { min: number; max: number };
  floorArea: { min: number; max: number };
  location: string;
}

function SearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    propertyType: [],
    priceRange: { min: 0, max: 5000000 },
    floorArea: { min: 0, max: 3000 },
    location: '',
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Search Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-cyan-500/30 p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="flex items-center bg-white/10 rounded-lg p-3 border border-cyan-500/30">
              <Search className="w-5 h-5 text-cyan-400 mr-2" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                className="w-full bg-transparent text-white placeholder-cyan-300 outline-none"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>
            
            {/* Property Type */}
            <div className="mb-6">
              <h3 className="text-cyan-300 mb-3">Property Type</h3>
              <div className="space-y-2">
                {['HDB', 'Condo', 'Landed'].map((type) => (
                  <label key={type} className="flex items-center text-white cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 accent-cyan-500"
                      checked={filters.propertyType.includes(type as PropertyType)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...filters.propertyType, type as PropertyType]
                          : filters.propertyType.filter((t) => t !== type);
                        setFilters({ ...filters, propertyType: newTypes });
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-cyan-300 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: parseInt(e.target.value) }
                  })}
                  className="w-full accent-cyan-500"
                />
                <div className="text-white">
                  Up to ${filters.priceRange.max.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Floor Area */}
            <div className="mb-6">
              <h3 className="text-cyan-300 mb-3">Floor Area (sqft)</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={filters.floorArea.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    floorArea: { ...filters.floorArea, max: parseInt(e.target.value) }
                  })}
                  className="w-full accent-cyan-500"
                />
                <div className="text-white">
                  Up to {filters.floorArea.max} sqft
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/30">
            <h2 className="text-xl font-semibold text-white mb-6">Available Properties</h2>
            <div className="space-y-4">
              {/* Sample Property Cards */}
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyCard() {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
      <div className="flex gap-4">
        <div className="w-32 h-24 bg-gray-700 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60"
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Modern Apartment in Tampines</h3>
          <div className="flex items-center text-cyan-300 text-sm mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Tampines Street 86</span>
          </div>
          <div className="flex gap-4 mt-2 text-sm">
            <div className="flex items-center text-cyan-300">
              <Home className="w-4 h-4 mr-1" />
              <span>HDB</span>
            </div>
            <div className="flex items-center text-cyan-300">
              <Maximize2 className="w-4 h-4 mr-1" />
              <span>1,200 sqft</span>
            </div>
          </div>
          <div className="flex items-center mt-2 text-lg font-semibold text-white">
            <DollarSign className="w-5 h-5" />
            <span>550,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;