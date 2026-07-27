import React, { useState } from "react";
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaArrowLeft,
  FaDumbbell,
  FaSpa,
  FaUsers,
  FaStar,
  FaAward,
  FaClock
} from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Login Data:", formData);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0c0f] flex items-center justify-center py-20 sm:py-24 md:py-28 px-3 sm:px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
            filter: "brightness(0.4) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0f]/70 via-[#0a0c0f]/40 to-[#0a0c0f]/70" />
      </div>

      {/* Main Container - Max Width 7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="hidden lg:block">
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-400 font-semibold text-xs tracking-wider px-4 py-2 rounded-full border border-lime-500/30 uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                </span>
                Welcome Back
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                  <FaDumbbell className="text-4xl text-lime-400" />
                </div>
                <div>
                  <span className="text-lime-400 font-bold text-sm tracking-wider uppercase">Vitalify Fitness</span>
                  <p className="text-gray-400 text-xs">Elite Fitness Studio</p>
                </div>
              </div>
              
              <h1 className="text-5xl xl:text-6xl font-black leading-tight mb-6">
                Welcome <br />
                <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                  Back!
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                Log in to continue your fitness journey. Track your progress, 
                connect with trainers, and achieve your goals.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <FaUsers className="text-lime-400 text-xl mb-2" />
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-gray-400 text-xs">Active Members</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <FaAward className="text-lime-400 text-xl mb-2" />
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-gray-400 text-xs">Success Rate</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <FaStar className="text-lime-400 text-xl mb-2" />
                  <p className="text-2xl font-bold text-white">4.9</p>
                  <p className="text-gray-400 text-xs">Member Rating</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                    <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                  </div>
                  <span className="text-gray-300">Track Your Progress & Achievements</span>
                </div>
                <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                    <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                  </div>
                  <span className="text-gray-300">Connect with Expert Trainers</span>
                </div>
                <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                    <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                  </div>
                  <span className="text-gray-300">Access Exclusive Workout Plans</span>
                </div>
                <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                    <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                  </div>
                  <span className="text-gray-300">Join Community Challenges</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <FaClock className="text-lime-400" />
                  <span className="text-gray-400 text-sm">Est. 2015</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2">
                  <FaUsers className="text-lime-400" />
                  <span className="text-gray-400 text-sm">500+ Members</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2">
                  <FaAward className="text-lime-400" />
                  <span className="text-gray-400 text-sm">12 Awards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-[#0d0f12]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-[0_20px_60px_rgba(204,255,51,0.15)] hover:shadow-[0_30px_80px_rgba(204,255,51,0.25)] transition-shadow duration-500">
              {/* Back Button */}
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-3 sm:mb-4 text-xs sm:text-sm">
                <FaArrowLeft className="text-xs sm:text-sm" />
                <span>Back to Home</span>
              </a>

              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 font-semibold text-[10px] sm:text-xs tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-lime-500/30 uppercase mb-3 sm:mb-4">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-lime-400" />
                  </span>
                  Welcome Back
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                  Sign In
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  Enter your credentials to access your account
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-20 h-20 rounded-full bg-lime-500/20 flex items-center justify-center mb-4 animate-pulse">
                    <FaCheckCircle className="text-5xl text-lime-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 text-center">Login Successful!</h4>
                  <p className="text-gray-400 text-center text-sm px-2">
                    Welcome back! Redirecting to your dashboard...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-white/10 bg-[#0d0f12] text-lime-400 focus:ring-lime-400 focus:ring-offset-0 cursor-pointer"
                      />
                      <label className="text-gray-400 text-[10px] sm:text-xs">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-lime-400 text-[10px] sm:text-xs hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40"
                  >
                    <span>Sign In</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs sm:text-sm" />
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] sm:text-xs">
                      <span className="bg-[#0d0f12] px-3 sm:px-4 text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1a1f26] border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <FaGoogle className="text-xs sm:text-sm" />
                      <span className="font-medium hidden xs:inline">Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1a1f26] border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <FaFacebook className="text-xs sm:text-sm" />
                      <span className="font-medium hidden xs:inline">Facebook</span>
                    </button>
                  </div>

                  {/* Register Link */}
                  <p className="text-center text-gray-400 text-[10px] sm:text-xs">
                    Don't have an account?{" "}
                    <a href="/register" className="text-lime-400 font-semibold hover:underline">
                      Sign Up Now
                    </a>
                  </p>

                  {/* Demo Credentials */}
                  <div className="mt-4 p-3 sm:p-4 bg-lime-500/5 border border-lime-400/20 rounded-xl">
                    <p className="text-gray-400 text-[10px] sm:text-xs text-center">
                      <span className="text-lime-400 font-semibold">Demo Credentials:</span>
                      <br />
                      <span className="text-gray-500">Email: demo@vitalify.com</span>
                      <span className="mx-2 text-gray-600">|</span>
                      <span className="text-gray-500">Password: demo123</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;