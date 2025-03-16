import React from 'react';
import { Home, Search, TrendingUp, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Home className="w-8 h-8 text-cyan-400" />
            <span className="ml-2 text-xl font-bold text-white">SG HOM-E</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home className="w-5 h-5" />} text="Home" current={location.pathname === '/'} />
            <NavLink to="/search" icon={<Search className="w-5 h-5" />} text="Search Properties" current={location.pathname === '/search'} />
            <NavLink to="/analytics" icon={<TrendingUp className="w-5 h-5" />} text="Market Analytics" current={location.pathname === '/analytics'} />
            <NavLink to="/contact" icon={<MessageSquare className="w-5 h-5" />} text="Contact Us" current={location.pathname === '/contact'} />
          </div>

          {/* User Profile */}
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon, text, to, current }: { icon: React.ReactNode; text: string; to: string; current: boolean }) => {
  return (
    <Link
      to={to}
      className={`flex items-center transition-colors ${
        current ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
};

export default Navbar;