import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { UserCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LOCATIONS = [
  'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
  'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
  'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
  'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
  'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
  'TOA PAYOH', 'WOODLANDS', 'YISHUN'
].sort();

const SellerSignup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
    agreed: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('name, is_seller, phone, preferred_locations')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data?.is_seller) {
          navigate('/seller');
          return;
        }

        setProfile(prev => ({
          ...prev,
          name: data?.name || '',
          phone: data?.phone || '',
          location: data?.preferred_locations?.[0] || '',
          email: user.email || ''
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.agreed) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+65 [0-9]{4} [0-9]{4}$/;
    if (!phoneRegex.test(profile.phone)) {
      toast.error('Please enter a valid phone number in the format: +65 XXXX XXXX');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          preferred_locations: [profile.location],
          is_seller: true
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Successfully registered as a seller!');
      navigate('/seller');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to register as seller');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Become a Seller</h2>
              <p className="mt-2 text-gray-600">
                Join our community of property sellers and start listing your properties
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+65 XXXX XXXX"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Format: +65 XXXX XXXX</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location of Stay
                </label>
                <select
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Location</option>
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                  disabled
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={profile.agreed}
                    onChange={(e) => setProfile({ ...profile, agreed: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700">
                    I agree to the terms and conditions
                  </label>
                  <p className="text-gray-500">
                    By becoming a seller, you agree to our terms of service and privacy policy.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !profile.agreed}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Register as Seller'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;