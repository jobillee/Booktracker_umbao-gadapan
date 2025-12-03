import React, { useState } from 'react';
import { Search, ShoppingCart, Book } from 'lucide-react';
import Header from '../components/Header';

const TransactionPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample transaction data
  const [transactions] = useState([
    {
      id: 1,
      bookTitle: 'The Great Gatsby',
      type: 'borrowed',
      date: '2024-10-15',
      dueDate: '2024-11-15',
      status: 'returned',
      returnDate: '2024-11-10'
    },
    {
      id: 2,
      bookTitle: 'To Kill a Mockingbird',
      type: 'borrowed',
      date: '2024-11-01',
      dueDate: '2024-12-01',
      status: 'to return',
      returnDate: null
    },
    {
      id: 3,
      bookTitle: '1984',
      type: 'purchased',
      date: '2024-10-20',
      dueDate: null,
      status: 'completed',
      returnDate: null
    },
    {
      id: 4,
      bookTitle: 'Pride and Prejudice',
      type: 'borrowed',
      date: '2024-11-05',
      dueDate: '2024-12-05',
      status: 'to return',
      returnDate: null
    },
    {
      id: 5,
      bookTitle: 'The Catcher in the Rye',
      type: 'purchased',
      date: '2024-09-15',
      dueDate: null,
      status: 'completed',
      returnDate: null
    },
    {
      id: 6,
      bookTitle: 'Harry Potter and the Sorcerer\'s Stone',
      type: 'borrowed',
      date: '2024-10-01',
      dueDate: '2024-11-01',
      status: 'returned',
      returnDate: '2024-10-28'
    }
  ]);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'returned' && transaction.status === 'returned') ||
                          (filterStatus === 'to return' && transaction.status === 'to return');
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'to return':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'returned' || !dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      <Header onCartClick={() => {}} cartCount={0} />

      {/* Main Content */}
      <main className="grow max-w-7xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#6b4f4f' }}>Transaction History</h1>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by book title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ focusRingColor: '#6b4f4f' }}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' 
                  ? 'text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={filterStatus === 'all' ? { backgroundColor: '#6b4f4f' } : {}}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('returned')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'returned' 
                  ? 'text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={filterStatus === 'returned' ? { backgroundColor: '#6b4f4f' } : {}}
            >
              Returned
            </button>
            <button
              onClick={() => setFilterStatus('to return')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'to return' 
                  ? 'text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={filterStatus === 'to return' ? { backgroundColor: '#6b4f4f' } : {}}
            >
              To Return
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="grow">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#6b4f4f' }}>
                      {transaction.bookTitle}
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="text-sm">
                        <span className="font-medium">Type:</span> {transaction.type === 'borrowed' ? 'Borrowed' : 'Purchased'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      {transaction.dueDate && (
                        <p className={`text-sm ${isOverdue(transaction.dueDate, transaction.status) ? 'text-red-600 font-semibold' : ''}`}>
                          <span className="font-medium">Due Date:</span> {new Date(transaction.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          {isOverdue(transaction.dueDate, transaction.status) && ' (Overdue!)'}
                        </p>
                      )}
                      {transaction.returnDate && (
                        <p className="text-sm">
                          <span className="font-medium">Returned:</span> {new Date(transaction.returnDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'to return' ? 'To Return' : transaction.status === 'returned' ? 'Returned' : 'Completed'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-white text-sm">
          © 2024 BookHive. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TransactionPage;