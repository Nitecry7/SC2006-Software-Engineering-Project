import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Your email"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Message subject"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Your message"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <span>support@sghomie.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                <span>+65 6789 0123</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                <span>71 Robinson Road, Singapore 068895</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  How accurate are the price predictions?
                </h3>
                <p className="mt-1 text-gray-600">Our AI model is trained on historical data and has an average accuracy rate of 85%.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  How often is the data updated?
                </h3>
                <p className="mt-1 text-gray-600">Our property listings and market analytics are updated daily.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  Can I get personalized recommendations?
                </h3>
                <p className="mt-1 text-gray-600">Yes, create an account to receive personalized property recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;