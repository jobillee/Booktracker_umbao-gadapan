import { useState } from 'react';
import { useNavigate } from "react-router-dom";   // ADDED FOR REDIRECT
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();   // ADDED

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // keep role state but provide setter in case UI needs it later
  // default to empty so the "Select role" placeholder shows first
  const [role, setRole] = useState('');
  // separate login inputs to avoid clobbering signup fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // loading states to prevent duplicate requests and show progress
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const handleLogin = async (e) => {
    e && e.preventDefault();
    if (loadingLogin) return;
    if (!loginEmail || !loginPassword) {
      toast.error('Provide email and password');
      return;
    }
    setLoadingLogin(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      console.log('Supabase signIn response:', { data, error });
      if (error) {
        toast.error(error.message || 'Login failed');
        return;
      }
      toast.success('Logged in');
      const user = data?.user;
      if (user) {
        // fetch role from profiles table; fall back to auth metadata or borrower
        try {
          const { data: profile, error: profileErr } = await supabase.from('users').select('role').eq('id', user.id).single();
          const resolvedRole = profile?.role || user.user_metadata?.role || user.raw_user_meta_data?.role || 'borrower';
          if (resolvedRole === 'admin') navigate('/admin');
          else navigate('/dashboard');
        } catch (err) {
          console.error('Role fetch error', err);
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      toast.error('Unexpected error during login');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const doSignup = async () => {
      if (loadingSignup) return;
      if (!fullName || !email || !password) {
        toast.error('Please fill required fields.');
        return;
      }
      if (!role) {
        toast.error('Please select a role.');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }

      setLoadingSignup(true);
      try {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName, role: role }  // Store full_name and role in auth metadata
          }
        });
        console.log('Supabase signUp response:', { data, error });
        if (error) {
          toast.error(error.message || 'Signup failed');
          return;
        }

        const user = data?.user;
        if (!user) {
          toast('Signup request sent. Check your email to confirm.');
          return;
        }

        // Try to insert profile as fallback (trigger should handle this, but this is a backup)
        // Attempt with a small delay to ensure auth.users row is committed
        setTimeout(async () => {
          try {
            const { error: insertError } = await supabase.from('users').insert([
              { id: user.id, email, full_name: fullName, role: role }
            ]);
            if (insertError && !insertError.message?.includes('duplicate')) {
              console.warn('Fallback profile insert failed:', insertError);
            } else if (!insertError) {
              console.log('Profile inserted via fallback');
            }
          } catch (err) {
            console.warn('Fallback profile insert exception:', err);
          }
        }, 500);

        const session = data?.session;
        if (session) {
          toast.success('Signup successful. Redirecting...');
          // decide redirect based on role (profile table or metadata)
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
              const resolvedRole = profile?.role || role || user.user_metadata?.role || user.raw_user_meta_data?.role || 'borrower';
              if (resolvedRole === 'admin') navigate('/admin');
              else navigate('/dashboard');
            } catch (err) {
              console.error('Redirect role fetch failed', err);
              navigate('/dashboard');
            }
          }, 1200);
        } else {
          toast('Check your email to confirm signup. You can sign in after confirming.');
        }
      } catch (err) {
        console.error('Unexpected signup error:', err);
        toast.error('Unexpected error during signup');
      } finally {
        setLoadingSignup(false);
      }
    };

    doSignup();
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col" 
      style={{ 
        backgroundColor: '#faf3e0', 
        overflow: 'auto',
        margin: 0,
        padding: 0
      }}
    >


      {/* Main Content */}
      <main 
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-0" 
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="mb-6 md:mb-8">
          <div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-2xl flex items-center justify-center shadow-2xl" 
            style={{ backgroundColor: '#6b4f4f' }}
          >
            <img src="logo.png" alt="Logo" className="object-contain w-48 h-48 md:w-64 md:h-64" />
          </div>
          {/* Centered Login / Signup buttons under logo */}
          <div className="flex space-x-4 mt-6 justify-center">
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#6b4f4f', color: '#faf3e0', fontFamily: 'Open Sans, sans-serif' }}
            >
              Log In
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#eab308', color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <p 
          className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl leading-relaxed px-4"
          style={{ 
            fontFamily: 'Quicksand',
            color: '#6b4f4f'
          }}
        >
          A hive where all your books, sales, and borrowings are neatly organized.
        </p>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 50
          }}
          onClick={() => setShowLogin(false)}
        >
          <div 
            className="w-full max-w-md p-6 md:p-8 rounded-2xl shadow-2xl"
            style={{ backgroundColor: '#faf3e0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b4f4f' }}
            >
              Log In
            </h2>

            <h4 
              className="text-2l md:text-3l  mb-6 text-center"
              style={{ fontFamily: 'Quicksand', color: '#6b4f4f' }}
            >
              Welcome back to BookHive! your trusted space for managing books, sales, and borrowings.
            </h4>
            
            <div className="space-y-4">
              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="input your email"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                  disabled={loadingLogin}
                />
              </div>
              
              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                  disabled={loadingLogin}
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 mt-6"
                style={{ 
                  fontFamily: 'Open Sans, sans-serif',
                  backgroundColor: '#6b4f4f',
                  color: '#faf3e0'
                }}
                disabled={loadingLogin}
              >
                {loadingLogin ? 'Logging in...' : 'Log In'}
              </button>

              <p className="text-center text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <span style={{ color: '#6b4f4f' }}>Don't have an account? </span>
                <button
                  onClick={switchToSignup}
                  className="font-semibold hover:underline"
                  style={{ color: '#eab308' }}
                >
                  Sign Up
                </button>
              </p>
            </div>

            <button
              onClick={() => setShowLogin(false)}
              className="w-full mt-4 py-2 text-sm transition-all hover:opacity-70"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                color: '#6b4f4f'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignup && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 50
          }}
          onClick={() => setShowSignup(false)}
        >
          <div 
            className="w-full max-w-md p-6 md:p-8 rounded-2xl shadow-2xl"
            style={{ backgroundColor: '#faf3e0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{ fontFamily: 'Open Sans, san-serif', color: '#6b4f4f' }}
            >
              Sign Up
            </h2>

            <h4 
              className="text-2l md:text-3l  mb-6 text-center"
              style={{ fontFamily: 'Quicksand', color: '#6b4f4f' }}
            >
              Welcome to BookHive, Your personal hub for books, sales, and borrowings.
            </h4>
            
            <div className="space-y-4">
              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Input your fullname"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Input your email"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              
              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Input your password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    color: '#6b4f4f'
                  }}
                >
                  <option value="" disabled>Select role</option>
                  <option value="admin">Admin</option>
                  <option value="borrower">Borrower</option>
                </select>
              </div>

              <button
                onClick={handleSignup}
                className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 mt-6"
                style={{ 
                  fontFamily: 'Open Sans, sans-serif',
                  backgroundColor: '#6b4f4f',
                    color: '#faf3e0'
                  }}
                disabled={loadingSignup}
              >
                {loadingSignup ? 'Signing up...' : 'Sign Up'}
              </button>

              <p className="text-center text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <span style={{ color: '#6b4f4f' }}>Already have an account? </span>
                <button
                  onClick={switchToLogin}
                  className="font-semibold hover:underline"
                  style={{ color: '#eab308' }}
                >
                  Login
                </button>
              </p>
            </div>

            <button
              onClick={() => setShowSignup(false)}
              className="w-full mt-4 py-2 text-sm transition-all hover:opacity-70"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                color: '#6b4f4f'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Notifications are handled via react-hot-toast (Toaster in main.jsx) */}
    </div>
  );
}
