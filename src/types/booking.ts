export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  date: string;
  time: string;
  poojaType: string;
  status: 'pending' | 'approved' | 'rejected';
  requirements?: string;
  meetingLink?: string;
  rejectionReason?: string;
}