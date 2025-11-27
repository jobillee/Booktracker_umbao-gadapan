import React, { useState } from 'react';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup submitted');
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
      {/* Header */}
      <header 
        className="w-full py-3 md:py-4 px-4 md:px-6 flex items-center justify-between" 
        style={{ backgroundColor: '#6b4f4f', flexShrink: 0 }}
      >
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

        <div className="flex gap-2 md:gap-3">
          <button 
            onClick={() => setShowLogin(true)}
            className="px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-lg border-2 transition-all hover:bg-opacity-10"
            style={{ 
              fontFamily: 'Open Sans, sans-serif',
              borderColor: '#faf3e0',
              color: '#faf3e0',
              backgroundColor: 'transparent'
            }}
          >
            Log In
          </button>
          <button 
            onClick={() => setShowSignup(true)}
            className="px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-lg transition-all hover:opacity-90"
            style={{ 
              fontFamily: 'Open Sans, sans-serif',
              backgroundColor: '#faf3e0',
              color: '#6b4f4f'
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

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
        </div>

        <p 
          className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl leading-relaxed px-4"
          style={{ 
            fontFamily: 'Quicksand, sans-serif',
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
              style={{ fontFamily: 'Quicksand, sans-serif', color: '#6b4f4f' }}
            >
              Log In
            </h2>
            
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
                  placeholder="input your email"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
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
                  type="password"
                  placeholder="password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff'
                  }}
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
              >
                Log In
              </button>

              {/* Signup Link */}
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
              style={{ fontFamily: 'Quicksand, sans-serif', color: '#6b4f4f' }}
            >
              Sign Up
            </h2>
            
            <div className="space-y-4">
              <div>
                <label 
                  className="block mb-2 text-sm font-medium"
                  style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Input your fullname"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
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
                  type="email"
                  placeholder="Input your email"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
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
                  type="password"
                  placeholder="Input your password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
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
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
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
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    color: '#6b4f4f'
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Choose Role (admin/borrower)</option>
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
              >
                Sign Up
              </button>

              {/* Login Link */}
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
    </div>
  );
}
