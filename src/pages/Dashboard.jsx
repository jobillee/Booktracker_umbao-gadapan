import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Plus, Minus, Trash2, Book } from 'lucide-react';

const BookHiveDashboard = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('')import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Plus, Minus, Trash2, Book } from 'lucide-react';

const BookHiveDashboard = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Sample book data
  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      year: 1925,
      description: "A story of decadence and excess in Jazz Age America",
      price: 15.99,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Literary Fiction",
      year: 1960,
      description: "A gripping tale of racial injustice and childhood innocence",
      price: 14.99,
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      year: 1949,
      description: "A haunting vision of a totalitarian future",
      price: 13.99,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Contemporary Fiction",
      year: 2020,
      description: "A dazzling novel about all the choices that go into a life well lived",
      price: 18.99,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 5,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      year: 2018,
      description: "An easy and proven way to build good habits and break bad ones",
      price: 16.99,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 6,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      year: 2021,
      description: "A lone astronaut must save the earth from disaster",
      price: 19.99,
      cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 7,
      title: "The Seven Moons of Maali Almeida",
      author: "Shehan Karunatilaka",
      genre: "Literary Fiction",
      year: 2025,
      description: "A supernatural thriller set in war-torn Sri Lanka",
      price: 21.99,
      cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=400&fit=crop",
      status: "Coming Soon",
      section: "coming"
    },
    {
      id: 8,
      title: "The City of Glass",
      author: "Nghi Vo",
      genre: "Fantasy",
      year: 2025,
      description: "A mesmerizing tale of magic and mystery",
      price: 20.99,
      cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop",
      status: "Coming Soon",
      section: "coming"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const addToCart = (book, type) => {
    const existingItem = cart.find(item => item.id === book.id && item.type === type);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id && item.type === type ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1, type }]);
    }
    showNotification(`Book added to cart for ${type}!`, 'success');
  };

  const updateQuantity = (id, type, delta) => {
    setCart(cart.map(item => {
      if (item.id === id && item.type === type) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id, type) => {
    setCart(cart.filter(item => !(item.id === id && item.type === type)));
    showNotification('Book removed from cart', 'info');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      showNotification('Failed to checkout. Payment is required.', 'error');
    } else {
      showNotification('Checkout successful!', 'success');
      
      // Add transaction to history
      const newTransactions = cart.map(item => ({
        id: Date.now() + Math.random(),
        bookId: item.id,
        title: item.title,
        author: item.author,
        cover: item.cover,
        type: item.type,
        quantity: item.quantity,
        price: item.price,
        totalPrice: (item.price * item.quantity).toFixed(2),
        paymentMethod: paymentMethod,
        date: new Date().toISOString(),
        status: item.type === 'borrow' ? 'Borrowed' : 'Purchased'
      }));
      
      setTransactionHistory([...newTransactions, ...transactionHistory]);
      setCart([]);
      setPaymentMethod('');
      setCartOpen(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.year.toString().includes(searchQuery)
  );

  const featuredBooks = filteredBooks.filter(b => b.section === 'featured');
  const recentBooks = filteredBooks.filter(b => b.section === 'recent');
  const comingBooks = filteredBooks.filter(b => b.section === 'coming');

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
        <p className="text-gray-500 text-xs mb-2">{book.genre} • {book.year}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded ${
            book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {book.status}
          </span>
          <span className="font-bold text-lg">${book.price}</span>
        </div>
        {book.status === 'Available' && (
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => addToCart(book, 'borrow')}
              className="flex-1 bg-[#eab308] text-white py-2 rounded hover:bg-[#ca9a06] transition-colors font-semibold"
            >
              Borrow
            </button>
            <button 
              onClick={() => addToCart(book, 'buy')}
              className="flex-1 bg-[#6b4f4f] text-[#faf3e0] py-2 rounded hover:bg-[#5a4040] transition-colors font-semibold"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const TransactionHistory = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3l font-bold text-[#6b4f4f]">Transaction & Borrowing History</h2>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="bg-[#6b4f4f] text-[#faf3e0] px-4 py-3 rounded-lg hover:bg-[#5a4040] transition-colors font-semibold"
        >
          Back to Dashboard
        </button>
      </div>

      {transactionHistory.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No transaction history yet.</p>
          <p className="text-gray-400 text-sm mt-2">Your purchases and borrowed books will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactionHistory.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <img src={transaction.cover} alt={transaction.title} className="w-24 h-32 object-cover rounded" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#6b4f4f]">{transaction.title}</h3>
                      <p className="text-gray-600 text-sm">by {transaction.author}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      transaction.type === 'borrow' 
                        ? 'bg-[#eab308] text-white' 
                        : 'bg-[#6b4f4f] text-[#faf3e0]'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-semibold text-[#6b4f4f]">{transaction.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <p className="font-semibold text-[#6b4f4f]">${transaction.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="font-semibold text-[#6b4f4f] capitalize">{transaction.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-semibold text-[#6b4f4f]">
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf3e0]">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-[#6b4f4f] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-[#5a4040] rounded-lg transition-colors"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:bg-[#5a4040] rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' ? (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by title, author, genre, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:outline-none focus:border-[#5a4040]"
                />
              </div>
            </div>

            {/* Featured Books */}
            {featuredBooks.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Featured Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredBooks.map(book => <BookCard key={book.id} book={book} />)}
                </div>
              </section>
            )}

            {/* Recently Added */}
            {recentBooks.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Recently Added</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recentBooks.map(book => <BookCard key={book.id} book={book} />)}
                </div>
              </section>
            )}

            {/* Coming Soon */}
            {comingBooks.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Coming Soon</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {comingBooks.map(book => <BookCard key={book.id} book={book} />)}
                </div>
              </section>
            )}

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No books found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          <TransactionHistory />
        )}
      </div>

      {/* Footer */}
      
       <footer className="py-6 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p>&copy; {new Date().getFullYear()} BookHive. All rights reserved.</p>
      </footer>

      {/* Cart Modal */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)}></div>
          <div className="fixed top-16 right-4 z-50 bg-[#faf3e0] rounded-lg w-full max-w-md sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-2 border-[#6b4f4f]">
            <div className="flex justify-between items-center p-4 border-b border-[#6b4f4f]">
              <h2 className="text-xl font-bold text-[#6b4f4f]">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-[#6b4f4f] hover:text-[#5a4040]">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#6b4f4f] py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.type}-${idx}`} className="flex gap-3 border-b border-[#eab308] pb-3 bg-white p-3 rounded-lg">
                      <img src={item.cover} alt={item.title} className="w-16 h-24 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#6b4f4f] text-sm truncate">{item.title}</h3>
                        <p className="text-xs text-gray-600 truncate">{item.author}</p>
                        <p className="text-xs text-gray-500">{item.genre} • {item.year}</p>
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                          item.type === 'borrow' ? 'bg-[#eab308] text-white' : 'bg-[#6b4f4f] text-[#faf3e0]'
                        }`}>
                          {item.type === 'borrow' ? 'Borrow' : 'Buy'}
                        </span>
                        <p className="text-base font-bold mt-1 text-[#6b4f4f]">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button 
                          onClick={() => removeFromCart(item.id, item.type)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.type, -1)}
                            className="bg-[#eab308] text-white p-1 rounded hover:bg-[#ca9a06]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-bold text-[#6b4f4f] text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.type, 1)}
                            className="bg-[#eab308] text-white p-1 rounded hover:bg-[#ca9a06]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#6b4f4f] p-4 space-y-3 bg-white">
                <div className="flex justify-between items-center text-lg font-bold text-[#6b4f4f]">
                  <span>Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#6b4f4f]">Payment Method</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b4f4f] rounded focus:outline-none focus:border-[#eab308] text-sm"
                  >
                    <option value="">Select payment method</option>
                    <option value="gcash">GCash</option>
                    <option value="maya">Maya</option>
                    <option value="gotyme">Gotyme</option>
                    <option value="paymaya">PayMaya</option>
                  </select>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#6b4f4f] text-[#faf3e0] py-2.5 rounded-lg hover:bg-[#5a4040] transition-colors font-bold text-sm"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Menu Modal */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-16 right-4 z-50 bg-[#faf3e0] rounded-lg w-72 shadow-2xl border-2 border-[#6b4f4f]">
            <div className="flex justify-between items-center p-4 border-b border-[#6b4f4f]">
              <h2 className="text-xl font-bold text-[#6b4f4f]">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="text-[#6b4f4f] hover:text-[#5a4040]">
                <X size={24} />
              </button>
            </div>
            <div className="p-2">
              {['Transaction/Borrowing History', 'Borrow Book Request', 'User Information', 'Personal Library', 'About the App', 'Logout'].map((item, idx) => (
                <button 
                  key={idx}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#eab308] hover:text-white rounded transition-colors text-[#6b4f4f] font-medium text-sm"
                  onClick={() => {
                    if (item === 'Transaction/Borrowing History') {
                      setCurrentPage('transactions');
                      setMenuOpen(false);
                    } else {
                      showNotification(`${item} clicked`, 'info');
                      setMenuOpen(false);
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookHiveDashboard;;
  
  // Sample book data
  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      year: 1925,
      description: "A story of decadence and excess in Jazz Age America",
      price: 15.99,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Literary Fiction",
      year: 1960,
      description: "A gripping tale of racial injustice and childhood innocence",
      price: 14.99,
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      year: 1949,
      description: "A haunting vision of a totalitarian future",
      price: 13.99,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      status: "Available",
      section: "featured"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Contemporary Fiction",
      year: 2020,
      description: "A dazzling novel about all the choices that go into a life well lived",
      price: 18.99,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 5,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      year: 2018,
      description: "An easy and proven way to build good habits and break bad ones",
      price: 16.99,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 6,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      year: 2021,
      description: "A lone astronaut must save the earth from disaster",
      price: 19.99,
      cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
      status: "Available",
      section: "recent"
    },
    {
      id: 7,
      title: "The Seven Moons of Maali Almeida",
      author: "Shehan Karunatilaka",
      genre: "Literary Fiction",
      year: 2025,
      description: "A supernatural thriller set in war-torn Sri Lanka",
      price: 21.99,
      cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=400&fit=crop",
      status: "Coming Soon",
      section: "coming"
    },
    {
      id: 8,
      title: "The City of Glass",
      author: "Nghi Vo",
      genre: "Fantasy",
      year: 2025,
      description: "A mesmerizing tale of magic and mystery",
      price: 20.99,
      cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop",
      status: "Coming Soon",
      section: "coming"
    }
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (book, type) => {
    const existingItem = cart.find(item => item.id === book.id && item.type === type);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id && item.type === type ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1, type }]);
    }
    showNotification(`Book added to cart for ${type}!`, 'success');
  };

  const updateQuantity = (id, type, delta) => {
    setCart(cart.map(item => {
      if (item.id === id && item.type === type) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id, type) => {
    setCart(cart.filter(item => !(item.id === id && item.type === type)));
    showNotification('Book removed from cart', 'info');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      showNotification('Failed to checkout. Payment is required.', 'error');
    } else {
      showNotification('Checkout successful!', 'success');
      setCart([]);
      setPaymentMethod('');
      setCartOpen(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.year.toString().includes(searchQuery)
  );

  const featuredBooks = filteredBooks.filter(b => b.section === 'featured');
  const recentBooks = filteredBooks.filter(b => b.section === 'recent');
  const comingBooks = filteredBooks.filter(b => b.section === 'coming');

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
        <p className="text-gray-500 text-xs mb-2">{book.genre} • {book.year}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded ${
            book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {book.status}
          </span>
          <span className="font-bold text-lg">${book.price}</span>
        </div>
        {book.status === 'Available' && (
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => addToCart(book, 'borrow')}
              className="flex-1 bg-[#eab308] text-white py-2 rounded hover:bg-[#ca9a06] transition-colors font-semibold"
            >
              Borrow
            </button>
            <button 
              onClick={() => addToCart(book, 'buy')}
              className="flex-1 bg-[#6b4f4f] text-[#faf3e0] py-2 rounded hover:bg-[#5a4040] transition-colors font-semibold"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf3e0]">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-[#6b4f4f] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Book size={32} />
              <span className="text-2xl font-bold">BookHive</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-[#5a4040] rounded-lg transition-colors"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:bg-[#5a4040] rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, author, genre, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:outline-none focus:border-[#5a4040]"
            />
          </div>
        </div>

        {/* Featured Books */}
        {featuredBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredBooks.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}

        {/* Recently Added */}
        {recentBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Recently Added</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentBooks.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {comingBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#6b4f4f] mb-6">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {comingBooks.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching your search.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#6b4f4f] text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 BookHive. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Modal */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)}></div>
          <div className="fixed top-16 right-4 z-50 bg-[#faf3e0] rounded-lg w-full max-w-md sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-2 border-[#6b4f4f]">
            <div className="flex justify-between items-center p-4 border-b border-[#6b4f4f]">
              <h2 className="text-xl font-bold text-[#6b4f4f]">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-[#6b4f4f] hover:text-[#5a4040]">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#6b4f4f] py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.type}-${idx}`} className="flex gap-3 border-b border-[#eab308] pb-3 bg-white p-3 rounded-lg">
                      <img src={item.cover} alt={item.title} className="w-16 h-24 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#6b4f4f] text-sm truncate">{item.title}</h3>
                        <p className="text-xs text-gray-600 truncate">{item.author}</p>
                        <p className="text-xs text-gray-500">{item.genre} • {item.year}</p>
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                          item.type === 'borrow' ? 'bg-[#eab308] text-white' : 'bg-[#6b4f4f] text-[#faf3e0]'
                        }`}>
                          {item.type === 'borrow' ? 'Borrow' : 'Buy'}
                        </span>
                        <p className="text-base font-bold mt-1 text-[#6b4f4f]">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button 
                          onClick={() => removeFromCart(item.id, item.type)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.type, -1)}
                            className="bg-[#eab308] text-white p-1 rounded hover:bg-[#ca9a06]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-bold text-[#6b4f4f] text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.type, 1)}
                            className="bg-[#eab308] text-white p-1 rounded hover:bg-[#ca9a06]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#6b4f4f] p-4 space-y-3 bg-white">
                <div className="flex justify-between items-center text-lg font-bold text-[#6b4f4f]">
                  <span>Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#6b4f4f]">Payment Method</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b4f4f] rounded focus:outline-none focus:border-[#eab308] text-sm"
                  >
                    <option value="">Select payment method</option>
                    <option value="gcash">GCash</option>
                    <option value="maya">Maya</option>
                    <option value="gotyme">Gotyme</option>
                    <option value="paymaya">PayMaya</option>
                  </select>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#6b4f4f] text-[#faf3e0] py-2.5 rounded-lg hover:bg-[#5a4040] transition-colors font-bold text-sm"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Menu Modal */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-16 right-4 z-50 bg-[#faf3e0] rounded-lg w-72 shadow-2xl border-2 border-[#6b4f4f]">
            <div className="flex justify-between items-center p-4 border-b border-[#6b4f4f]">
              <h2 className="text-xl font-bold text-[#6b4f4f]">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="text-[#6b4f4f] hover:text-[#5a4040]">
                <X size={24} />
              </button>
            </div>
            <div className="p-2">
              {['Transaction/Borrowing History', 'Borrow Book Request', 'User Information', 'Personal Library', 'About the App', 'Logout'].map((item, idx) => (
                <button 
                  key={idx}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#eab308] hover:text-white rounded transition-colors text-[#6b4f4f] font-medium text-sm"
                  onClick={() => {
                    showNotification(`${item} clicked`, 'info');
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookHiveDashboard;

