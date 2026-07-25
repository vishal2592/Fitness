import React from "react";
import HeroImage from "../assets/Images/HeroImage.png";
import HeroImage2 from "../assets/Images/HeroImage2.png";
import { FaAngleDoubleRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative h-[420px] md:min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image – अब <picture> से responsive */}
      <picture className="absolute inset-0 w-full h-full z-0">
        {/* मोबाइल (max-width: 768px) पर HeroImage2 */}
        <source media="(max-width: 768px)" srcSet={HeroImage2} />
        {/* डेस्कटॉप (min-width: 769px) पर HeroImage */}
        <source media="(min-width: 769px)" srcSet={HeroImage} />
        {/* Fallback – अगर कोई सपोर्ट न हो */}
        <img
          src={HeroImage}
          alt="Hero Background"
          className="w-full h-full object-cover pt-0 md:pt-24  object-[55%_center] lg:object-center"
        />
      </picture>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 py-2 md:py-14 pt-14">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-1 md:mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-wider">
              New Season
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-6xl lg:text-[85px] font-extrabold text-white leading-tight mb-1 md:mb-4">
            Transform Your
            <span className="block bg-clip-text text-[#8ED51F]">
              Body & Mind
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-sm mb-1 md:mb-8 leading-relaxed">
            Join the ultimate fitness community. Get personalized
            training, state-of-the-art equipment, and the motivation
            you need to crush your goals.
          </p>

          {/* Buttons – मोबाइल पर एक लाइन में */}
          <div className="flex flex-row gap-3 flex-wrap">
            <button className="group px-5 sm:px-8 py-3 sm:py-4 bg-[#8ED51F] text-black font-bold rounded-xl shadow-lg shadow-[#8ED51F]/40 hover:bg-[#9CEB22] hover:shadow-[#8ED51F]/70 transition-all duration-300 hover:scale-105 text-sm sm:text-lg inline-flex items-center gap-2 whitespace-nowrap">
              Get Started
              <FaAngleDoubleRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="px-5 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-lg whitespace-nowrap">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-8 mt-4 md:mt-12 pt-1.5 md:pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
              <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-wider">
                Active Members
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">50+</p>
              <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-wider">
                Expert Trainers
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">24/7</p>
              <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-wider">
                Open Access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl z-10" />
      <div className="absolute top-1/4 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl z-10" />
    </section>
  );
};

export default Hero;