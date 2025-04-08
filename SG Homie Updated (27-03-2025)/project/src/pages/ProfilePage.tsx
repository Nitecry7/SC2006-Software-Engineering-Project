import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { supabase } from '../lib/supabase';
import { User, Mail, MapPin, Home, Briefcase, DollarSign, Users } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const { profile, refreshProfile } = useProfile();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    preferred_flat_type: profile?.preferred_flat_type || '',
    preferred_location: profile?.preferred_location || '',
    work_location: profile?.work_location || '',
    income_range: profile?.income_range || '',
    family_members: profile?.family_members?.toString() || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          preferred_flat_type: formData.preferred_flat_type,
          preferred_location: formData.preferred_location,
          work_location: formData.work_location,
          income_range: formData.income_range,
          family_members: parseInt(formData.family_members)
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating profile');
    }
  };

  const ProfileField = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null }) => (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
      <Icon className="h-5 w-5 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium">{value || 'Not set'}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-blue-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-md">
                {success}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Flat Type
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.preferred_flat_type}
                    onChange={(e) => setFormData({ ...formData, preferred_flat_type: e.target.value })}
                    required
                  >
                    <option value="">Select flat type</option>
                    <option value="2 ROOM">2 Room</option>
                    <option value="3 ROOM">3 Room</option>
                    <option value="4 ROOM">4 Room</option>
                    <option value="5 ROOM">5 Room</option>
                    <option value="EXECUTIVE">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.preferred_location}
                    onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                    required
                  >
                    <option value="">Select location</option>
                    <option value="TAMPINES">Tampines</option>
                    <option value="WOODLANDS">Woodlands</option>
                    <option value="JURONG EAST">Jurong East</option>
                    <option value="PUNGGOL">Punggol</option>
                    <option value="SENGKANG">Sengkang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your work location"
                    value={formData.work_location}
                    onChange={(e) => setFormData({ ...formData, work_location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income Range
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.income_range}
                    onChange={(e) => setFormData({ ...formData, income_range: e.target.value })}
                    required
                  >
                    <option value="">Select income range</option>
                    <option value="0-3000">Below $3,000</option>
                    <option value="3001-6000">$3,001 - $6,000</option>
                    <option value="6001-9000">$6,001 - $9,000</option>
                    <option value="9001-12000">$9,001 - $12,000</option>
                    <option value="12001+">Above $12,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Family Members
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter number of family members"
                    value={formData.family_members}
                    onChange={(e) => setFormData({ ...formData, family_members: e.target.value })}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <ProfileField icon={Mail} label="Email" value={user.email} />
                  <ProfileField icon={Home} label="Preferred Flat Type" value={profile.preferred_flat_type} />
                  <ProfileField icon={MapPin} label="Preferred Location" value={profile.preferred_location} />
                  <ProfileField icon={Briefcase} label="Work Location" value={profile.work_location} />
                  <ProfileField icon={DollarSign} label="Income Range" value={profile.income_range} />
                  <ProfileField icon={Users} label="Family Members" value={profile.family_members} />
                </div>

                <button
                  onClick={() => {
                    setFormData({
                      preferred_flat_type: profile.preferred_flat_type || '',
                      preferred_location: profile.preferred_location || '',
                      work_location: profile.work_location || '',
                      income_range: profile.income_range || '',
                      family_members: profile.family_members?.toString() || ''
                    });
                    setIsEditing(true);
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;