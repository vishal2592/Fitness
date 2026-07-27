import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState('fitness');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', formData);
    }, 1500);
  };

  // Fitness Theme Colors
  const fitnessColors = {
    primary: '#22c55e',
    primaryHover: '#16a34a',
    primaryLight: 'rgba(34, 197, 94, 0.1)',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/30',
    border: 'border-green-500/30',
  };

  // Yoga Theme Colors
  const yogaColors = {
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryLight: 'rgba(139, 92, 246, 0.1)',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/30',
    border: 'border-purple-500/30',
  };

  const colors = userType === 'fitness' ? fitnessColors : yogaColors;

  const userTypes = [
    { id: 'fitness', label: '💪 Fitness', icon: '💪' },
    { id: 'yoga', label: '🧘 Yoga', icon: '🧘' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
      <div className="max-w-md w-full mx-4">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="relative">
              <div className={`absolute inset-0 ${colors.primary} blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
              {userType === 'fitness' ? (
                <svg className="w-10 h-10 text-green-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
                </svg>
              ) : (
                <svg className="w-10 h-10 text-purple-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
                </svg>
              )}
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-light tracking-wider text-white font-serif">
                {userType === 'fitness' ? 'Vitalify' : 'ZenFlow'}
              </span>
              <span className={`text-2xl font-bold ${userType === 'fitness' ? 'text-green-500' : 'text-purple-500'} ml-1`}>
                {userType === 'fitness' ? 'Fitness' : 'Yoga'}
              </span>
            </div>
          </Link>
          <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* User Type Selector */}
        <div className="flex gap-3 mb-6">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setUserType(type.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                userType === type.id
                  ? `bg-${type.id === 'fitness' ? 'green-500' : 'purple-500'} text-white shadow-lg shadow-${type.id === 'fitness' ? 'green' : 'purple'}-500/30`
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border ${colors.border}`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${colors.border} text-white placeholder-gray-400 focus:outline-none focus:border-${userType === 'fitness' ? 'green' : 'purple'}-500 transition-colors duration-300`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border ${colors.border} text-white placeholder-gray-400 focus:outline-none focus:border-${userType === 'fitness' ? 'green' : 'purple'}-500 transition-colors duration-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={`w-4 h-4 rounded border-white/20 bg-white/5 text-${userType === 'fitness' ? 'green' : 'purple'}-500 focus:ring-${userType === 'fitness' ? 'green' : 'purple'}-500 focus:ring-offset-0 focus:ring-1`}
                />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className={`text-${userType === 'fitness' ? 'green' : 'purple'}-500 hover:text-${userType === 'fitness' ? 'green' : 'purple'}-400 text-sm font-medium transition-colors`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? `bg-${userType === 'fitness' ? 'green' : 'purple'}-500/50 cursor-not-allowed`
                  : `bg-${userType === 'fitness' ? 'green' : 'purple'}-500 hover:bg-${userType === 'fitness' ? 'green' : 'purple'}-600 hover:scale-105 shadow-lg ${colors.shadow}`
              } text-white`}
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0a0a0a] text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className={`text-${userType === 'fitness' ? 'green' : 'purple'}-500 hover:text-${userType === 'fitness' ? 'green' : 'purple'}-400 font-medium transition-colors`}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;