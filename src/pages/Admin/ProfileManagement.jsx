import React, { useState } from 'react';
import { Book, Home, Menu, User, Camera, Save, Edit, Eye, EyeOff, X } from 'lucide-react';

export default function ProfileManagement() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Jobillee Umbao',
    email: 'Bingbing@example.com',
    phone: '+639530000007',
    profilePhoto: null,
    joinDate: 'December 02, 2025',
    accountSummary: {
      borrowed: 12,
      lent: 8,
      purchased: 25
    }
  });

  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setIsMenuOpen(false);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!tempProfile.name || !tempProfile.email || !tempProfile.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    setUserProfile(tempProfile);
    setIsEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...userProfile });
    setIsEditMode(false);
  };

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf3e0' }}>
      <nav className="px-4 md:px-6 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
         <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => navigateTo('Dashboard')} className="text-white hover:text-gray-200 transition flex items-center gap-2">
              <Home size={24} />
              
            </button>
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-200 transition flex items-center gap-2">
                <Menu size={24} />
                
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl z-50" style={{ backgroundColor: '#faf3e0' }}>
                  <div className="py-2">
                    {['Lending Management', 'Sales Transaction'].map((name, i) => (
                      <button key={i} onClick={() => navigateTo(name.replace(' ', ''))} 
                        className="w-full text-left px-4 py-2 transition text-sm" style={{ color: '#6b4f4f' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eab308'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {name}
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#6b4f4f' }}>Profile Management</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Personal Information</h2>
                  {!isEditMode ? (
                    <button onClick={() => { setIsEditMode(true); setTempProfile({ ...userProfile }); }}
                      className="flex items-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                      style={{ backgroundColor: '#6b4f4f' }}>
                      <Edit size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                        style={{ backgroundColor: '#6b4f4f' }}>
                        <Save size={18} />
                        Save
                      </button>
                      <button onClick={handleCancelEdit}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
                      style={{ backgroundColor: '#6b4f4f' }}>
                      {(isEditMode ? tempProfile.profilePhoto : userProfile.profilePhoto) ? (
                        <img src={isEditMode ? tempProfile.profilePhoto : userProfile.profilePhoto} 
                          alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-white" size={64} />
                      )}
                    </div>
                    {isEditMode && (
                      <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                        style={{ border: '2px solid #6b4f4f' }}>
                        <Camera size={20} style={{ color: '#6b4f4f' }} />
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoChange} />
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Member since {userProfile.joinDate}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>Full Name</label>
                    {isEditMode ? (
                      <input type="text" value={tempProfile.name} onChange={e => setTempProfile({ ...tempProfile, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2" />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded">{userProfile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>Email Address</label>
                    {isEditMode ? (
                      <input type="email" value={tempProfile.email} onChange={e => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2" />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded">{userProfile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>Phone Number</label>
                    {isEditMode ? (
                      <input type="tel" value={tempProfile.phone} onChange={e => setTempProfile({ ...tempProfile, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2" />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded">{userProfile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <button onClick={() => setIsPasswordModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#6b4f4f' }}>
                    <Edit size={18} />
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#6b4f4f' }}>Account Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#faf3e0' }}>
                    <div>
                      <p className="text-sm text-gray-600">Books Borrowed</p>
                      <p className="text-2xl font-bold" style={{ color: '#6b4f4f' }}>{userProfile.accountSummary.borrowed}</p>
                    </div>
                    <Book size={32} style={{ color: '#6b4f4f' }} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#faf3e0' }}>
                    <div>
                      <p className="text-sm text-gray-600">Books Lent</p>
                      <p className="text-2xl font-bold" style={{ color: '#6b4f4f' }}>{userProfile.accountSummary.lent}</p>
                    </div>
                    <Book size={32} style={{ color: '#6b4f4f' }} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#faf3e0' }}>
                    <div>
                      <p className="text-sm text-gray-600">Books Purchased</p>
                      <p className="text-2xl font-bold" style={{ color: '#6b4f4f' }}>{userProfile.accountSummary.purchased}</p>
                    </div>
                    <Book size={32} style={{ color: '#6b4f4f' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#6b4f4f' }}>Quick Actions</h2>
                <div className="space-y-2">
                  {['Lending Management', 'Sales Transaction', 'Dashboard'].map((action, i) => (
                    <button key={i} onClick={() => navigateTo(action.replace(' ', ''))}
                      className="w-full text-left px-4 py-3 rounded hover:opacity-90 transition text-sm font-semibold"
                      style={{ backgroundColor: '#faf3e0', color: '#6b4f4f' }}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#6b4f4f' }}>Change Password</h2>
              <button onClick={() => { setIsPasswordModalOpen(false); setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}>
                <X size={24} style={{ color: '#6b4f4f' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>Current Password</label>
                <div className="relative">
                  <input type={showCurrentPassword ? 'text' : 'password'} value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    placeholder="Enter current password" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>New Password</label>
                <div className="relative">
                  <input type={showNewPassword ? 'text' : 'password'} value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    placeholder="Enter new password" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#6b4f4f' }}>Confirm New Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    placeholder="Confirm new password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button onClick={handleChangePassword}
                className="w-full py-3 rounded text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#6b4f4f' }}>
                Update Password
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
