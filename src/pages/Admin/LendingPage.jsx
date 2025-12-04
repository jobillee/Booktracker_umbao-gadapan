import React, { useState } from 'react';
import { Book, Home, Menu, X, Plus, Edit, Calendar, Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

export default function LendingManagement() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddLendingModalOpen, setIsAddLendingModalOpen] = useState(false);
  const [isEditLendingModalOpen, setIsEditLendingModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedLending, setSelectedLending] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const [lendings, setLendings] = useState([
    {
      id: 1,
      bookTitle: 'The Great Gatsby',
      borrower: 'Rizz',
      borrowDate: '2024-11-20',
      dueDate: '2024-12-04',
      returnDate: null,
      status: 'Active',
      reminderSet: true,
      interestRate: 2.00,
      daysOverdue: 0,
      interestFee: 0
    },
    {
      id: 2,
      bookTitle: 'To Kill a Mockingbird',
      borrower: 'Dodong',
      borrowDate: '2024-11-15',
      dueDate: '2024-11-29',
      returnDate: null,
      status: 'Overdue',
      reminderSet: true,
      interestRate: 2.00,
      daysOverdue: 5,
      interestFee: 10.00
    },
    {
      id: 3,
      bookTitle: '1984',
      borrower: 'Charlie',
      borrowDate: '2024-11-10',
      dueDate: '2024-11-24',
      returnDate: '2024-11-23',
      status: 'Returned',
      reminderSet: false,
      interestRate: 2.00,
      daysOverdue: 0,
      interestFee: 0
    }
  ]);

  const [newLending, setNewLending] = useState({
    bookTitle: '',
    borrower: '',
    borrowDate: '',
    dueDate: '',
    interestRate: '2.00'
  });

  const [reminderSettings, setReminderSettings] = useState({
    daysBeforeDue: 3,
    enableAutoReminders: true
  });

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  const calculateDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateInterestFee = (daysOverdue, interestRate) => {
    return (daysOverdue * interestRate).toFixed(2);
  };

  const handleAddLending = () => {
    if (!newLending.bookTitle || !newLending.borrower || !newLending.borrowDate || !newLending.dueDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const lendingToAdd = {
      id: lendings.length + 1,
      bookTitle: newLending.bookTitle,
      borrower: newLending.borrower,
      borrowDate: newLending.borrowDate,
      dueDate: newLending.dueDate,
      returnDate: null,
      status: 'Active',
      reminderSet: true,
      interestRate: parseFloat(newLending.interestRate),
      daysOverdue: 0,
      interestFee: 0
    };

    setLendings([...lendings, lendingToAdd]);
    setNewLending({ bookTitle: '', borrower: '', borrowDate: '', dueDate: '', interestRate: '2.00' });
    setIsAddLendingModalOpen(false);
    alert('Lending record added successfully!');
  };

  const handleEditLending = () => {
    setLendings(lendings.map(lending =>
      lending.id === selectedLending.id ? selectedLending : lending
    ));
    setIsEditLendingModalOpen(false);
    alert('Lending record updated successfully!');
  };

  const handleMarkAsReturned = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setLendings(lendings.map(lending =>
      lending.id === id ? { ...lending, returnDate: today, status: 'Returned' } : lending
    ));
    alert('Book marked as returned!');
  };

  const handleUpdateStatus = () => {
    const updatedLendings = lendings.map(lending => {
      if (lending.status === 'Active' && !lending.returnDate) {
        const daysOverdue = calculateDaysOverdue(lending.dueDate);
        if (daysOverdue > 0) {
          return {
            ...lending,
            status: 'Overdue',
            daysOverdue,
            interestFee: calculateInterestFee(daysOverdue, lending.interestRate)
          };
        }
      }
      return lending;
    });
    setLendings(updatedLendings);
    alert('Book statuses updated successfully!');
  };

  const handleSaveReminders = () => {
    setIsReminderModalOpen(false);
    alert('Reminder settings saved!');
  };

  const openEditModal = (lending) => {
    setSelectedLending({ ...lending });
    setIsEditLendingModalOpen(true);
  };

  const filteredLendings = lendings.filter(lending => {
    if (filterStatus === 'all') return true;
    return lending.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const activeCount = lendings.filter(l => l.status === 'Active').length;
  const overdueCount = lendings.filter(l => l.status === 'Overdue').length;
  const returnedCount = lendings.filter(l => l.status === 'Returned').length;
  const totalInterestFees = lendings.reduce((sum, l) => sum + parseFloat(l.interestFee || 0), 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      <nav className="px-4 md:px-6 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="w-full flex items-center justify-between">
          <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => navigateTo('Dashboard')}
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              <Home size={24} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200 transition flex items-center gap-2"
              >
                <Menu size={24} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out" style={{ backgroundColor: '#faf3e0' }}>
                  <div className="py-2">
                    {[
                      { name: 'Profile Management', page: 'ProfileManagement' },
                      { name: 'Sales Transaction', page: 'SalesTransaction' }
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

      <main className="flex-1 px-4 md:px-6 py-6 md:py-8">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#6b4f4f', fontStyle:'Open-Sans' }}>
            Lending Management
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600">Active Loans</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{activeCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600">Overdue</p>
              <p className="text-xl md:text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600">Returned</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{returnedCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-600">Total Fees</p>
              <p className="text-xl md:text-2xl font-bold" style={{ color: '#6b4f4f' }}>${totalInterestFees}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4">
              <button
                onClick={() => setIsAddLendingModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition text-sm md:text-base"
                style={{ backgroundColor: '#6b4f4f', fontStyle:'Open-Sans' }}
              >
                <Plus size={20} />
                Record New Lending
              </button>
              <button
                onClick={() => setIsReminderModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition text-sm md:text-base"
                style={{ backgroundColor: '#6b4f4f', fontStyle:'Open-Sans' }}
              >
                <Clock size={20} />
                Set Reminders
              </button>
              <button
                onClick={handleUpdateStatus}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition text-sm md:text-base"
                style={{ backgroundColor: '#6b4f4f', fontStyle:'Open-Sans' }}
              >
                <AlertCircle size={20} />
                Update Status
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f', fontStyle:'Open-Sans' }}>Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 text-sm md:text-base"
              >
                <option value="all">All Loans</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="returned">Returned</option>
              </select>
            </div>
          </div>

          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#6b4f4f', fontStyle:'Open-Sans' }}>
                  <tr>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Book Title</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Borrower</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Borrow Date</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Due Date</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Return Date</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Interest Fee</th>
                    <th className="px-4 py-3 text-left text-white text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLendings.map((lending, index) => (
                    <tr key={lending.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-semibold">{lending.bookTitle}</td>
                      <td className="px-4 py-3 text-sm">{lending.borrower}</td>
                      <td className="px-4 py-3 text-sm">{lending.borrowDate}</td>
                      <td className="px-4 py-3 text-sm">{lending.dueDate}</td>
                      <td className="px-4 py-3 text-sm">{lending.returnDate || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          lending.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                          lending.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {lending.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-red-600">
                        ${lending.interestFee || '0.00'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(lending)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit size={18} style={{ color: '#6b4f4f' }} />
                          </button>
                          {lending.status !== 'Returned' && (
                            <button
                              onClick={() => handleMarkAsReturned(lending.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <CheckCircle size={18} className="text-green-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {filteredLendings.map((lending) => (
              <div key={lending.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: '#6b4f4f' }}>{lending.bookTitle}</h3>
                    <p className="text-sm text-gray-600">{lending.borrower}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    lending.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                    lending.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {lending.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-gray-600">Borrowed: {lending.borrowDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-gray-600">Due: {lending.dueDate}</span>
                  </div>
                  {lending.returnDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-gray-500" />
                      <span className="text-gray-600">Returned: {lending.returnDate}</span>
                    </div>
                  )}
                  {lending.interestFee > 0 && (
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-red-600" />
                      <span className="text-red-600 font-semibold">Fee: ${lending.interestFee}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(lending)}
                    className="flex-1 px-3 py-2 rounded text-white text-sm font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#6b4f4f' }}
                  >
                    Edit
                  </button>
                  {lending.status !== 'Returned' && (
                    <button
                      onClick={() => handleMarkAsReturned(lending.id)}
                      className="flex-1 px-3 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
                    >
                      Mark Returned
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isAddLendingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Record New Lending</h2>
              <button onClick={() => setIsAddLendingModalOpen(false)}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Book Title</label>
                <input
                  type="text"
                  value={newLending.bookTitle}
                  onChange={(e) => setNewLending({ ...newLending, bookTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Borrower Name</label>
                <input
                  type="text"
                  value={newLending.borrower}
                  onChange={(e) => setNewLending({ ...newLending, borrower: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Borrow Date</label>
                <input
                  type="date"
                  value={newLending.borrowDate}
                  onChange={(e) => setNewLending({ ...newLending, borrowDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Due Date</label>
                <input
                  type="date"
                  value={newLending.dueDate}
                  onChange={(e) => setNewLending({ ...newLending, dueDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Interest Rate (per day)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newLending.interestRate}
                  onChange={(e) => setNewLending({ ...newLending, interestRate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleAddLending}
                className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Add Lending Record
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditLendingModalOpen && selectedLending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Edit Lending Record</h2>
              <button onClick={() => setIsEditLendingModalOpen(false)}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Book Title</label>
                <input
                  type="text"
                  value={selectedLending.bookTitle}
                  onChange={(e) => setSelectedLending({ ...selectedLending, bookTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Borrower Name</label>
                <input
                  type="text"
                  value={selectedLending.borrower}
                  onChange={(e) => setSelectedLending({ ...selectedLending, borrower: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Due Date</label>
                <input
                  type="date"
                  value={selectedLending.dueDate}
                  onChange={(e) => setSelectedLending({ ...selectedLending, dueDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>Interest Rate</label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedLending.interestRate}
                  onChange={(e) => setSelectedLending({ ...selectedLending, interestRate: parseFloat(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleEditLending}
                className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Update Lending Record
              </button>
            </div>
          </div>
        </div>
      )}

      {isReminderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Reminder Settings</h2>
              <button onClick={() => setIsReminderModalOpen(false)}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#6b4f4f' }}>
                  Send reminder (days before due date)
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={reminderSettings.daysBeforeDue}
                  onChange={(e) => setReminderSettings({ ...reminderSettings, daysBeforeDue: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#6b4f4f' }}>Enable Automatic Reminders</p>
                  <p className="text-xs text-gray-500">Send reminders automatically</p>
                </div>
                <button
                  onClick={() => setReminderSettings({ ...reminderSettings, enableAutoReminders: !reminderSettings.enableAutoReminders })}
                  className={`relative w-14 h-8 rounded-full transition ${
                    reminderSettings.enableAutoReminders ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      reminderSettings.enableAutoReminders ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={handleSaveReminders}
                className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}
              >
                Save Reminder Settings
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-4 text-center text-white" style={{ backgroundColor: '#6b4f4f' }}>
        <p className="text-sm">© 2025 BookHive Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}
