import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Users, Home, Mail, Send, Trash2, Edit, Plus, Store, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  name: string | null;
  is_seller: boolean;
  email?: string;
  property_count?: number;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  status: string;
  created_at: string;
  seller_id: string;
  image_url: string;
  seller_name: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

type TabType = 'users' | 'enquiries' | 'properties';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [response, setResponse] = useState('');
  const [sendingResponse, setSendingResponse] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      if (!user) {
        navigate('/');
        return;
      }

      try {
        // Check if current user is admin
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (!profile?.is_admin) {
          navigate('/');
          toast.error('Access denied. Admin privileges required.');
          return;
        }

        setIsAdmin(true);

        // Fetch users with property count using the Edge Function
        const { data: usersResponse, error: usersError } = await supabase.functions.invoke('get-admin-users');

        if (usersError) {
          throw new Error(`Failed to fetch users: ${usersError.message}`);
        }

        if (!usersResponse?.data) {
          throw new Error('No user data received from the server');
        }

        setUsers(usersResponse.data);

        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData || []);

        // Fetch enquiries
        const { data: enquiriesData, error: enquiriesError } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (enquiriesError) throw enquiriesError;
        setEnquiries(enquiriesData || []);

      } catch (error) {
        console.error('Error loading admin data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load admin dashboard');
        toast.error('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndLoadData();
  }, [user, navigate]);

  const handlePropertyAction = async (propertyId: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      if (action === 'delete') {
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', propertyId);

        if (error) throw error;
        setProperties(prev => prev.filter(p => p.id !== propertyId));
        toast.success('Property deleted successfully');
      } else {
        const { error } = await supabase
          .from('properties')
          .update({ status: action === 'approve' ? 'approved' : 'rejected' })
          .eq('id', propertyId);

        if (error) throw error;
        setProperties(prev => prev.map(p => 
          p.id === propertyId ? { ...p, status: action === 'approve' ? 'approved' : 'rejected' } : p
        ));
        toast.success(`Property ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      }
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error(`Failed to ${action} property`);
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .delete()
        .eq('id', enquiryId);

      if (error) throw error;
      setEnquiries(prev => prev.filter(e => e.id !== enquiryId));
      toast.success('Enquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry');
    }
  };

  const handleSendResponse = async () => {
    if (!selectedEnquiry || !response.trim()) return;

    setSendingResponse(true);
    try {
      const { error: updateError } = await supabase
        .from('enquiries')
        .update({
          status: 'RESPONDED',
          admin_response: response.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedEnquiry.id);

      if (updateError) throw updateError;

      toast.success('Response sent successfully');
      setEnquiries(prevEnquiries =>
        prevEnquiries.map(enquiry =>
          enquiry.id === selectedEnquiry.id
            ? { ...enquiry, status: 'RESPONDED', admin_response: response.trim() }
            : enquiry
        )
      );
      setSelectedEnquiry(null);
      setResponse('');
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error('Failed to send response');
    } finally {
      setSendingResponse(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="h-4 w-4 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            Pending
          </span>
        );
    }
  };

  if (!isAdmin || loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">
          {loading ? 'Loading...' : 'Access Denied'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const approvedProperties = properties.filter(p => p.status === 'approved');
  const rejectedProperties = properties.filter(p => p.status === 'rejected');

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Properties</p>
                <p className="text-2xl font-semibold">{pendingProperties.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved Properties</p>
                <p className="text-2xl font-semibold">{approvedProperties.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Enquiries</p>
                <p className="text-2xl font-semibold">{enquiries.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 inline-block mr-2" />
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="h-5 w-5 inline-block mr-2" />
                Manage Properties
              </button>
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'enquiries'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Mail className="h-5 w-5 inline-block mr-2" />
                Manage Enquiries
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Seller Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Properties
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.name || 'Not set'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.is_seller ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <Store className="h-4 w-4 mr-1" />
                                Seller
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                Buyer
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.property_count || 0} properties
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="space-y-8">
                {/* Pending Properties */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Properties</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-lg object-cover"
                                    src={property.image_url}
                                    alt={property.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">By {property.seller_name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              S${property.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(property.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handlePropertyAction(property.id, 'approve')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handlePropertyAction(property.id, 'reject')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XCircle className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handlePropertyAction(property.id, 'delete')}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Approved Properties */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Approved Properties</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {approvedProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-lg object-cover"
                                    src={property.image_url}
                                    alt={property.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">By {property.seller_name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              S${property.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(property.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handlePropertyAction(property.id, 'delete')}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Rejected Properties */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rejected Properties</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rejectedProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-lg object-cover"
                                    src={property.image_url}
                                    alt={property.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">By {property.seller_name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              S${property.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(property.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handlePropertyAction(property.id, 'delete')}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{enquiry.name}</h3>
                        <p className="text-sm text-gray-600">{enquiry.email}</p>
                        <p className="text-sm text-gray-600">{enquiry.phone}</p>
                        <p className="mt-2 text-gray-700">{enquiry.message}</p>
                        {enquiry.admin_response && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700">Response: {enquiry.admin_response}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          enquiry.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {enquiry.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          {enquiry.status === 'PENDING' && (
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              Respond
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteEnquiry(enquiry.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Respond to {selectedEnquiry.name}
            </h3>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your response here..."
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedEnquiry(null);
                  setResponse('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSendResponse}
                disabled={sendingResponse || !response.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                {sendingResponse ? 'Sending...' : 'Send Response'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;