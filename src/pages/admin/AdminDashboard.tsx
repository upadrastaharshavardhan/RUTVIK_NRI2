import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, LogOut } from 'lucide-react';
import { auth, isAdmin } from '../../lib/firebase';
import { BookingTable } from '../../components/admin/BookingTable';
import { fetchBookings, updateBookingStatus, generateMeetingLink } from '../../services/bookingService';
import { Booking } from '../../types/booking';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        // Check if user is logged in and is admin
        if (!auth.currentUser) {
          navigate('/admin/login');
          return;
        }

        if (!isAdmin()) {
          toast.error('Unauthorized access');
          navigate('/admin/login');
          return;
        }

        const data = await fetchBookings();
        setBookings(data);
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        toast.error(error.message || 'Failed to fetch bookings');
        if (error.code === 'permission-denied' || error.message === 'Unauthorized access') {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleApprove = async (bookingId: string, booking: Booking) => {
    try {
      await updateBookingStatus(bookingId, 'approved');
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'approved' } : b
        )
      );
      toast.success('Booking approved successfully');
    } catch (error: any) {
      console.error('Error approving booking:', error);
      toast.error(error.message || 'Failed to approve booking');
      if (error.message === 'Unauthorized access') {
        navigate('/admin/login');
      }
    }
  };

  const handleReject = async (bookingId: string, booking: Booking) => {
    const reason = window.prompt('Please enter a reason for rejection:');
    if (reason === null) return;

    try {
      await updateBookingStatus(bookingId, 'rejected', reason);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'rejected', rejectionReason: reason } : b
        )
      );
      toast.success('Booking rejected successfully');
    } catch (error: any) {
      console.error('Error rejecting booking:', error);
      toast.error(error.message || 'Failed to reject booking');
      if (error.message === 'Unauthorized access') {
        navigate('/admin/login');
      }
    }
  };

  const handleGenerateMeetLink = async (bookingId: string, booking: Booking) => {
    try {
      const meetLink = await generateMeetingLink(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, meetingLink: meetLink } : b
        )
      );
      toast.success('Meeting link generated successfully');
    } catch (error: any) {
      console.error('Error generating meeting link:', error);
      toast.error(error.message || 'Failed to generate meeting link');
      if (error.message === 'Unauthorized access') {
        navigate('/admin/login');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <BookingTable
            bookings={bookings.filter(booking => 
              statusFilter === 'all' || booking.status === statusFilter
            )}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            onApprove={handleApprove}
            onReject={handleReject}
            onGenerateMeetLink={handleGenerateMeetLink}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;