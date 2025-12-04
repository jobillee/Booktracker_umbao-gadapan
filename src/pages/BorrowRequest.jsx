import React, { useState } from 'react';
import { Home, ShoppingCart, Menu, X, Book, Calendar, Clock, FileText } from 'lucide-react';

export default function BorrowBookRequest() {
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
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    preferredDate: '',
    duration: '7',
    notes: ''
  });

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const deleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmit = () => {
    if (!formData.bookTitle || !formData.author || !formData.preferredDate) {
      alert('Please fill in all required fields.');
      return;
    }
    alert(`Borrow request submitted for "${formData.bookTitle}"!\nThe admin will review your request.`);
    setFormData({
      bookTitle: '',
      author: '',
      isbn: '',
      preferredDate: '',
      duration: '7',
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      {/* Navbar */}
      <nav className="px-6 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center">
          <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <span 
            className="ml-2 md:ml-3 text-lg md:text-xl font-bold" 
            style={{ color: '#eab308', fontFamily: 'Open Sans, sans-serif' }}
          >
            BookHive
          </span>
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
                            style={{ focusRingColor: '#6b4f4f' }}
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
                        className="w-full text-left px-4 py-2 transition-colors duration-200 text-sm hover:bg-yellow-500"
                        style={{ color: '#6b4f4f' }}
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
            Borrow Book Request
          </h1>

          {/* Borrowing Policies */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#6b4f4f' }}>
              <FileText size={24} />
              Borrowing Policies
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 flex-shrink-0" size={20} style={{ color: '#6b4f4f' }} />
                <div>
                  <strong>Borrowing Duration:</strong> Books can be borrowed for 7, 14, or 21 days depending on availability and book type.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 flex-shrink-0" size={20} style={{ color: '#6b4f4f' }} />
                <div>
                  <strong>Due Date:</strong> Due dates are calculated from the day your request is approved. Late returns incur penalties.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Book className="mt-1 flex-shrink-0" size={20} style={{ color: '#6b4f4f' }} />
                <div>
                  <strong>Borrowing Limit:</strong> Users can borrow up to 3 books at a time. Additional requests will be queued until books are returned.
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#6b4f4f' }}>
              Submit Borrowing Request
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Book Title *
                </label>
                <input
                  type="text"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  ISBN (Optional)
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Enter ISBN if known"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Preferred Pickup Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Borrowing Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="21">21 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                  placeholder="Any special requests or notes for the admin"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Submit Request
              </button>
            </div>
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