import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Category', path: '/category' },
    { name: 'Trainer', path: '/trainer' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#0a0a0a] shadow-2xl shadow-lime-500/10 py-2'
          : 'bg-[#0a0a0a]/95 backdrop-blur-md py-2'
        }`}>
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              {/* Animated Glow Effect */}
              <div className="absolute -inset-3 bg-lime-500/20 blur-2xl rounded-full animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Logo Icon with Animation */}
              <div className="relative">
                <div className="absolute inset-0 bg-lime-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-spin-slow"></div>
                <svg className="w-9 h-9 text-lime-500 relative z-10 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z" />
                </svg>
              </div>

              {/* Brand Text */}
              <div className="flex flex-col leading-tight relative">
                <span className="text-xl font-bold tracking-wider text-white group-hover:text-lime-400 transition-colors duration-300">
                  VITALIFY
                </span>
                <span className="text-[10px] tracking-[0.3em] text-lime-500 uppercase font-semibold relative">
                  Fitness
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-500"></span>
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${active
                        ? 'text-lime-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {active && (
                      <>
                        <span className="absolute inset-0 bg-lime-500/10 rounded-lg"></span>
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-lime-500 rounded-full shadow-lg shadow-lime-500/50"></span>
                      </>
                    )}
                    {!active && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lime-500 rounded-full group-hover:w-6 transition-all duration-300"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Login Button */}
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-6 py-1.5 rounded-full bg-lime-500 hover:bg-lime-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Login</span>
              </Link>

              {/* Login Icon for Mobile */}
              <Link
                to="/login"
                className="sm:hidden text-gray-300 hover:text-lime-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden text-white hover:text-lime-500 transition-colors p-2"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 bg-lime-500' : ''
                    }`}></span>
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                    }`}></span>
                  <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 bg-lime-500' : ''
                    }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slides from Left */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMenu}></div>

        <div className={`absolute top-0 left-0 w-80 h-full bg-[#0a0a0a] shadow-2xl shadow-lime-500/20 transform transition-all duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <div className="p-6 border-b border-lime-500/20">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 group">
                <svg className="w-8 h-8 text-lime-500 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold tracking-wider text-white group-hover:text-lime-400 transition-colors">
                    VITALIFY
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-lime-500 uppercase font-semibold">
                    Fitness
                  </span>
                </div>
              </Link>
              <button onClick={closeMenu} className="text-white hover:text-lime-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${active
                      ? 'bg-lime-500/20 text-lime-500 shadow-lg shadow-green-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full transition-all ${active ? 'bg-lime-500 shadow-lg shadow-lime-500/50' : 'bg-gray-600'
                    }`}></span>
                  <span className="font-medium">{link.name}</span>
                  {active && (
                    <span className="ml-auto text-lime-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-lime-500/20 space-y-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg shadow-lime-500/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-lime-500/20">
            <div className="flex justify-center space-x-6">
              <Link to="#" className="text-gray-400 hover:text-lime-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-lime-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-lime-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-lime-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;