import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaDumbbell, FaStar, FaQuoteLeft } from "react-icons/fa";

const TrainerSection = () => {
  const trainers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Head Strength Coach",
      experience: "12 years",
      specialty: "Powerlifting & Olympic Lifting",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop&crop=face",
      quote: "Strength isn't just physical. It's mental, emotional, and spiritual.",
      stats: { clients: 500, transformations: 120, awards: 8 },
      social: { instagram: "#", twitter: "#", youtube: "#" },
      trainerPage: "/trainer",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      role: "HIIT & Conditioning Expert",
      experience: "8 years",
      specialty: "Cardio & Functional Training",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e7c8b?w=400&h=400&fit=crop&crop=face&auto=format",
      quote: "Your only limit is the one you set for yourself.",
      stats: { clients: 380, transformations: 95, awards: 5 },
      social: { instagram: "#", twitter: "#", youtube: "#" },
      trainerPage: "/trainer",
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Yoga & Mobility Specialist",
      experience: "10 years",
      specialty: "Flexibility & Recovery",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face",
      quote: "Movement is medicine. Find your flow, find your strength.",
      stats: { clients: 420, transformations: 150, awards: 12 },
      social: { instagram: "#", twitter: "#", youtube: "#" },
      trainerPage: "/trainer",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Nutrition & Wellness Coach",
      experience: "7 years",
      specialty: "Diet Planning & Lifestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
      quote: "Abs are made in the kitchen. I'll show you how.",
      stats: { clients: 600, transformations: 200, awards: 6 },
      social: { instagram: "#", twitter: "#", youtube: "#" },
      trainerPage: "/trainer",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0a0c0f] via-[#0d0f12] to-[#0f1218] py-6 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <div className="inline-flex items-center gap-3 bg-lime-500/10 text-lime-400 font-semibold text-xs md:text-sm tracking-[0.2em] px-5 py-2.5 rounded-full border border-lime-500/30 uppercase mb-2 md:mb-4 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              Vitalify coaching team
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 md:mb-4">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              Trainers
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-xl font-light">
            World-class coaches dedicated to your success. Each expert brings unique skills to transform your fitness journey.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl overflow-hidden border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-lime-500/10"
            >
              {/* Image Container - Clickable */}
              <a 
                href={trainer.trainerPage}
                className="relative overflow-hidden aspect-[6/4] block"
                onClick={(e) => {
                  // If using React Router, replace with navigate
                  // For now, default behavior will work
                }}
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Social Icons - appear on hover */}
                <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={trainer.social.instagram}
                    className="w-10 h-10 rounded-full bg-lime-500/20 backdrop-blur-sm border border-lime-400/30 flex items-center justify-center text-lime-400 hover:bg-lime-500 hover:text-black transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={trainer.social.twitter}
                    className="w-10 h-10 rounded-full bg-lime-500/20 backdrop-blur-sm border border-lime-400/30 flex items-center justify-center text-lime-400 hover:bg-lime-500 hover:text-black transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={trainer.social.youtube}
                    className="w-10 h-10 rounded-full bg-lime-500/20 backdrop-blur-sm border border-lime-400/30 flex items-center justify-center text-lime-400 hover:bg-lime-500 hover:text-black transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaYoutube />
                  </a>
                </div>
              </a>

              {/* Content */}
              <div className="relative p-4">
                {/* Quote icon */}
                <FaQuoteLeft className="absolute top-6 right-6 text-lime-400/20 text-4xl group-hover:text-lime-400/40 transition-all" />

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-lime-300 transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-lime-400 text-sm font-semibold mb-2">
                  {trainer.role}
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 md:mb-4">
                  {trainer.specialty}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-2 pt-3 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{trainer.stats.clients}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">Clients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{trainer.stats.transformations}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">Transformations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{trainer.stats.awards}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">Awards</p>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="flex items-center gap-2 bg-lime-500/10 rounded-full px-3 py-1.5 border border-lime-400/20">
                  <FaDumbbell className="text-lime-400 text-xs" />
                  <span className="text-lime-400 text-xs font-semibold uppercase tracking-wider">
                    {trainer.experience} Experience
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial/Quote Section */}
        <div className="mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {trainers.slice(0, 2).map((trainer) => (
            <div
              key={`quote-${trainer.id}`}
              className="bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-5 md:p-8 border border-white/5 hover:border-lime-400/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-lime-400/30 flex-shrink-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <FaQuoteLeft className="text-lime-400/30 text-2xl mb-2" />
                  <p className="text-gray-300 italic text-sm md:text-base leading-relaxed">
                    "{trainer.quote}"
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-gray-500 text-xs ml-2">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-4 md:mt-6 text-center">
          <div className="relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-6 md:p-12 border border-lime-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-lime-500/5 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Transform with Our Experts?
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto mb-3 md:mb-6">
                Book a free consultation with your preferred trainer and start your journey today.
              </p>
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-3 px-8 rounded-full text-base hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40">
                <span>Book Free Consultation</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </button>
              <p className="text-gray-500 text-xs mt-4">Limited spots available • 50+ happy clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerSection;