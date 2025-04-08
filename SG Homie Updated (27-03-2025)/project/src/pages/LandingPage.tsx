import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Brain, Building, ArrowRight, Users, Clock, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Singapore Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        >
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Your Smart Guide to
              <span className="block text-brand-200">Singapore Housing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-brand-200 mb-8"
            >
              Navigate the HDB market with confidence using AI-powered insights and real-time analytics
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4"
            >
              <Link
                to="/auth"
                className="group bg-brand-200 text-brand-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-xl flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/search"
                className="bg-transparent border-2 border-brand-200 text-brand-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-brand-200/10 hover:scale-105 hover:shadow-xl"
              >
                Explore Properties
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-brand-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">About SG Homie</h2>
            <p className="text-lg text-brand-600">
              Founded in 2025, SG Homie revolutionizes the way Singaporeans find their ideal HDB homes by combining cutting-edge technology with local market expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Users,
                title: "Community-Driven",
                description: "Built by Singaporeans, for Singaporeans, understanding local needs and preferences"
              },
              {
                Icon: Brain,
                title: "AI-Powered",
                description: "Advanced algorithms providing accurate predictions and personalized recommendations"
              },
              {
                Icon: Shield,
                title: "Trusted Platform",
                description: "Verified listings and transparent information you can rely on"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <feature.Icon className="h-12 w-12 text-brand-600 mb-6" />
                <h3 className="text-xl font-bold text-brand-900 mb-3">{feature.title}</h3>
                <p className="text-brand-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Why Choose SG Homie?</h2>
            <p className="text-lg text-brand-600">
              Experience the future of home searching with our innovative features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                Icon: Search,
                title: "Smart Search",
                description: "Find your perfect HDB flat with our intelligent search and filtering system"
              },
              {
                Icon: Brain,
                title: "Price Predictions",
                description: "Get accurate price predictions powered by advanced machine learning"
              },
              {
                Icon: TrendingUp,
                title: "Market Analytics",
                description: "Stay informed with real-time market trends and comprehensive analysis"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-brand-100 rounded-full mb-6">
                  <feature.Icon className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3">{feature.title}</h3>
                <p className="text-brand-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-brand-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Listings", value: "2,500+" },
              { label: "Happy Clients", value: "10,000+" },
              { label: "Areas Covered", value: "25+" },
              { label: "Price Accuracy", value: "95%" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-brand-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;