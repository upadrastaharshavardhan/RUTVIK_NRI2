import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Calendar, Clock, FileText, Package } from 'lucide-react';
import { poojaTypes, PoojaType } from '../data/poojaTypes';

function BookPooja() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    poojaType: '',
    requirements: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('life_events');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 'life_events', name: 'Life Events' },
    { id: 'homam', name: 'Homams' },
    { id: 'special_occasions', name: 'Special Occasions' }
  ];

  const filteredPoojas = poojaTypes.filter(pooja => pooja.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!auth.currentUser) {
      setError('You need to be logged in to book a pooja.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const { date, time, poojaType } = formData;
    if (!date || !time || !poojaType) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error booking pooja:', err);
      setError('Failed to book pooja. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const selectedPoojaDetails = formData.poojaType ? 
    poojaTypes.find(p => p.id === formData.poojaType) : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Book a Pooja</h2>
          <p className="mt-2 text-center text-gray-600">Schedule your online pooja session</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {/* Category Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pooja Selection */}
            <div>
              <label htmlFor="poojaType" className="block text-sm font-medium text-gray-700">
                Select Pooja
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
                {filteredPoojas.map(pooja => (
                  <option key={pooja.id} value={pooja.id}>
                    {pooja.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Pooja Details */}
            {selectedPoojaDetails && (
              <div className="bg-orange-50 p-6 rounded-lg space-y-4">
                <h4 className="font-semibold text-orange-800 text-lg">{selectedPoojaDetails.name}</h4>
                <p className="text-orange-700">{selectedPoojaDetails.description}</p>
                
                {selectedPoojaDetails.duration && (
                  <div className="flex items-center text-orange-700">
                    <Clock className="w-5 h-5 mr-2" />
                    <p>Duration: {selectedPoojaDetails.duration}</p>
                  </div>
                )}

                {selectedPoojaDetails.requirements && (
                  <div className="border-t border-orange-200 pt-4">
                    <p className="font-medium text-orange-800 mb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      General Requirements:
                    </p>
                    <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                      {selectedPoojaDetails.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPoojaDetails.samagri && (
                  <div className="border-t border-orange-200 pt-4">
                    <p className="font-medium text-orange-800 mb-2 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Pooja Samagri (Required Items):
                    </p>
                    <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                      {selectedPoojaDetails.samagri.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

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
                Special Requirements or Notes
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
    </div>
  );
}

export default BookPooja;