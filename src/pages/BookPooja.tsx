import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Calendar, Clock, FileText } from 'lucide-react';

const poojaTypes = [
  'Satyanarayan Katha',
  'Griha Pravesh',
  'Ganesh Pooja',
  'Laxmi Pooja',
  'Navgraha Shanti',
  'Vastu Shanti'
];

function BookPooja() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    poojaType: '',
    requirements: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Check if user is logged in
    if (!auth.currentUser) {
      setError('You need to be logged in to book a pooja.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      return;
    }

    // Basic validation for form inputs
    const { date, time, poojaType } = formData;
    if (!date || !time || !poojaType) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Add booking details to Firestore
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // Navigate to the dashboard upon successful booking
      navigate('/dashboard');
    } catch (err) {
      console.error('Error booking pooja:', err);
      setError('Failed to book pooja. Please try again.');
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Reset error on user interaction
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Book a Pooja</h2>
          <p className="mt-2 text-center text-gray-600">Schedule your online pooja session</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="poojaType" className="block text-sm font-medium text-gray-700">
              Select Pooja Type
            </label>
            <select
              id="poojaType"
              name="poojaType"
              required
              value={formData.poojaType}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select a pooja type</option>
              {poojaTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Special Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Any specific requirements or preferences..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookPooja;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../lib/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { Calendar, Clock, FileText } from 'lucide-react';

// const poojaTypes = [
//   'Satyanarayan Katha',
//   'Griha Pravesh',
//   'Ganesh Pooja',
//   'Laxmi Pooja',
//   'Navgraha Shanti',
//   'Vastu Shanti'
// ];

// function BookPooja() {
//   const [formData, setFormData] = useState({
//     date: '',
//     time: '',
//     poojaType: '',
//     requirements: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!auth.currentUser) {
//       navigate('/login');
//       return;
//     }

//     try {
//       await addDoc(collection(db, 'bookings'), {
//         userId: auth.currentUser.uid,
//         ...formData,
//         status: 'pending',
//         createdAt: new Date().toISOString()
//       });

//       navigate('/dashboard');
//     } catch (err) {
//       setError('Failed to book pooja. Please try again.');
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
//       <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="text-3xl font-bold text-center text-gray-900">Book a Pooja</h2>
//           <p className="mt-2 text-center text-gray-600">Schedule your online pooja session</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="poojaType" className="block text-sm font-medium text-gray-700">
//               Select Pooja Type
//             </label>
//             <select
//               id="poojaType"
//               name="poojaType"
//               required
//               value={formData.poojaType}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
//             >
//               <option value="">Select a pooja type</option>
//               {poojaTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="date" className="block text-sm font-medium text-gray-700">
//                 Date
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   required
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="time" className="block text-sm font-medium text-gray-700">
//                 Time
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Clock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="time"
//                   id="time"
//                   name="time"
//                   required
//                   value={formData.time}
//                   onChange={handleChange}
//                   className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
//               Special Requirements
//             </label>
//             <div className="mt-1 relative">
//               <div className="absolute top-3 left-3">
//                 <FileText className="h-5 w-5 text-gray-400" />
//               </div>
//               <textarea
//                 id="requirements"
//                 name="requirements"
//                 rows={4}
//                 value={formData.requirements}
//                 onChange={handleChange}
//                 className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
//                 placeholder="Any specific requirements or preferences..."
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Book Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookPooja;