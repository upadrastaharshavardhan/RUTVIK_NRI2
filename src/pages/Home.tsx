import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flower2, Calendar, Video, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Rutvik NRI Services</h1>
          <p className="text-xl mb-8">Connect with your spiritual roots from anywhere in the world</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
            {user && (
              <Link
                to="/book-pooja"
                className="bg-white text-orange-600 hover:bg-orange-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Book Pooja
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Flower2 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Online Pooja Services</h3>
              <p className="text-gray-600">Experience authentic vedic ceremonies from the comfort of your home</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Streaming</h3>
              <p className="text-gray-600">Interactive sessions with experienced priests via Google Meet</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book ceremonies according to your timezone and convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-orange-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 mb-4">"The online pooja service was incredibly convenient and authentic. The priest was very knowledgeable and made us feel connected despite being miles away."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm text-gray-500">New Jersey, USA</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 mb-4">"Being able to participate in traditional ceremonies while living abroad has been a blessing. The scheduling system is very user-friendly."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rajesh Shah</h4>
                  <p className="text-sm text-gray-500">London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;