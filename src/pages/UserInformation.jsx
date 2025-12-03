import React, { useState } from 'react';
import { Home, ShoppingCart, Camera, Bell, Globe, LogOut } from 'lucide-react';
import Header from '../components/Header';

export default function UserInformation() {
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHome = () => {
    // In a real app, this would navigate to: /src/pages/Dashboard
    alert('Navigating to Dashboard...\nPath: src/pages/Dashboard');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} cartCount={0} />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8" style={{ backgroundColor: '#faf3e0' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">User Information</h2>
          
          <div className="rounded-lg shadow-lg p-6 sm:p-8" style={{ backgroundColor: '#eab308' }}>
            {/* Profile Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-gray-400">👤</div>
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <Camera size={20} className="text-gray-700" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="mt-3 text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif'}}>Click the camera icon to upload a photo</p>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-gray-600 focus:outline-none transition"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="johndoe@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-gray-600 focus:outline-none transition"
                />
              </div>

              {/* Connected Account */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Connected Account
                </label>
                <div className="bg-white px-4 py-3 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span className="text-gray-700">Google Account</span>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <label className="flex items-center justify-between bg-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-gray-700" />
                    <span className="font-semibold text-gray-800">Notifications</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition ${
                        notifications ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </label>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  <Globe size={20} className="inline mr-2" />
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-gray-600 focus:outline-none transition bg-white cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                  <option value="Filipino">Filipino</option>
                </select>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 hover:opacity-90 mt-8"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-white mt-8" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2025 BookHive. All rights reserved.</p>
      </footer>
    </div>
  );
}