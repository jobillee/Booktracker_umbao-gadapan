import React, { useState } from 'react';
import { Home, ShoppingCart, Menu, X, Book, Search, BookOpen, Calendar } from 'lucide-react';

export default function PersonalLibrary() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
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
  
  const [purchasedBooks] = useState([
    {
      id: 1,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      year: 1925,
      description: 'A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the Jazz Age.',
      purchaseDate: '2024-10-15'
    },
    {
      id: 2,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      year: 1960,
      description: 'A gripping tale of racial injustice and childhood innocence in the American South during the 1930s.',
      purchaseDate: '2024-11-02'
    },
    {
      id: 3,
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      year: 1949,
      description: 'A dystopian social science fiction novel that follows the life of Winston Smith in a totalitarian society.',
      purchaseDate: '2024-09-20'
    },
    {
      id: 4,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      year: 1813,
      description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.',
      purchaseDate: '2024-08-12'
    },
    {
      id: 5,
      cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Fiction',
      year: 1951,
      description: 'A story about teenage rebellion and alienation narrated by the iconic character Holden Caulfield.',
      purchaseDate: '2024-11-20'
    },
    {
      id: 6,
      cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      year: 1937,
      description: 'A fantasy adventure novel about the journey of Bilbo Baggins to win a share of treasure guarded by a dragon.',
      purchaseDate: '2024-07-05'
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

  const filteredBooks = purchasedBooks.filter(book => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    switch (searchFilter) {
      case 'title':
        return book.title.toLowerCase().includes(query);
      case 'author':
        return book.author.toLowerCase().includes(query);
      case 'genre':
        return book.genre.toLowerCase().includes(query);
      case 'year':
        return book.year.toString().includes(query);
      default:
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query) ||
          book.year.toString().includes(query)
        );
    }
  });

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#6b4f4f' }}>
              Personal Library
            </h1>
            <div className="flex items-center gap-2">
              <BookOpen size={32} style={{ color: '#6b4f4f' }} />
              <span className="text-xl font-semibold" style={{ color: '#6b4f4f' }}>
                {purchasedBooks.length} Books
              </span>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your library..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#6b4f4f' }}
                />
              </div>
              <select
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                style={{ focusRingColor: '#6b4f4f' }}
              >
                <option value="all">All Fields</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
              </select>
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600">
                Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} matching "{searchQuery}"
              </p>
            )}
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#6b4f4f' }}>
                      {book.title}
                    </h3>
                    <p className="text-gray-700 font-semibold mb-1">by {book.author}</p>
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-200 rounded">{book.genre}</span>
                      <span>•</span>
                      <span>{book.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-3 border-t border-gray-200">
                      <Calendar size={16} />
                      <span>Purchased: {book.purchaseDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#6b4f4f' }}>
                No Books Found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? 'Try adjusting your search filters or search term.'
                  : 'Your personal library is empty. Start purchasing books to build your collection!'}
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
