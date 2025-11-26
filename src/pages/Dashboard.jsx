import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Home, Camera, Edit2, ChevronRight, ChevronDown, LogOut, Bell, Globe, Lock, Trash, User } from 'lucide-react';


export default function BookHiveApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [verificationCode, setVerificationCode] = useState('');

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      price: 24.99,
      year: 2020,
      cover: "https://m.media-amazon.com/images/I/71aiTCR69YS.jpg"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      price: 27.99,
      year: 2018,
      cover: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b4ae00162484499.63d6c21c6b521.png"
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Sci-Fi",
      price: 28.99,
      year: 2021,
      cover: "https://cdn2.penguin.com.au/covers/original/9781529100624.jpg"
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      price: 26.99,
      year: 2019,
      cover: "https://www.libertybooks.com/image/cache/catalog/9781409181637-640x996.jpg?q6"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      price: 25.99,
      year: 2018,
      cover: "https://tse3.mm.bing.net/th/id/OIP.U3B8rSPKdXtVApmr49d2rwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 6,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      genre: "Fiction",
      price: 26.99,
      year: 2018,
      cover: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=400&fit=crop"
    }
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Korean'];

  const addToCart = (book) => {
    const existing = cartItems.find(item => item.id === book.id);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  const handleSendVerificationCode = () => {
    alert('Verification code sent to johndoe@gmail.com');
  };

  const handleVerify = () => {
    if (verificationCode.trim()) {
      alert('Password reset successful!');
      setVerificationCode('');
      setShowPasswordReset(false);
    } else {
      alert('Please enter the verification code');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Quicksand:wght@400;500;600&display=swap');
          
          .font-opensans {
            font-family: 'Open Sans', sans-serif;
          }
          
          .font-quicksand {
            font-family: 'Quicksand', sans-serif;
          }
        `}
      </style>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-white text-2xl font-bold">📚 BookHive</h1>
            </div>
            
            {/* Icons */}
            <div className="flex items-center gap-4">
              {currentPage === 'userinfo' && (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-white hover:text-yellow-200 transition"
                >
                  <Home size={24} />
                </button>
              )}
              <button
                onClick={() => { setCartOpen(!cartOpen); setMenuOpen(false); }}
                className="text-white hover:text-yellow-200 transition relative"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setMenuOpen(!menuOpen); setCartOpen(false); }}
                className="text-white hover:text-yellow-200 transition"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Cart Dropdown */}
        {cartOpen && (
          <div className="absolute right-4 mt-2 w-80 sm:w-96 rounded-lg shadow-lg z-50" style={{ backgroundColor: '#eab308' }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-800 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-700 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg p-3 flex gap-3">
                      <img src={item.cover} alt={item.title} className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <p className="text-xs text-gray-600">{item.author}</p>
                        <p className="text-xs text-gray-500">{item.genre}</p>
                        <p className="text-sm font-bold text-gray-800 mt-1">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded p-1"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded p-1"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between items-center font-bold text-gray-800">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 mt-2 w-64 rounded-lg shadow-lg z-50" style={{ backgroundColor: '#eab308' }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 rounded-lg font-semibold text-gray-800 transition">
                  Transaction History
                </button>
                <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 rounded-lg font-semibold text-gray-800 transition">
                  Personal Library
                </button>
                <button 
                  onClick={() => { setCurrentPage('userinfo'); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 rounded-lg font-semibold text-gray-800 transition"
                >
                  User Information
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8" style={{ backgroundColor: '#faf3e0' }}>
        {currentPage === 'dashboard' ? (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                    <p className="text-gray-500 text-sm mb-1">Genre: {book.genre}</p>
                    <p className="text-gray-500 text-sm mb-3">Published: {book.year}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-4">${book.price}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(book)}
                        className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition"
                        style={{ backgroundColor: '#6b4f4f' }}
                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                      >
                        Buy
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-lg font-semibold transition"
                        style={{ backgroundColor: '#eab308', color: '#000' }}
                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                      >
                        Borrow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-opensans">User Information</h2>
            
            {/* Profile Section */}
            <div className="rounded-lg shadow-lg p-6 sm:p-8 mb-6" style={{ backgroundColor: '#eab308' }}>
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={64} className="text-gray-500" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-100 transition">
                    <Camera size={20} className="text-gray-700" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-700 font-quicksand">Click the camera icon to upload a photo</p>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-700 font-opensans">Full Name</label>
                      {isEditingName ? (
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-opensans"
                          onBlur={() => setIsEditingName(false)}
                          autoFocus
                        />
                      ) : (
                        <p className="text-gray-800 mt-1 font-opensans">{userName}</p>
                      )}
                    </div>
                    <button 
                      onClick={handleNameEdit}
                      className="ml-4 text-gray-600 hover:text-gray-800 transition"
                    >
                      <Edit2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Email Address */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-700 font-opensans">Email Address</label>
                      <p className="text-gray-800 mt-1 font-opensans">johndoe@gmail.com</p>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold text-gray-800 transition font-opensans">
                      Switch Account
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-gray-700" />
                      <label className="text-sm font-semibold text-gray-700 font-opensans">Notifications</label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                {/* Language */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Globe size={20} className="text-gray-700" />
                      <label className="text-sm font-semibold text-gray-700 font-opensans">Language</label>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setLanguageOpen(!languageOpen)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold text-gray-800 transition flex items-center gap-2 font-opensans"
                      >
                        {selectedLanguage}
                        <ChevronDown size={16} />
                      </button>
                      {languageOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                          {languages.map(lang => (
                            <button
                              key={lang}
                              onClick={() => { setSelectedLanguage(lang); setLanguageOpen(false); }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-opensans"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock size={20} className="text-gray-700" />
                      <label className="text-sm font-semibold text-gray-700 font-opensans">Change Password</label>
                    </div>
                    <button
                      onClick={() => setShowPasswordReset(!showPasswordReset)}
                      className="text-gray-600 hover:text-gray-800 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Password Reset Section */}
                {showPasswordReset && (
                  <div className="bg-white rounded-lg p-6 space-y-4" style={{ backgroundColor: '#faf3e0' }}>
                    <h2 className="text-2xl font-bold text-gray-800 font-opensans">Reset Password</h2>
                    <p className="text-gray-700 font-opensans">johndoe@gmail.com</p>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-opensans">Enter code</label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 font-opensans"
                        placeholder="Enter verification code"
                      />
                    </div>

                    <button
                      onClick={handleSendVerificationCode}
                      className="w-full px-4 py-3 rounded-lg font-semibold text-white transition font-opensans"
                      style={{ backgroundColor: '#6b4f4f' }}
                      onMouseOver={(e) => e.target.style.opacity = '0.8'}
                      onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                      Send Mailbox Verification Code
                    </button>

                    <button
                      onClick={handleVerify}
                      className="w-full px-4 py-3 rounded-lg font-semibold transition font-opensans"
                      style={{ backgroundColor: '#eab308', color: '#000' }}
                      onMouseOver={(e) => e.target.style.opacity = '0.8'}
                      onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                      Verify
                    </button>
                  </div>
                )}

                {/* Delete Account */}
                <div className="bg-white rounded-lg p-4">
                  <button className="flex items-center gap-3 text-red-600 hover:text-red-800 transition w-full">
                    <Trash size={20} />
                    <span className="text-sm font-semibold font-opensans">Delete Account</span>
                  </button>
                </div>

                {/* Logout */}
                <button
                  className="w-full px-4 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 font-opensans"
                  style={{ backgroundColor: '#6b4f4f' }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2025 BookHive. All rights reserved.</p>
      </footer>
    </div>
  );
}