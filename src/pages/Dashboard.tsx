import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { doc, collection, getDoc, getDocs, query, where, signOut } from 'firebase/firestore';
import { Calendar, User, MapPin, LogOut } from 'lucide-react';

interface UserData {
  fullName: string;
  email: string;
  city: string;
  country: string;
}

interface BookingData {
  id: string;
  date: string;
  time: string;
  poojaType: string;
  requirements: string;
  status: string;
  createdAt: string;
}

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        // Fetch user data from registerformData collection
        const userDocRef = doc(db, 'registerformData', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data() as UserData);
        }

        // Fetch bookings from bookings collection
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const bookingsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BookingData[];

        setBookings(bookingsList);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData?.fullName}</h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{userData?.city}, {userData?.country}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Bookings Section */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-orange-600" />
            Upcoming Poojas
          </h3>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Pooja Type</p>
                      <p className="text-gray-600">{booking.poojaType}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status</p>
                      <p className={`capitalize ${
                        booking.status === 'pending'
                          ? 'text-yellow-600'
                          : booking.status === 'completed'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {booking.status}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-gray-600">{booking.date}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-gray-600">{booking.time}</p>
                    </div>
                  </div>
                  {booking.requirements && (
                    <div className="mt-4">
                      <p className="font-semibold">Special Requirements</p>
                      <p className="text-gray-600">{booking.requirements}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No upcoming poojas scheduled.</p>
              <button
                onClick={() => navigate('/book-pooja')}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Book Your First Pooja
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;