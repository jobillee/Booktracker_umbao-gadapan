import React, { useState } from 'react';
import { Home, ShoppingCart, Menu, X, Book, AlertCircle, DollarSign, Calendar, Clock } from 'lucide-react';

export default function PenaltyTracking() {
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
  const [penaltyPaymentMethod, setPenaltyPaymentMethod] = useState('');
  const [selectedPenalties, setSelectedPenalties] = useState([]);
  
  const [penalties] = useState([
    {
      id: 1,
      bookTitle: '1984',
      author: 'George Orwell',
      dueDate: '2024-11-15',
      returnedDate: '2024-11-25',
      daysOverdue: 10,
      finePerDay: 0.50,
      totalFine: 5.00,
      status: 'Unpaid'
    },
    {
      id: 2,
      bookTitle: 'Pride and Prejudice',
      author: 'Jane Austen',
      dueDate: '2024-11-20',
      returnedDate: '2024-12-01',
      daysOverdue: 11,
      finePerDay: 0.50,
      totalFine: 5.50,
      status: 'Unpaid'
    },
    {
      id: 3,
      bookTitle: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      dueDate: '2024-10-10',
      returnedDate: '2024-10-18',
      daysOverdue: 8,
      finePerDay: 0.50,
      totalFine: 4.00,
      status: 'Paid'
    }
  ]);

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

  const togglePenaltySelection = (id) => {
    if (selectedPenalties.includes(id)) {
      setSelectedPenalties(selectedPenalties.filter(penaltyId => penaltyId !== id));
    } else {
      setSelectedPenalties([...selectedPenalties, id]);
    }
  };

  const calculateSelectedTotal = () => {
    return penalties
      .filter(p => selectedPenalties.includes(p.id) && p.status === 'Unpaid')
      .reduce((total, p) => total + p.totalFine, 0)
      .toFixed(2);
  };

  const handlePayPenalties = () => {
    if (selectedPenalties.length === 0) {
      alert('Please select at least one penalty to pay.');
      return;
    }
    if (!penaltyPaymentMethod) {
      alert('Please choose a payment method.');
      return;
    }
    alert(`Payment successful! Total paid: $${calculateSelectedTotal()}`);
    setSelectedPenalties([]);
    setPenaltyPaymentMethod('');
  };

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  const unpaidPenalties = penalties.filter(p => p.status === 'Unpaid');
  const paidPenalties = penalties.filter(p => p.status === 'Paid');
  const totalUnpaid = unpaidPenalties.reduce((sum, p) => sum + p.totalFine, 0).toFixed(2);

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
                        className="w-full text-left px-4 py-2 transition-colors duration-200 text-sm"
                        style={{ 
                          color: '#6b4f4f'
                        }}
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6" style={{ color: '#6b4f4f' }}>
            Penalty Tracking
          </h1>

          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle size={32} style={{ color: '#6b4f4f' }} />
                <div>
                  <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Total Unpaid Penalties</h2>
                  <p className="text-gray-600 text-sm">Outstanding fines from overdue books</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600">${totalUnpaid}</div>
            </div>
          </div>

          {/* Unpaid Penalties */}
          {unpaidPenalties.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#6b4f4f' }}>
                Unpaid Penalties
              </h2>
              <div className="space-y-4">
                {unpaidPenalties.map(penalty => (
                  <div key={penalty.id} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPenalties.includes(penalty.id)}
                        onChange={() => togglePenaltySelection(penalty.id)}
                        className="mt-1 w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{penalty.bookTitle}</h3>
                            <p className="text-sm text-gray-600">by {penalty.author}</p>
                          </div>
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            {penalty.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-500" />
                            <span className="text-gray-700">Due: {penalty.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-500" />
                            <span className="text-gray-700">Returned: {penalty.returnedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-500" />
                            <span className="text-gray-700">{penalty.daysOverdue} days overdue</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-gray-500" />
                            <span className="text-gray-700">${penalty.finePerDay}/day</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="font-semibold">Total Fine:</span>
                          <span className="text-xl font-bold text-red-600">${penalty.totalFine.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              {selectedPenalties.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold" style={{ color: '#6b4f4f' }}>
                      Selected Total:
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      ${calculateSelectedTotal()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>
                      Payment Method *
                    </label>
                    <select
                      value={penaltyPaymentMethod}
                      onChange={(e) => setPenaltyPaymentMethod(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
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
                    onClick={handlePayPenalties}
                    className="w-full py-3 rounded text-white font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#6b4f4f' }}
                  >
                    Pay Selected Penalties
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Paid Penalties History */}
          {paidPenalties.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#6b4f4f' }}>
                Payment History
              </h2>
              <div className="space-y-4">
                {paidPenalties.map(penalty => (
                  <div key={penalty.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{penalty.bookTitle}</h3>
                        <p className="text-sm text-gray-600">by {penalty.author}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {penalty.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-gray-700">Due: {penalty.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-gray-700">Returned: {penalty.returnedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-700">{penalty.daysOverdue} days overdue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-500" />
                        <span className="text-gray-700">Fine: ${penalty.totalFine.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unpaidPenalties.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#6b4f4f' }}>
                No Unpaid Penalties
              </h3>
              <p className="text-gray-600">
                You're all caught up! Keep returning books on time to avoid future penalties.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2024 LibraryApp. All rights reserved.</p>
      </footer>
    </div>
  );
}