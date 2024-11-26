import { collection, getDocs, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { db, auth, isAdmin, ensureAuthenticated } from '../lib/firebase';
import { Booking } from '../types/booking';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  fullName: string;
  email: string;
  phone?: string;
}

export async function fetchBookings(): Promise<Booking[]> {
  try {
    // Ensure user is authenticated
    const currentUser = ensureAuthenticated();
    
    // Check if user is admin
    if (!isAdmin()) {
      throw new Error('Unauthorized access');
    }

    const bookingsQuery = query(collection(db, 'bookings'));
    const querySnapshot = await getDocs(bookingsQuery);
    const bookingsData: Booking[] = [];
    
    for (const bookingDoc of querySnapshot.docs) {
      const bookingData = bookingDoc.data();
      
      try {
        // Fetch user details for each booking
        const userDoc = await getDoc(doc(db, 'registerformData', bookingData.userId));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          
          bookingsData.push({
            id: bookingDoc.id,
            ...bookingData,
            userName: userData.fullName || 'Unknown User',
            userEmail: userData.email || 'No Email',
            userPhone: userData.phone,
          } as Booking);
        } else {
          // Handle case where user document doesn't exist
          bookingsData.push({
            id: bookingDoc.id,
            ...bookingData,
            userName: 'Unknown User',
            userEmail: 'No Email',
          } as Booking);
        }
      } catch (userError) {
        console.error(`Error fetching user data for booking ${bookingDoc.id}:`, userError);
        // Add booking with placeholder user data
        bookingsData.push({
          id: bookingDoc.id,
          ...bookingData,
          userName: 'Unknown User',
          userEmail: 'No Email',
        } as Booking);
      }
    }
    
    return bookingsData;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'approved' | 'rejected',
  rejectionReason?: string
): Promise<void> {
  try {
    // Ensure user is authenticated and is admin
    ensureAuthenticated();
    if (!isAdmin()) {
      throw new Error('Unauthorized access');
    }

    const bookingRef = doc(db, 'bookings', bookingId);
    const updateData: Record<string, any> = { status };
    
    if (rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    await updateDoc(bookingRef, updateData);
  } catch (error) {
    console.error(`Error updating booking status:`, error);
    throw error;
  }
}

export async function generateMeetingLink(bookingId: string): Promise<string> {
  try {
    // Ensure user is authenticated and is admin
    ensureAuthenticated();
    if (!isAdmin()) {
      throw new Error('Unauthorized access');
    }

    const meetLink = `https://meet.google.com/${uuidv4().substring(0, 8)}`;
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { meetingLink: meetLink });
    return meetLink;
  } catch (error) {
    console.error('Error generating meeting link:', error);
    throw error;
  }
}