import React from 'react';
import { User } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="flex items-center">
      <button className="flex items-center space-x-3 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white mr-2">John Doe</span>
      </button>
    </div>
  );
};

export default UserProfile;