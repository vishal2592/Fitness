import React from "react";
import HeroImage from "../assets/Images/HeroImage.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-wider">
              New Season
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-[85px] font-extrabold text-white leading-normal mb-4">
            Transform Your
            <span className="block text-transparent bg-clip-text text-[#8ED51F]">
              Body & Mind
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-lg mb-8 leading-relaxed">
            Join the ultimate fitness community. Get personalized
            training, state-of-the-art equipment, and the motivation
            you need to crush your goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-[#8ED51F] text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 text-lg">
              Get Started
              <span className="ml-2">→</span>
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 text-lg">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                Active Members
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                Expert Trainers
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                Open Access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl z-10" />
      <div className="absolute top-1/4 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl z-10" />
    </section>
  );
};

export default Hero;