import React from "react";
import {
  FaWeight,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
  FaFire,
} from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";

// Import your single before/after images (one per transformation)
import t1 from '../assets/Images/T1.jpg';
import t2 from '../assets/Images/T2.jpg';
import t3 from '../assets/Images/T3.jpg';
import t4 from '../assets/Images/T4.jpg';
import t5 from '../assets/Images/T5.jpg';
import t6 from '../assets/Images/T6.jpg';

const TransformationPage = () => {
  const images = [t1, t2, t3, t4, t5, t6];

  const transformations = [
    {
      id: 1,
      name: "Sarah Mitchell",
      age: 28,
      stats: [
        { label: "Weight Lost", value: "24 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "12% → 8%", icon: FaFire },
        { label: "Muscle Gain", value: "+8 lbs", icon: GiMuscleUp },
      ],
      quote: "I never thought I could feel this strong…",
      category: "Weight Loss",
      image: images[0],
      change: "+15% CHANGE",
    },
    {
      id: 2,
      name: "James Rodriguez",
      age: 34,
      stats: [
        { label: "Weight Lost", value: "32 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "18% → 11%", icon: FaFire },
        { label: "Muscle Gain", value: "+12 lbs", icon: GiMuscleUp },
      ],
      quote: "From couch to 5K to lifting heavy…",
      category: "Body Recomposition",
      image: images[1],
      change: "+21% CHANGE",
    },
    {
      id: 3,
      name: "Emily Chen",
      age: 41,
      stats: [
        { label: "Weight Lost", value: "18 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "15% → 10%", icon: FaFire },
        { label: "Muscle Gain", value: "+6 lbs", icon: GiMuscleUp },
      ],
      quote: "At 41, I'm in the best shape of my life…",
      category: "Strength & Toning",
      image: images[2],
      change: "+12% CHANGE",
    },
    {
      id: 4,
      name: "Mike Thompson",
      age: 26,
      stats: [
        { label: "Weight Lost", value: "41 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "22% → 9%", icon: FaFire },
        { label: "Muscle Gain", value: "+15 lbs", icon: GiMuscleUp },
      ],
      quote: "I went from shy to confident…",
      category: "Extreme Transformation",
      image: images[3],
      change: "+28% CHANGE",
    },
    {
      id: 5,
      name: "Amanda Lee",
      age: 33,
      stats: [
        { label: "Weight Lost", value: "12 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "10% → 7%", icon: FaFire },
        { label: "Muscle Gain", value: "+5 lbs", icon: GiMuscleUp },
      ],
      quote: "I've never felt more empowered…",
      category: "Athletic Performance",
      image: images[4],
      change: "+18% CHANGE",
    },
    {
      id: 6,
      name: "David Kim",
      age: 45,
      stats: [
        { label: "Weight Lost", value: "28 lbs", icon: FaWeight },
        { label: "Body Fat %", value: "20% → 14%", icon: FaFire },
        { label: "Muscle Gain", value: "+10 lbs", icon: GiMuscleUp },
      ],
      quote: "I regained my health and my energy…",
      category: "Healthy Aging",
      image: images[5],
      change: "+16% CHANGE",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0a0c0f] via-[#0d0f12] to-[#0f1218] py-4 md:py-6 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-lime-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[90rem] mx-auto">
        {/* Header – responsive */}
        <div className="text-center mb-4 md:mb-8">
          <div className="inline-flex items-center gap-3 bg-lime-500/10 text-lime-400 font-semibold text-[10px] md:text-sm tracking-[0.2em] px-4 md:px-5 py-2 rounded-full border border-lime-500/30 uppercase mb-4 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              Real Transformations
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white tracking-tight mb-2 md:mb-4">
            See What's{" "}
            <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              Possible
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-xl font-light px-4">
            Real people, real results. Every journey starts with a single step.
          </p>
        </div>

        {/* Grid – responsive gap and columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {transformations.map((item) => {
            const { image, change } = item;

            return (
              <div
                key={item.id}
                className="group relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-2xl md:rounded-3xl p-2 md:p-4 border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-500/10 overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/0 to-lime-400/0 group-hover:from-lime-400/20 group-hover:via-lime-400/10 group-hover:to-lime-400/20 blur-xl transition-all duration-500 rounded-3xl" />

                <div className="relative z-10">
                  <div className="inline-block px-2.5 md:px-3 py-0.5 md:py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1.5 md:mb-3">
                    {item.category}
                  </div>

                  {/* Image with fixed aspect ratio */}
                  <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-2.5 md:mb-3 aspect-[4/3]">
                    <img
                      src={image}
                      alt={`${item.name} transformation`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 text-white/80 text-[9px] md:text-[11px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 md:px-2 md:py-1 rounded-full">
                      Before
                    </div>
                    <div className="absolute bottom-2 right-2 text-lime-300 text-[9px] md:text-[11px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                      After
                    </div>
                    <div className="absolute top-2 right-2 bg-lime-400 text-black text-[8px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {change}
                    </div>
                  </div>

                  {/* Client Info – flex row with small gap */}
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <h3 className="text-base md:text-xl font-bold text-white group-hover:text-lime-300 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400/80 text-[9px] md:text-[11px]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1 mb-2 md:mb-3">
                    <FaCalendarAlt className="text-lime-400/60" />
                    Age {item.age}
                  </p>

                  {/* Stats – smaller gap and font on mobile */}
                  <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-2 md:mb-3">
                    {item.stats.map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-lg md:rounded-xl p-1.5 md:p-2 border border-white/5 group-hover:border-lime-400/30 transition-all duration-300"
                        >
                          <div className="flex items-center gap-1 text-lime-400 text-[7px] md:text-[9px] mb-0.5 font-bold uppercase tracking-wider">
                            <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span className="hidden xs:inline">{stat.label}</span>
                            <span className="xs:hidden">{stat.label.split(' ')[0]}</span>
                          </div>
                          <span className="text-white font-bold text-xs md:text-sm">
                            {stat.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quote – smaller on mobile */}
                  <p className="text-gray-400 text-xs md:text-sm italic leading-relaxed border-l-2 border-lime-400/30 pl-2 md:pl-3">
                    "{item.quote}"
                  </p>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA – responsive */}
        <div className="mt-12 md:mt-16 text-center">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-3 md:py-4 px-6 md:px-10 rounded-full text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40">
            <span>Start Your Transformation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3 md:mt-4">
            Join 5000+ members who transformed their lives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationPage;