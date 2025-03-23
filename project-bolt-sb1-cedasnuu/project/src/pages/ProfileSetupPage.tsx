import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { supabase } from '../lib/supabase';

const ProfileSetupPage = () => {
  const { user } = useAuth();
  const { refreshProfile } = useProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    preferred_flat_type: '',
    preferred_location: '',
    work_location: '',
    income_range: '',
    family_members: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          preferred_flat_type: formData.preferred_flat_type,
          preferred_location: formData.preferred_location,
          work_location: formData.work_location,
          income_range: formData.income_range,
          family_members: parseInt(formData.family_members)
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      navigate('/search');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Profile</h1>
          
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Complete Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;