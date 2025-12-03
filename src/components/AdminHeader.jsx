import React, { useState, useEffect } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import supabase from '../lib/supabase';

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Borrowing/Lending Management', path: '/admin/lending' },
    { label: 'Sales Transaction Management', path: '/admin/sales-transaction' },
    { label: 'Profile & Account Management', path: '/admin/profile-management' },
    { label: 'Logout', path: null }
  ];

  const handleMenuAction = (item) => {
    setMenuOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    if (item.label === 'Logout') {
      supabase.auth.signOut().then(({ error }) => {
        if (error) {
          toast.error('Logout failed');
          console.error('Logout error', error);
          return;
        }
        toast.success('Logged out');
        navigate('/');
      });
      return;
    }
    toast(`${item.label} clicked`);
  };

  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (!user) return;
        const { data: profile } = await supabase.from('users').select('full_name, role').eq('id', user.id).single();
        if (mounted) setUserProfile(profile || { full_name: user.user_metadata?.full_name || '', role: user.user_metadata?.role || 'borrower' });
      } catch (err) {
        console.error('AdminHeader profile load failed', err);
      }
    };
    loadProfile();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <nav className="px-6 py-4 shadow-md" style={{ backgroundColor: '#6b4f4f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-20 h-20 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="text-white hover:text-gray-200 transition relative"
                title="Notifications"
              >
                <Bell size={24} />
              </button>
            </div>

            {/* user summary */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1 bg-[#5a4040] rounded-md text-white"
                title="Account"
              >
                <span className="text-sm font-medium">{userProfile?.full_name ? userProfile.full_name.split(' ')[0] : 'Admin'}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 p-3 text-[#6b4f4f]">
                  <div className="mb-2">
                    <div className="text-sm font-semibold">{userProfile?.full_name || 'Admin'}</div>
                    <div className="text-xs text-gray-600">{userProfile?.role || 'admin'}</div>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('/admin/profile-management'); }}
                      className="w-full text-left text-sm py-1"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleMenuAction({ label: 'Logout' })}
                      className="w-full text-left text-sm py-1 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-gray-200 transition"
                title="Menu"
              >
                <Menu size={24} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out" style={{ backgroundColor: '#faf3e0' }}>
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMenuAction(item)}
                        className="w-full text-left px-4 py-2 transition-colors duration-200 text-sm"
                        style={{ color: '#6b4f4f' }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
