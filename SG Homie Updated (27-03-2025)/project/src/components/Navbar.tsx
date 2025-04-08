import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, LineChart, User, MessageSquare, Calculator } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SG Homie</span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link to="/search" className="flex items-center text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5" />
              <span className="ml-1">Search</span>
            </Link>
            <Link to="/prediction" className="flex items-center text-gray-700 hover:text-blue-600">
              <Calculator className="h-5 w-5" />
              <span className="ml-1">Predict</span>
            </Link>
            <Link to="/analytics" className="flex items-center text-gray-700 hover:text-blue-600">
              <LineChart className="h-5 w-5" />
              <span className="ml-1">Analytics</span>
            </Link>
            <Link to="/contact" className="flex items-center text-gray-700 hover:text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span className="ml-1">Contact</span>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5" />
                  <span className="ml-1">Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span className="ml-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;