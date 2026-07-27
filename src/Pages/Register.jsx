import React, { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaArrowRight,
  FaCheckCircle,
  FaDumbbell,
  FaSpa,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaArrowLeft,
  FaStar,
  FaUsers,
  FaClock,
  FaAward
} from "react-icons/fa";

const Register = () => {
  const [userType, setUserType] = useState("fitness");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSubmitted(true);
    console.log("Registration Data:", { ...formData, userType });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0c0f] flex items-center justify-center py-20 sm:py-24 md:py-28 px-3 sm:px-4 overflow-hidden">
      {/* Background - More Visible */}
      <div className="absolute inset-0 transition-all duration-1000">
        {userType === "fitness" ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
                filter: "brightness(0.5) saturate(1.4)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0f]/60 via-[#0a0c0f]/30 to-[#0a0c0f]/60" />
          </>
        ) : (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80')",
                filter: "brightness(0.5) saturate(1.4)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0f]/60 via-[#0a0c0f]/30 to-[#0a0c0f]/60" />
          </>
        )}
      </div>

      {/* Main Container - Max Width 7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Content with More Details */}
          <div className="hidden lg:block">
            {userType === "fitness" ? (
              <div className="text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-400 font-semibold text-xs tracking-wider px-4 py-2 rounded-full border border-lime-500/30 uppercase mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                  </span>
                  #1 Fitness Studio 2026
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                    <FaDumbbell className="text-4xl text-lime-400" />
                  </div>
                  <div>
                    <span className="text-lime-400 font-bold text-sm tracking-wider uppercase">Strength Training</span>
                    <p className="text-gray-400 text-xs">Elite Fitness Program</p>
                  </div>
                </div>
                
                <h1 className="text-5xl xl:text-6xl font-black leading-tight mb-6">
                  Build Your <br />
                  <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                    Ultimate Physique
                  </span>
                </h1>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                  Join our elite fitness program and transform your body with expert guidance, 
                  state-of-the-art equipment, and a supportive community dedicated to your success.
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
                
                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Expert Personal Trainers with 10+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">State-of-the-Art Equipment & Premium Facilities</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Personalized Workout & Nutrition Plans</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">24/7 Gym Access & Virtual Training Options</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Monthly Progress Tracking & Performance Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Community Events & Transformation Challenges</span>
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
            ) : (
              <div className="text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-400 font-semibold text-xs tracking-wider px-4 py-2 rounded-full border border-lime-500/30 uppercase mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                  </span>
                  Premium Yoga Studio
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                    <FaSpa className="text-4xl text-lime-400" />
                  </div>
                  <div>
                    <span className="text-lime-400 font-bold text-sm tracking-wider uppercase">Mind & Body</span>
                    <p className="text-gray-400 text-xs">Holistic Wellness Program</p>
                  </div>
                </div>
                
                <h1 className="text-5xl xl:text-6xl font-black leading-tight mb-6">
                  Find Your <br />
                  <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                    Inner Peace
                  </span>
                </h1>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                  Discover the perfect balance of strength, flexibility, and mindfulness 
                  with our expert yoga instructors in a serene and nurturing environment.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <FaUsers className="text-lime-400 text-xl mb-2" />
                    <p className="text-2xl font-bold text-white">300+</p>
                    <p className="text-gray-400 text-xs">Active Members</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <FaAward className="text-lime-400 text-xl mb-2" />
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-gray-400 text-xs">Satisfaction Rate</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <FaStar className="text-lime-400 text-xl mb-2" />
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-gray-400 text-xs">Member Rating</p>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Certified Yoga Instructors with 15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Peaceful & Calming Environment for Deep Relaxation</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Multiple Yoga Styles: Hatha, Vinyasa, Ashtanga & More</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Meditation & Breathing Sessions for Mental Wellness</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Personalized Yoga Plans for All Skill Levels</span>
                  </div>
                  <div className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-all">
                      <FaCheckCircle className="text-lime-400 group-hover:text-black text-sm transition-all" />
                    </div>
                    <span className="text-gray-300">Wellness Workshops & Retreat Programs</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-lime-400" />
                    <span className="text-gray-400 text-sm">Est. 2018</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-lime-400" />
                    <span className="text-gray-400 text-sm">300+ Members</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <FaAward className="text-lime-400" />
                    <span className="text-gray-400 text-sm">8 Awards</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Registration Form with Enhanced Shadow */}
          <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-[#0d0f12]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-[0_20px_60px_rgba(204,255,51,0.15)] hover:shadow-[0_30px_80px_rgba(204,255,51,0.25)] transition-shadow duration-500">
              {/* Back Button */}
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-3 sm:mb-4 text-xs sm:text-sm">
                <FaArrowLeft className="text-xs sm:text-sm" />
                <span>Back to Home</span>
              </a>

              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 font-semibold text-[10px] sm:text-xs tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-lime-500/30 uppercase mb-2 sm:mb-3">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-lime-400" />
                  </span>
                  Join Us Today
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                  Create Account
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Start your journey with us
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lime-500/20 flex items-center justify-center mb-3 sm:mb-4 animate-pulse">
                    <FaCheckCircle className="text-4xl sm:text-5xl text-lime-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Registration Successful!</h4>
                  <p className="text-gray-400 text-center text-xs sm:text-sm px-2">
                    Welcome to the family! Please check your email to verify your account.
                  </p>
                  <button className="mt-4 sm:mt-6 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    Login Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* User Type Selection */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType("fitness")}
                      className={`relative p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-300 ${
                        userType === "fitness"
                          ? "border-lime-400 bg-lime-500/10 shadow-lg shadow-lime-500/20"
                          : "border-white/10 hover:border-lime-400/30"
                      }`}
                    >
                      <FaDumbbell className={`text-xl sm:text-2xl mx-auto mb-1 ${
                        userType === "fitness" ? "text-lime-400" : "text-gray-500"
                      }`} />
                      <span className={`text-[10px] sm:text-xs font-semibold ${
                        userType === "fitness" ? "text-lime-400" : "text-gray-400"
                      }`}>
                        Fitness
                      </span>
                      {userType === "fitness" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-lime-400 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-[8px] sm:text-[10px] text-black" />
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("yoga")}
                      className={`relative p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-300 ${
                        userType === "yoga"
                          ? "border-lime-400 bg-lime-500/10 shadow-lg shadow-lime-500/20"
                          : "border-white/10 hover:border-lime-400/30"
                      }`}
                    >
                      <FaSpa className={`text-xl sm:text-2xl mx-auto mb-1 ${
                        userType === "yoga" ? "text-lime-400" : "text-gray-500"
                      }`} />
                      <span className={`text-[10px] sm:text-xs font-semibold ${
                        userType === "yoga" ? "text-lime-400" : "text-gray-400"
                      }`}>
                        Yoga
                      </span>
                      {userType === "yoga" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-lime-400 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-[8px] sm:text-[10px] text-black" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="+1 (555) 000-0000"
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
                        minLength="8"
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="Min 8 characters"
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-white/10 bg-[#0d0f12] text-lime-400 focus:ring-lime-400 focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-lime-400 hover:underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-lime-400 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full text-sm sm:text-base hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40"
                  >
                    <span>Create Account</span>
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

                  {/* Login Link */}
                  <p className="text-center text-gray-400 text-[10px] sm:text-xs">
                    Already have an account?{" "}
                    <a href="/login" className="text-lime-400 font-semibold hover:underline">
                      Sign In
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;