import React, { useState } from 'react';
import { Home, ShoppingCart, Menu, X, Book, User, Camera, Globe, Bell, Lock, Trash2, LogOut } from 'lucide-react';

export default function UserInformation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      year: 1925,
      quantity: 1,
      price: 15.99
    },
    {
      id: 2,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      year: 1960,
      quantity: 1,
      price: 12.99
    }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200');
  const [userName, setUserName] = useState('John Doe');
  const [isEditingName, setIsEditingName] = useState(false);
  const [language, setLanguage] = useState('english');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const deleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Please choose a payment method before checkout.');
    } else {
      alert('Checkout successful!');
      setPaymentMethod('');
      setIsCartOpen(false);
    }
  };

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    alert('Name updated successfully!');
  };

  const handleSwitchAccount = () => {
    alert('Switching to a different Google account...');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
      alert('Account deleted successfully. You will be redirected to the landing page.');
      navigateTo('LandingPage');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      {/* Navbar */}
      <nav className="px-6 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="text-white" size={32} />
            <span className="text-white text-xl font-bold">LibraryApp</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('Dashboard')}
              className="text-white hover:text-gray-200 transition"
              title="Home"
            >
              <Home size={24} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gray-200 transition relative"
                title="Cart"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto" style={{ backgroundColor: '#faf3e0' }}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg" style={{ color: '#6b4f4f' }}>Shopping Cart</h3>
                      <button onClick={() => setIsCartOpen(false)}>
                        <X size={20} style={{ color: '#6b4f4f' }} />
                      </button>
                    </div>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">Your cart is empty</p>
                    ) : (
                      <>
                        {cartItems.map(item => (
                          <div key={item.id} className="flex gap-3 mb-4 pb-4 border-b border-gray-300">
                            <img src={item.cover} alt={item.title} className="w-16 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <p className="text-xs text-gray-600">{item.author}</p>
                              <p className="text-xs text-gray-500">{item.genre} • {item.year}</p>
                              <p className="text-sm font-bold mt-1" style={{ color: '#6b4f4f' }}>${item.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 rounded bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
                                >
                                  -
                                </button>
                                <span className="text-sm font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 rounded bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => deleteItem(item.id)}
                                  className="ml-auto text-red-600 hover:text-red-800 text-xs"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="mt-4 pt-4 border-t border-gray-300">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold" style={{ color: '#6b4f4f' }}>Total:</span>
                            <span className="text-xl font-bold" style={{ color: '#6b4f4f' }}>${calculateTotal()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>
                            Payment Method
                          </label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                          >
                            <option value="">Select payment method</option>
                            <option value="gcash">GCash</option>
                            <option value="maya">Maya</option>
                            <option value="gotyme">GoTyme</option>
                            <option value="paymaya">PayMaya</option>
                          </select>
                        </div>
                        
                        <button
                          onClick={handleCheckout}
                          className="w-full mt-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                          style={{ backgroundColor: '#6b4f4f' }}
                        >
                          Checkout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsCartOpen(false);
                }}
                className="text-white hover:text-gray-200 transition"
                title="Menu"
              >
                <Menu size={24} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out" style={{ backgroundColor: '#faf3e0' }}>
                  <div className="py-2">
                    {[
                      { name: 'Transaction/Borrowing History', page: 'TransactionHistory' },
                      { name: 'Borrow Book Request', page: 'BorrowBookRequest' },
                      { name: 'User Information', page: 'UserInformation' },
                      { name: 'Personal Library', page: 'PersonalLibrary' },
                      { name: 'Penalty Tracking', page: 'PenaltyTracking' },
                      { name: 'About the App', page: 'AboutTheApp' },
                      { name: 'Logout', page: 'LandingPage' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => navigateTo(item.page)}
                        className="w-full text-left px-4 py-2 transition-colors duration-200 text-sm"
                        style={{ color: '#6b4f4f' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eab308'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6" style={{ color: '#6b4f4f' }}>
            User Information
          </h1>

          {/* Profile Picture Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <Camera size={24} />
              Profile Picture
            </h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4"
                  style={{ borderColor: '#6b4f4f' }}
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer hover:opacity-90 transition"
                  style={{ backgroundColor: '#6b4f4f' }}
                >
                  <Camera className="text-white" size={20} />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Upload a new profile picture</p>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 5MB</p>
              </div>
            </div>
          </div>

          {/* User Name Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <User size={24} />
              User Name
            </h2>
            <div className="flex items-center gap-3">
              {isEditingName ? (
                <>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#6b4f4f' }}
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-3 rounded text-white font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#6b4f4f' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-4 py-3 rounded border border-gray-300 font-semibold hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-lg font-semibold">{userName}</span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#6b4f4f' }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Google Account Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <LogOut size={24} />
              Google Account
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 mb-1">Connected: johndoe@gmail.com</p>
                <p className="text-sm text-gray-500">Switch to a different Google account</p>
              </div>
              <button
                onClick={handleSwitchAccount}
                className="px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Switch Account
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <Globe size={24} />
              Language
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
              style={{ focusRingColor: '#6b4f4f' }}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="tagalog">Tagalog</option>
            </select>
          </div>

          {/* Notification Settings Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <Bell size={24} />
              Notification Settings
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700">Enable Notifications</p>
                <p className="text-sm text-gray-500">Receive updates about your borrowed books and due dates</p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-14 h-8 rounded-full transition ${
                  notificationsEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <Lock size={24} />
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full py-3 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-300">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <Trash2 size={24} />
              Delete Account
            </h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-3 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2024 LibraryApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
