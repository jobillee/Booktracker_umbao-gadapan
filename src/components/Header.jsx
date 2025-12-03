import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import supabase from '../lib/supabase';

export default function Header({ onCartClick, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Transaction/Borrowing History', path: '/transaction' },
    { label: 'Borrow Book Request', path: '/transaction' },
    { label: 'User Information', path: '/userinformation' },
    { label: 'Personal Library', path: '/library' },
    { label: 'About the App', path: null },
    { label: 'Logout', path: null }
  ];

  const handleMenuAction = (item) => {
    setMenuOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    // handle non-route actions
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

  // fetch current user profile for display
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (!user) return;
        const { data: profile } = await supabase.from('users').select('full_name, role').eq('id', user.id).single();
        if (mounted) setUserProfile(profile || { full_name: user.user_metadata?.full_name || '', role: user.user_metadata?.role || 'borrower' });
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <nav className="bg-[#6b4f4f] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
              </div>
              <span className="text-2xl font-bold">BookHive</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={onCartClick} className="relative p-2 hover:bg-[#5a4040] rounded-lg transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
                {/* user summary */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1 bg-[#5a4040] rounded-md"
                    title="Account"
                  >
                    <span className="text-sm font-medium">{userProfile?.full_name ? userProfile.full_name.split(' ')[0] : 'Account'}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 p-3 text-[#6b4f4f]">
                      <div className="mb-2">
                        <div className="text-sm font-semibold">{userProfile?.full_name || 'Guest'}</div>
                        <div className="text-xs text-gray-600">{userProfile?.role || 'borrower'}</div>
                      </div>
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => { setUserMenuOpen(false); navigate('/userinformation'); }}
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
              <button onClick={() => setMenuOpen(true)} className="p-2 hover:bg-[#5a4040] rounded-lg transition-colors">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Modal (shared in header) */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-16 right-4 z-50 bg-[#faf3e0] rounded-lg w-72 sm:w-80 md:w-96 shadow-2xl border-2 border-[#6b4f4f]">
            <div className="flex justify-between items-center p-4 border-b border-[#6b4f4f]">
              <h2 className="text-xl font-bold text-[#6b4f4f]">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="text-[#6b4f4f] hover:text-[#5a4040]">
                <X size={24} />
              </button>
            </div>
            <div className="p-2">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#eab308] hover:text-white rounded transition-colors text-[#6b4f4f] font-medium text-sm"
                  onClick={() => handleMenuAction(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
