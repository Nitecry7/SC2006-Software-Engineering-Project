import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Building, Clock, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface EnquiryType {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

const Enquiry = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryType[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      if (!user?.email) return;

      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEnquiries(data || []);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
        toast.error('Failed to load enquiries');
      } finally {
        setLoadingEnquiries(false);
      }
    };

    fetchEnquiries();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const enquiryData = {
        ...formData,
        email: user?.email || formData.email,
        status: 'PENDING'
      };

      const { error } = await supabase
        .from('enquiries')
        .insert([enquiryData]);

      if (error) throw error;

      toast.success('Enquiry submitted successfully! We will get back to you soon.');
      setFormData({ name: '', email: user?.email || '', phone: '', message: '' });
      
      // Refresh enquiries list
      if (user?.email) {
        const { data } = await supabase
          .from('enquiries')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });
        
        setEnquiries(data || []);
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about a property? Our team of experts is here to help you find your perfect home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-blue-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              <p className="text-blue-100 mt-2">We'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-4 pr-12 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email || formData.email}
                    readOnly={!!user}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-4 pr-12 py-3 ${user ? 'bg-gray-100' : ''}`}
                    required
                  />
                </div>
                {user && (
                  <p className="mt-1 text-sm text-gray-500">
                    Using your account email
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    pattern="^\+65 [0-9]{4} [0-9]{4}$"
                    placeholder="+65 9123 4567"
                    className="block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-4 pr-12 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-4 pr-12 py-3"
                    required
                    placeholder="Tell us about your property interests or any questions you have..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Enquiry History */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Enquiries</h2>
              
              {loadingEnquiries ? (
                <div className="text-center text-gray-600">Loading enquiries...</div>
              ) : enquiries.length === 0 ? (
                <div className="text-center text-gray-600">No enquiries yet</div>
              ) : (
                <div className="space-y-6">
                  {enquiries.map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          enquiry.status === 'RESPONDED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {enquiry.status === 'RESPONDED' ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4" />
                              <span>RESPONDED</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>PENDING</span>
                            </div>
                          )}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Your Message:</h3>
                          <p className="mt-1 text-gray-600">{enquiry.message}</p>
                        </div>

                        {enquiry.admin_response && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="text-lg font-medium text-blue-900">Response:</h3>
                            <p className="mt-1 text-blue-700">{enquiry.admin_response}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-blue-100">+65 6789 0123</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-blue-100">contact@sghomie.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-blue-100">123 Robinson Road, Singapore 068912</p>
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

export default Enquiry;