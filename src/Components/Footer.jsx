import React from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaArrowRight,
  FaDumbbell,
  FaHeart,
  FaArrowUp
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Trainers", link: "/trainers" },
    { name: "Programs", link: "/programs" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];

  const programs = [
    { name: "Strength Training", link: "/programs/strength" },
    { name: "Cardio Fitness", link: "/programs/cardio" },
    { name: "Yoga & Mobility", link: "/programs/yoga" },
    { name: "HIIT Workouts", link: "/programs/hiit" },
    { name: "Nutrition Plans", link: "/programs/nutrition" },
    { name: "Personal Training", link: "/programs/personal" },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "123 Fitness Avenue, Los Angeles, CA 90001" },
    { icon: FaPhoneAlt, text: "+1 (555) 123-4567" },
    { icon: FaEnvelope, text: "info@vitalifygym.com" },
    { icon: FaClock, text: "Mon-Sun: 5:00 AM - 11:00 PM" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0d0f12] to-[#0a0c0f] pt-16 pb-6 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-[90rem] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center">
                <FaDumbbell className="text-2xl text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Vitalify</h2>
                <p className="text-lime-400 text-xs font-semibold tracking-wider">FITNESS STUDIO</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your life through fitness. We provide expert coaching, 
              state-of-the-art equipment, and a supportive community to help 
              you achieve your goals.
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 border-2 border-[#0d0f12] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black">JM</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-[#0d0f12] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black">AK</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#0d0f12] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black">SR</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-lime-400/20 border-2 border-[#0d0f12] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-lime-400">+50</span>
                </div>
              </div>
              <span className="text-gray-500 text-xs">Trusted by 500+ members</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1a1f26] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1a1f26] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1a1f26] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1a1f26] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-lime-400 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="text-gray-400 hover:text-lime-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-lime-400/0 group-hover:bg-lime-400 transition-all" />
                    {link.name}
                    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 relative">
              Programs
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-lime-400 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.link}
                    className="text-gray-400 hover:text-lime-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-lime-400/0 group-hover:bg-lime-400 transition-all" />
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 relative">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-lime-400 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300 flex-shrink-0">
                      <Icon className="text-sm" />
                    </div>
                    <span className="text-gray-400 text-sm leading-relaxed group-hover:text-lime-300 transition-colors">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-6 md:p-8 mb-8 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-lime-500/5 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                Subscribe to Our <span className="text-lime-400">Newsletter</span>
              </h4>
              <p className="text-gray-400 text-sm">
                Get weekly fitness tips, workout guides, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-[200px] bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <button className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-lime-500/25 whitespace-nowrap">
                <span>Subscribe</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} <span className="text-lime-400 font-semibold">Vitalify Fitness</span>. 
            All rights reserved. Made with <FaHeart className="inline text-red-500 animate-pulse" /> for fitness.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 text-xs hover:text-lime-400 transition-colors">
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <a href="#" className="text-gray-500 text-xs hover:text-lime-400 transition-colors">
              Terms of Service
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <a href="#" className="text-gray-500 text-xs hover:text-lime-400 transition-colors">
              Sitemap
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 text-black flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg shadow-lime-500/25"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;