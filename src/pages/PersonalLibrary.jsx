import React, { useState } from 'react';
import { Home, ShoppingCart, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';

const PersonalLibrary = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      price: 12.99,
      quantity: 1,
      cover: "#c8b6a6"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      price: 14.99,
      quantity: 2,
      cover: "#a8b5c8"
    }
  ]);

  const books = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic Fiction",
      year: "1960",
      cover: "#d4a5a5"
    },
    {
      id: 2,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      year: "1813",
      cover: "#a5c4d4"
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      year: "1937",
      cover: "#b5d4a5"
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      year: "1949",
      cover: "#d4c5a5"
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming-of-age",
      year: "1951",
      cover: "#c5a5d4"
    },
    {
      id: 6,
      title: "Harry Potter",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: "1997",
      cover: "#d4a5c5"
    },
    {
      id: 7,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      year: "1925",
      cover: "#a5d4c5"
    },
    {
      id: 8,
      title: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      year: "1851",
      cover: "#d4b5a5"
    }
  ];

  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.year.includes(query)
    );
  });

  const handleNavigate = (page) => {
    console.log(`Navigating to: src/pages/${page}`);
    alert(`Navigation to ${page} page (src/pages/${page})`);
    setIsMenuOpen(false);
  };

  const updateCartQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 px-4 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
          <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <span 
            className="ml-2 md:ml-3 text-lg md:text-xl font-bold" 
            style={{ color: '#faf3e0', fontFamily: 'Quicksand, sans-serif' }}
          >
            BookHive
          </span>
        </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="text-white hover:bg-white/10 p-2 rounded transition-colors"
              aria-label="Home"
            >
              <Home size={24} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-white hover:bg-white/10 p-2 rounded transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#6b4f4f' }}>Shopping Cart</h3>
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                    ) : (
                      <>
                        {cartItems.map(item => (
                          <div key={item.id} className="mb-4 pb-4 border-b last:border-b-0">
                            <div className="flex gap-3">
                              <div
                                className="w-16 h-20 rounded flex-shrink-0"
                                style={{ backgroundColor: item.cover }}
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.title}</h4>
                                <p className="text-xs text-gray-600">{item.author}</p>
                                <p className="text-xs text-gray-500">{item.genre}</p>
                                <p className="text-sm font-bold mt-1" style={{ color: '#6b4f4f' }}>
                                  ${item.price}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateCartQuantity(item.id, -1)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span className="text-sm font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(item.id, 1)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Plus size={16} />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto p-1 hover:bg-red-100 text-red-600 rounded"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold text-lg" style={{ color: '#6b4f4f' }}>
                              ${getTotalPrice()}
                            </span>
                          </div>
                          <button
                            className="w-full py-2 text-white rounded hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#6b4f4f' }}
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10 p-2 rounded transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {/* Menu Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2">
                  <button
                    onClick={() => handleNavigate('transaction-history')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Transaction History
                  </button>
                  <button
                    onClick={() => handleNavigate('personal-library')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Personal Library
                  </button>
                  <button
                    onClick={() => handleNavigate('user-information')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    User Information
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Label */}
          <h1 className="text-3xl font-bold mb-6" style={{ color: '#6b4f4f' }}>
            Personal Library
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by title, author, genre, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-50"
              style={{ borderColor: '#6b4f4f' }}
            />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-full h-64 flex items-center justify-center text-white text-lg font-semibold"
                  style={{ backgroundColor: book.cover }}
                >
                  Book Cover
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
                  <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-sm text-gray-600">Published Year: {book.year}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p>&copy; {new Date().getFullYear()} BookHive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PersonalLibrary;