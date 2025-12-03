/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Book, Menu, Bell, X, Plus, Edit, Trash2, Upload, Download, Filter, Search } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';

export default function AdminDashboard() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      price: 15.99,
      quantity: 10,
      available: 7,
      borrowed: 2,
      sold: 1,
      status: 'Available',
      borrower: 'John Smith',
      borrowDate: '2024-11-20',
      dueDate: '2024-12-04',
      overdue: false
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      price: 12.99,
      quantity: 8,
      available: 5,
      borrowed: 2,
      sold: 1,
      status: 'Borrowed',
      borrower: 'Jane Doe',
      borrowDate: '2024-11-15',
      dueDate: '2024-11-29',
      overdue: true
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      price: 14.99,
      quantity: 15,
      available: 10,
      borrowed: 3,
      sold: 2,
      status: 'Available',
      borrower: null,
      borrowDate: null,
      dueDate: null,
      overdue: false
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      price: 11.99,
      quantity: 12,
      available: 8,
      borrowed: 2,
      sold: 2,
      status: 'Available',
      borrower: null,
      borrowDate: null,
      dueDate: null,
      overdue: false
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      price: 16.99,
      quantity: 20,
      available: 0,
      borrowed: 15,
      sold: 5,
      status: 'Sold Out',
      borrower: null,
      borrowDate: null,
      dueDate: null,
      overdue: false
    }
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    quantity: ''
  });

  const [notifications] = useState([
    {
      id: 1,
      type: 'return',
      borrower: 'Alice Johnson',
      bookTitle: 'The Catcher in the Rye',
      borrowDate: '2024-11-10',
      returnDate: '2024-11-30',
      message: 'returned a book'
    },
    {
      id: 2,
      type: 'return',
      borrower: 'Bob Williams',
      bookTitle: 'Moby Dick',
      borrowDate: '2024-11-12',
      returnDate: '2024-12-01',
      message: 'returned a book'
    },
    {
      id: 3,
      type: 'request',
      borrower: 'Carol Martinez',
      bookTitle: 'The Great Gatsby',
      requestDate: '2024-12-02',
      message: 'submitted a borrow request'
    },
    {
      id: 4,
      type: 'request',
      borrower: 'David Lee',
      bookTitle: 'War and Peace',
      requestDate: '2024-12-02',
      message: 'submitted a borrow request'
    },
    {
      id: 5,
      type: 'request',
      borrower: 'Emma Davis',
      bookTitle: '1984',
      requestDate: '2024-12-03',
      message: 'submitted a borrow request'
    }
  ]);

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.genre || !newBook.price || !newBook.quantity) {
      alert('Please fill in all fields.');
      return;
    }
    
    const bookToAdd = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      price: parseFloat(newBook.price),
      quantity: parseInt(newBook.quantity),
      available: parseInt(newBook.quantity),
      borrowed: 0,
      sold: 0,
      status: 'Available',
      borrower: null,
      borrowDate: null,
      dueDate: null,
      overdue: false
    };
    
    setBooks([...books, bookToAdd]);
    setNewBook({ title: '', author: '', genre: '', price: '', quantity: '' });
    setIsAddBookModalOpen(false);
    alert('Book added successfully!');
  };

  const handleEditBook = () => {
    if (!selectedBook.title || !selectedBook.author || !selectedBook.genre || !selectedBook.price || !selectedBook.quantity) {
      alert('Please fill in all fields.');
      return;
    }
    
    setBooks(books.map(book => 
      book.id === selectedBook.id ? selectedBook : book
    ));
    setIsEditBookModalOpen(false);
    setSelectedBook(null);
    alert('Book updated successfully!');
  };

  const handleDeleteBook = (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
      alert('Book deleted successfully!');
    }
  };

  const openEditModal = (book) => {
    setSelectedBook({ ...book });
    setIsEditBookModalOpen(true);
  };

  const handleUploadBooks = () => {
    alert('Upload functionality: Select a file to upload books in bulk.');
  };

  const handleDownloadBooks = () => {
    alert('Downloading books data...');
    const dataStr = JSON.stringify(books, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'books-data.json';
    link.click();
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'available') return matchesSearch && book.status === 'Available';
    if (filterBy === 'borrowed') return matchesSearch && book.status === 'Borrowed';
    if (filterBy === 'sold') return matchesSearch && book.status === 'Sold Out';
    if (filterBy === 'overdue') return matchesSearch && book.overdue;
    
    return matchesSearch && book.genre === filterBy;
  });

  const returnedBooks = notifications.filter(n => n.type === 'return').length;
  const borrowRequests = notifications.filter(n => n.type === 'request').length;
  const overdueCount = books.filter(b => b.overdue).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#6b4f4f' }}>
              Dashboard
            </h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600">Total Books</p>
              <p className="text-2xl font-bold" style={{ color: '#6b4f4f' }}>{books.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600">Books Borrowed</p>
              <p className="text-2xl font-bold text-blue-600">
                {books.reduce((sum, book) => sum + book.borrowed, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600">Books Sold</p>
              <p className="text-2xl font-bold text-green-600">
                {books.reduce((sum, book) => sum + book.sold, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600">Overdue Books</p>
              <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
          </div>

          {/* Action Buttons and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <button
                onClick={() => setIsAddBookModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                <Plus size={20} />
                Add Book
              </button>
              <button
                onClick={handleUploadBooks}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                <Upload size={20} />
                Upload Books
              </button>
              <button
                onClick={handleDownloadBooks}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                <Download size={20} />
                Download Books
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
              >
                <option value="all">All Books</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="sold">Sold Out</option>
                <option value="overdue">Overdue</option>
                <option value="Classic">Classic</option>
                <option value="Fiction">Fiction</option>
                <option value="Dystopian">Dystopian</option>
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#6b4f4f' }}>
                  <tr>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Author</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Genre</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Price</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Available</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Borrowed</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Sold</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <tr key={book.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-semibold">{book.title}</td>
                      <td className="px-4 py-3 text-sm">{book.author}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-gray-200 rounded text-xs">{book.genre}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">${book.price}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600">{book.available}</td>
                      <td className="px-4 py-3 text-sm text-blue-600">{book.borrowed}</td>
                      <td className="px-4 py-3 text-sm text-purple-600">{book.sold}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          book.status === 'Available' ? 'bg-green-100 text-green-700' :
                          book.status === 'Borrowed' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {book.status}
                        </span>
                        {book.overdue && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            Overdue
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(book)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Edit"
                          >
                            <Edit size={18} style={{ color: '#6b4f4f' }} />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Add New Book</h2>
              <button onClick={() => setIsAddBookModalOpen(false)}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Author</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Genre</label>
                <input
                  type="text"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newBook.price}
                  onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Quantity</label>
                <input
                  type="number"
                  value={newBook.quantity}
                  onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <button
                onClick={handleAddBook}
                className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {isEditBookModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Edit Book</h2>
              <button onClick={() => setIsEditBookModalOpen(false)}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Title</label>
                <input
                  type="text"
                  value={selectedBook.title}
                  onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Author</label>
                <input
                  type="text"
                  value={selectedBook.author}
                  onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Genre</label>
                <input
                  type="text"
                  value={selectedBook.genre}
                  onChange={(e) => setSelectedBook({ ...selectedBook, genre: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedBook.price}
                  onChange={(e) => setSelectedBook({ ...selectedBook, price: parseFloat(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Quantity</label>
                <input
                  type="number"
                  value={selectedBook.quantity}
                  onChange={(e) => setSelectedBook({ ...selectedBook, quantity: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                />
              </div>
              <button
                onClick={handleEditBook}
                className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Update Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2025 BookHive Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}