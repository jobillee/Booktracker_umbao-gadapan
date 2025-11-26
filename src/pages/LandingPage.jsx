import React, { useState } from 'react';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

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

  return (
    <div 
      className="w-screen min-h-screen flex flex-col" 
      style={{ 
        backgroundColor: '#faf3e0', 
        overflow: 'auto',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Header */}
      <header 
        className="w-full py-3 md:py-4 px-4 md:px-6 flex items-center justify-between" 
        style={{ backgroundColor: '#6b4f4f', flexShrink: 0 }}
      >
        {/* Logo on the left */}
        <div className="flex items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center">
            <img src="logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <span 
            className="ml-2 md:ml-3 text-lg md:text-xl font-bold" 
            style={{ color: '#faf3e0', fontFamily: 'Quicksand, sans-serif' }}
          >
            BookHive
          </span>
        </div>

        {/* Auth buttons on the right */}
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
        {/* Centered Logo */}
        <div className="mb-6 md:mb-8">
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center shadow-2xl" 
            style={{ backgroundColor: '#6b4f4f' }}
          >
            <img src="logo.png" alt="Logo" className="object-contain w-16 h-16 md:w-20 md:h-20" />
          </div>
        </div>

        {/* Tagline */}
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
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModals}
        >
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8"
            style={{ backgroundColor: '#faf3e0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{ color: '#6b4f4f', fontFamily: 'Quicksand, sans-serif' }}
              >
                Welcome Back
              </h2>
              <button 
                onClick={closeModals}
                className="text-2xl leading-none hover:opacity-70"
                style={{ color: '#6b4f4f' }}
              >
                ×
              </button>
            </div>

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
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  placeholder="your@email.com"
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
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button 
                onClick={handleLogin}
                className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90 mt-6"
                style={{ 
                  backgroundColor: '#6b4f4f',
                  color: '#faf3e0',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                Log In
              </button>
            </div>

            <p 
              className="text-center mt-4 text-sm"
              style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
            >
              Don't have an account?{' '}
              <button 
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
                className="font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModals}
        >
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8"
            style={{ backgroundColor: '#faf3e0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{ color: '#6b4f4f', fontFamily: 'Quicksand, sans-serif' }}
              >
                Join BookHive
              </h2>
              <button 
                onClick={closeModals}
                className="text-2xl leading-none hover:opacity-70"
                style={{ color: '#6b4f4f' }}
              >
                ×
              </button>
            </div>

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
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  placeholder="John Doe"
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
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  placeholder="your@email.com"
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
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-opacity-70"
                  style={{ 
                    borderColor: '#6b4f4f',
                    backgroundColor: '#fff',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button 
                onClick={handleSignup}
                className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90 mt-6"
                style={{ 
                  backgroundColor: '#6b4f4f',
                  color: '#faf3e0',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                Create Account
              </button>
            </div>

            <p 
              className="text-center mt-4 text-sm"
              style={{ color: '#6b4f4f', fontFamily: 'Open Sans, sans-serif' }}
            >
              Already have an account?{' '}
              <button 
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
                className="font-medium hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}