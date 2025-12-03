import React, { useState } from 'react';
import { Bell, Menu, X, Plus, TrendingUp, DollarSign, Package, ShoppingCart, Calendar, User, BookOpen, CheckCircle } from 'lucide-react';

export default function SalesTransactionPage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: 'return',
      borrowerName: 'John Smith',
      bookTitle: 'The Great Gatsby',
      borrowDate: '2024-11-01',
      returnDate: '2024-11-15'
    },
    {
      id: 2,
      type: 'return',
      borrowerName: 'Sarah Johnson',
      bookTitle: '1984',
      borrowDate: '2024-11-05',
      returnDate: '2024-11-20'
    },
    {
      id: 3,
      type: 'return',
      borrowerName: 'Mike Wilson',
      bookTitle: 'To Kill a Mockingbird',
      borrowDate: '2024-11-10',
      returnDate: '2024-11-25'
    },
    {
      id: 4,
      type: 'request',
      borrowerName: 'Emily Davis',
      bookTitle: 'Pride and Prejudice',
      requestDate: '2024-12-01'
    },
    {
      id: 5,
      type: 'request',
      borrowerName: 'David Brown',
      bookTitle: 'The Catcher in the Rye',
      requestDate: '2024-12-02'
    }
  ]);

  const returnNotifications = notifications.filter(n => n.type === 'return');
  const requestNotifications = notifications.filter(n => n.type === 'request');

  // Sales data
  const [sales, setSales] = useState([
    {
      id: 1,
      bookTitle: 'The Great Gatsby',
      buyerName: 'Alice Cooper',
      price: 15.99,
      quantity: 2,
      date: '2024-12-01',
      total: 31.98
    },
    {
      id: 2,
      bookTitle: '1984',
      buyerName: 'Bob Martin',
      price: 14.99,
      quantity: 1,
      date: '2024-12-01',
      total: 14.99
    },
    {
      id: 3,
      bookTitle: 'Pride and Prejudice',
      buyerName: 'Carol White',
      price: 12.99,
      quantity: 3,
      date: '2024-12-02',
      total: 38.97
    },
    {
      id: 4,
      bookTitle: 'To Kill a Mockingbird',
      buyerName: 'Daniel Green',
      price: 16.99,
      quantity: 1,
      date: '2024-12-02',
      total: 16.99
    },
    {
      id: 5,
      bookTitle: 'The Great Gatsby',
      buyerName: 'Eva Black',
      price: 15.99,
      quantity: 1,
      date: '2024-12-03',
      total: 15.99
    }
  ]);

  // Inventory data
  const [inventory, setInventory] = useState([
    { id: 1, bookTitle: 'The Great Gatsby', stock: 45, price: 15.99 },
    { id: 2, bookTitle: '1984', stock: 32, price: 14.99 },
    { id: 3, bookTitle: 'Pride and Prejudice', stock: 27, price: 12.99 },
    { id: 4, bookTitle: 'To Kill a Mockingbird', stock: 38, price: 16.99 },
    { id: 5, bookTitle: 'The Catcher in the Rye', stock: 41, price: 13.99 }
  ]);

  // Form state
  const [newSale, setNewSale] = useState({
    bookTitle: '',
    buyerName: '',
    price: '',
    quantity: 1,
    date: new Date().toISOString().split('T')[0]
  });

  const navigate = (page) => {
    console.log(`Navigating to: ${page}`);
    setIsMenuOpen(false);
  };

  const showNotificationMessage = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddSale = () => {
    if (!newSale.bookTitle || !newSale.buyerName || !newSale.price || !newSale.quantity) {
      showNotificationMessage('Please fill in all fields', 'error');
      return;
    }

    // Check if book exists in inventory
    const bookInInventory = inventory.find(item => 
      item.bookTitle.toLowerCase() === newSale.bookTitle.toLowerCase()
    );

    if (!bookInInventory) {
      showNotificationMessage('Book not found in inventory', 'error');
      return;
    }

    if (bookInInventory.stock < parseInt(newSale.quantity)) {
      showNotificationMessage('Insufficient stock available', 'error');
      return;
    }

    // Add new sale
    const sale = {
      id: sales.length + 1,
      bookTitle: newSale.bookTitle,
      buyerName: newSale.buyerName,
      price: parseFloat(newSale.price),
      quantity: parseInt(newSale.quantity),
      date: newSale.date,
      total: parseFloat(newSale.price) * parseInt(newSale.quantity)
    };

    setSales([sale, ...sales]);

    // Update inventory
    setInventory(inventory.map(item =>
      item.bookTitle.toLowerCase() === newSale.bookTitle.toLowerCase()
        ? { ...item, stock: item.stock - parseInt(newSale.quantity) }
        : item
    ));

    showNotificationMessage('Sale recorded successfully! Inventory updated.', 'success');
    setShowAddSaleModal(false);
    setNewSale({
      bookTitle: '',
      buyerName: '',
      price: '',
      quantity: 1,
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Analytics calculations
  const getTotalRevenue = () => {
    return sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2);
  };

  const getTodaysSales = () => {
    const today = new Date().toISOString().split('T')[0];
    return sales.filter(sale => sale.date === today).length;
  };

  const getBestSellingBooks = () => {
    const bookSales = {};
    sales.forEach(sale => {
      if (bookSales[sale.bookTitle]) {
        bookSales[sale.bookTitle] += sale.quantity;
      } else {
        bookSales[sale.bookTitle] = sale.quantity;
      }
    });
    return Object.entries(bookSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, quantity]) => ({ title, quantity }));
  };

  const getWeeklySales = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= lastWeek && saleDate <= today;
    }).length;
  };

  return (
    <div className="min-h-screen bg-[#faf3e0] flex flex-col">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-[#6b4f4f] text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Notification Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="hover:text-[#eab308] transition-colors relative"
                title="Notifications"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-[#6b4f4f]">Notifications</h3>
                      <button onClick={() => setIsNotificationOpen(false)}>
                        <X size={20} className="text-[#6b4f4f]" />
                      </button>
                    </div>

                    {/* Returns Section */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#6b4f4f] mb-2 flex items-center gap-2">
                        <BookOpen size={18} />
                        Book Returns ({returnNotifications.length})
                      </h4>
                      {returnNotifications.map(notif => (
                        <div key={notif.id} className="bg-[#faf3e0] p-3 rounded-lg mb-2">
                          <p className="font-semibold text-sm text-[#6b4f4f]">{notif.borrowerName}</p>
                          <p className="text-xs text-gray-600">Book: {notif.bookTitle}</p>
                          <p className="text-xs text-gray-500">
                            Borrowed: {notif.borrowDate} | Returned: {notif.returnDate}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Requests Section */}
                    <div>
                      <h4 className="font-semibold text-[#6b4f4f] mb-2 flex items-center gap-2">
                        <User size={18} />
                        Borrow Requests ({requestNotifications.length})
                      </h4>
                      {requestNotifications.map(notif => (
                        <div key={notif.id} className="bg-[#faf3e0] p-3 rounded-lg mb-2">
                          <p className="font-semibold text-sm text-[#6b4f4f]">{notif.borrowerName}</p>
                          <p className="text-xs text-gray-600">Requested: {notif.bookTitle}</p>
                          <p className="text-xs text-gray-500">Date: {notif.requestDate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:text-[#eab308] transition-colors"
                title="Menu"
              >
                <Menu size={24} />
              </button>

              {/* Menu Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => navigate('Borrowing/Lending Management')}
                    className="w-full text-left px-4 py-3 text-[#6b4f4f] hover:bg-[#eab308] hover:text-white transition-colors"
                  >
                    Borrowing/Lending Management
                  </button>
                  <button
                    onClick={() => navigate('Sales Transaction Management')}
                    className="w-full text-left px-4 py-3 text-[#6b4f4f] hover:bg-[#eab308] hover:text-white transition-colors"
                  >
                    Sales Transaction Management
                  </button>
                  <button
                    onClick={() => navigate('Profile & Account Management')}
                    className="w-full text-left px-4 py-3 text-[#6b4f4f] hover:bg-[#eab308] hover:text-white transition-colors"
                  >
                    Profile & Account Management
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#6b4f4f]">Sales Transaction Management</h1>
          <button
            onClick={() => setShowAddSaleModal(true)}
            className="bg-[#6b4f4f] text-white px-4 py-2 rounded-lg hover:bg-[#5a4040] transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Record Sale
          </button>
        </div>

        {/* Sales Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-500" size={32} />
            </div>
            <h3 className="text-gray-600 text-sm">Total Revenue</h3>
            <p className="text-2xl font-bold text-[#6b4f4f]">₱{getTotalRevenue()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="text-blue-500" size={32} />
            </div>
            <h3 className="text-gray-600 text-sm">Total Sales</h3>
            <p className="text-2xl font-bold text-[#6b4f4f]">{sales.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="text-orange-500" size={32} />
            </div>
            <h3 className="text-gray-600 text-sm">Today's Sales</h3>
            <p className="text-2xl font-bold text-[#6b4f4f]">{getTodaysSales()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-500" size={32} />
            </div>
            <h3 className="text-gray-600 text-sm">Weekly Sales</h3>
            <p className="text-2xl font-bold text-[#6b4f4f]">{getWeeklySales()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Best Selling Books */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#6b4f4f] mb-4 flex items-center gap-2">
              <TrendingUp size={24} />
              Best Selling Books
            </h2>
            <div className="space-y-3">
              {getBestSellingBooks().map((book, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#faf3e0] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#6b4f4f] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#6b4f4f]">{book.title}</span>
                  </div>
                  <span className="bg-[#eab308] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {book.quantity} sold
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Inventory */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#6b4f4f] mb-4 flex items-center gap-2">
              <Package size={24} />
              Current Inventory
            </h2>
            <div className="space-y-3">
              {inventory.slice(0, 5).map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-[#faf3e0] rounded-lg">
                  <div>
                    <p className="font-semibold text-[#6b4f4f]">{item.bookTitle}</p>
                    <p className="text-sm text-gray-600">₱{item.price.toFixed(2)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.stock < 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.stock} in stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sales Transactions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#6b4f4f] mb-4">Recent Sales Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#6b4f4f] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Book Title</th>
                  <th className="px-4 py-3 text-left">Buyer Name</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={sale.id} className={index % 2 === 0 ? 'bg-[#faf3e0]' : 'bg-white'}>
                    <td className="px-4 py-3">{sale.date}</td>
                    <td className="px-4 py-3 font-semibold">{sale.bookTitle}</td>
                    <td className="px-4 py-3">{sale.buyerName}</td>
                    <td className="px-4 py-3 text-right">₱{sale.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{sale.quantity}</td>
                    <td className="px-4 py-3 text-right font-bold">₱{sale.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Sale Modal */}
      {showAddSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#6b4f4f]">Record New Sale</h2>
              <button onClick={() => setShowAddSaleModal(false)}>
                <X size={24} className="text-gray-600 hover:text-[#6b4f4f]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title</label>
                <input
                  type="text"
                  value={newSale.bookTitle}
                  onChange={(e) => setNewSale({ ...newSale, bookTitle: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buyer Name</label>
                <input
                  type="text"
                  value={newSale.buyerName}
                  onChange={(e) => setNewSale({ ...newSale, buyerName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
                  placeholder="Enter buyer name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newSale.price}
                  onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newSale.quantity}
                  onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newSale.date}
                  onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleAddSale}
                className="w-full bg-[#6b4f4f] text-white py-3 rounded-lg hover:bg-[#5a4040] transition-colors font-semibold"
              >
                Record Sale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#6b4f4f] text-white text-center py-4 mt-8">
        <p>&copy; 2025BookHive Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}
