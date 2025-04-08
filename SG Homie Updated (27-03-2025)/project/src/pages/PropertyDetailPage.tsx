import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Home, DollarSign, Ruler, Calendar, Building, Train, ShoppingBag, School, Guitar as Hospital, Star } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers for different amenity types
const amenityIcons = {
  transport: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  shopping: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  education: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  healthcare: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  lifestyle: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

interface Amenity {
  name: string;
  type: string;
  distance: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  type: string;
  size: string;
  floor: string;
  yearBuilt: string;
  coordinates: [number, number];
  image: string;
  amenities: Amenity[];
  score: number;
}

const PropertyDetailPage = () => {
  const location = useLocation();
  const property = location.state?.property;

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Property not found
        </div>
      </div>
    );
  }

  // Calculate amenity coordinates based on distance and random angle
  const getAmenityCoordinates = (distance: string, index: number) => {
    const meters = parseInt(distance.replace('m', ''));
    const angle = (index * (360 / property.amenities.length)) * (Math.PI / 180);
    const lat = property.coordinates[0] + (meters / 111111) * Math.cos(angle);
    const lng = property.coordinates[1] + (meters / 111111) * Math.sin(angle);
    return [lat, lng] as [number, number];
  };

  const AmenityIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'transport':
        return <Train className="h-5 w-5 text-blue-600" />;
      case 'shopping':
        return <ShoppingBag className="h-5 w-5 text-green-600" />;
      case 'education':
        return <School className="h-5 w-5 text-yellow-600" />;
      case 'healthcare':
        return <Hospital className="h-5 w-5 text-red-600" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg col-span-2"
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className={`font-bold ${
                    property.score >= 8 ? 'text-green-600' :
                    property.score >= 6 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {property.score}/10
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>${property.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <span>{property.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  <span>{property.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Floor {property.floor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Built in {property.yearBuilt}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Location & Nearby Amenities</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={property.coordinates}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* Property Marker */}
                  <Marker position={property.coordinates}>
                    <Popup>
                      <div className="font-semibold">{property.title}</div>
                      <div className="text-sm text-gray-600">{property.location}</div>
                    </Popup>
                  </Marker>
                  {/* Amenity Markers */}
                  {property.amenities.map((amenity, index) => (
                    <Marker
                      key={index}
                      position={getAmenityCoordinates(amenity.distance, index)}
                      icon={amenityIcons[amenity.type as keyof typeof amenityIcons]}
                    >
                      <Popup>
                        <div className="font-semibold">{amenity.name}</div>
                        <div className="text-sm text-gray-600">{amenity.distance}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(amenityIcons).map(([type, _]) => (
                  <div key={type} className="flex items-center space-x-1 text-sm">
                    <AmenityIcon type={type} />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Nearby Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Nearby Amenities</h2>
              <div className="space-y-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AmenityIcon type={amenity.type} />
                      <span>{amenity.name}</span>
                    </div>
                    <span className="text-gray-600 font-medium">{amenity.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Button */}
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;