import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, Home, Maximize, Bath, DollarSign, Heart, ChevronLeft, ChevronRight, Store, Train, Trees as Tree, Mail } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Property } from '../types/supabase';
import toast from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

interface Amenity {
  id: string;
  name: string;
  type: string;
  distance: number;
  latitude: number;
  longitude: number;
}

interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

// Default coordinates for Singapore
const DEFAULT_COORDINATES = {
  latitude: 1.3521,
  longitude: 103.8198
};

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [interestCount, setInterestCount] = useState(0);
  const [isInterested, setIsInterested] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);

  const prevImage = () => {
    if (!property?.photos) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.photos.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    if (!property?.photos) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const amenityIcons = {
    Shopping: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    Transport: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    Park: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    Community: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
  };

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'Shopping':
        return <Store className="h-5 w-5 text-red-500" />;
      case 'Transport':
        return <Train className="h-5 w-5 text-blue-500" />;
      case 'Park':
        return <Tree className="h-5 w-5 text-green-500" />;
      default:
        return <MapPin className="h-5 w-5 text-yellow-500" />;
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        // First fetch the property details
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (propertyError) throw propertyError;
        setProperty(propertyData);

        // Then fetch the seller's information if seller_id exists
        if (propertyData.seller_id) {
          const { data: userData, error: userError } = await supabase
            .from('user_profiles')
            .select('name, phone')
            .eq('id', propertyData.seller_id)
            .single();

          if (userError) throw userError;

          // Get the seller's email from auth.users
          const { data: authData, error: authError } = await supabase
            .from('auth_users_view')
            .select('email')
            .eq('id', propertyData.seller_id)
            .single();

          if (!authError && authData) {
            setSellerInfo({
              name: userData?.name || propertyData.seller_name || 'Unknown',
              phone: userData?.phone || propertyData.seller_phone || 'Not provided',
              email: authData.email || 'Not provided'
            });
          }
        }

        // Fetch amenities
        const { data: amenitiesData, error: amenitiesError } = await supabase
          .from('property_amenities')
          .select('*')
          .eq('property_id', id);

        if (amenitiesError) throw amenitiesError;
        setAmenities(amenitiesData);

        // Fetch interest count
        const { count, error: countError } = await supabase
          .from('property_interests')
          .select('*', { count: 'exact' })
          .eq('property_id', id);

        if (countError) throw countError;
        setInterestCount(count || 0);

        // Check if current user is interested
        if (user) {
          const { data: interestData, error: interestError } = await supabase
            .from('property_interests')
            .select('*')
            .eq('property_id', id)
            .eq('user_id', user.id)
            .maybeSingle();

          if (interestError) throw interestError;
          setIsInterested(!!interestData);
        }

        // Subscribe to real-time updates for interests
        const channel = supabase
          .channel('interests')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'property_interests',
              filter: `property_id=eq.${id}`
            },
            async () => {
              const { count: newCount } = await supabase
                .from('property_interests')
                .select('*', { count: 'exact' })
                .eq('property_id', id);
              
              setInterestCount(newCount || 0);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, user]);

  const toggleInterest = async () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('toggle-auth-modal'));
      return;
    }

    try {
      if (isInterested) {
        const { error } = await supabase
          .from('property_interests')
          .delete()
          .eq('property_id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        setIsInterested(false);
        setInterestCount(prev => prev - 1);
        toast.success('Removed from interests');
      } else {
        const { error } = await supabase
          .from('property_interests')
          .insert([{ property_id: id, user_id: user.id }]);

        if (error) throw error;
        setIsInterested(true);
        setInterestCount(prev => prev + 1);
        toast.success('Added to interests');
      }
    } catch (error) {
      console.error('Error toggling interest:', error);
      toast.error('Failed to update interest');
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Property not found</div>
      </div>
    );
  }

  const coordinates = {
    latitude: property.latitude ?? DEFAULT_COORDINATES.latitude,
    longitude: property.longitude ?? DEFAULT_COORDINATES.longitude
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-[500px]">
            <img
              src={property.photos?.[currentImageIndex] || property.image_url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.photos && property.photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {property.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Property Details */}
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.detailed_location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  S${property.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  S${Math.round(property.price / property.area_sqft).toLocaleString()} per sqft
                </div>
              </div>
            </div>

            {/* Interest Button */}
            <div className="mt-8 flex items-center space-x-4">
              <button
                onClick={toggleInterest}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
                  isInterested
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInterested ? 'fill-current' : ''}`} />
                <span>{isInterested ? 'Interested' : 'Show Interest'}</span>
              </button>
              <div className="text-gray-600">
                <span className="font-semibold">{interestCount}</span> people interested
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center">
                <Home className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Rooms</div>
                  <div className="font-semibold">{property.bedrooms} Bedrooms</div>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Bathrooms</div>
                  <div className="font-semibold">{property.bathrooms} Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center">
                <Maximize className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Floor Area</div>
                  <div className="font-semibold">{property.area_sqft} sqft</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Built Year</div>
                  <div className="font-semibold">{property.built_year}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Map and Amenities */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-[400px]">
                  <MapContainer
                    center={[coordinates.latitude, coordinates.longitude]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Property Marker */}
                    <Marker position={[coordinates.latitude, coordinates.longitude]}>
                      <Popup>
                        <div className="font-semibold">{property.title}</div>
                        <div className="text-sm text-gray-600">{property.detailed_location}</div>
                      </Popup>
                    </Marker>
                    {/* Amenity Markers */}
                    {amenities.map((amenity) => (
                      <Marker
                        key={amenity.id}
                        position={[amenity.latitude, amenity.longitude]}
                        icon={amenityIcons[amenity.type as keyof typeof amenityIcons]}
                      >
                        <Popup>
                          <div className="font-semibold">{amenity.name}</div>
                          <div className="text-sm text-gray-600">
                            {amenity.type} • {amenity.distance}km away
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>

              {/* Nearby Amenities */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Nearby Amenities</h2>
                <div className="space-y-4">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-full">
                          {getAmenityIcon(amenity.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{amenity.name}</div>
                          <div className="text-sm text-gray-600">{amenity.type}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {amenity.distance}km away
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">Seller Name</div>
                    <div className="font-semibold">{sellerInfo?.name || property.seller_name}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">Contact Number</div>
                    <div className="font-semibold">{sellerInfo?.phone || property.seller_phone}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold">{sellerInfo?.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;