import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaClock,
  FaAppleAlt,
  FaDumbbell,
  FaHeartbeat,
  FaAward,
  FaFire,
} from "react-icons/fa";
import { MdEmojiEvents, MdSecurity } from "react-icons/md";
import { GiWeightLiftingUp, GiMuscleUp } from "react-icons/gi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaDumbbell,
      title: "Expert Coaching",
      description:
        "Certified trainers with 10+ years of experience. Personalized programs tailored to your goals.",
      stat: "98%",
      statLabel: "success rate",
      color: "from-emerald-400 to-lime-400",
    },
    {
      icon: FaFire,
      title: "Smart Tracking",
      description:
        "AI-powered performance analytics. Track strength gains, cardio, and recovery in real-time.",
      stat: "24/7",
      statLabel: "monitoring",
      color: "from-orange-400 to-amber-400",
    },
    {
      icon: GiWeightLiftingUp,
      title: "Elite Equipment",
      description:
        "Premium Technogym & Hammer Strength gear. Updated monthly with the latest innovations.",
      stat: "200+",
      statLabel: "machines",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: FaUsers,
      title: "Active Community",
      description:
        "Join 5000+ members. Group workouts, competitions, and a support system that pushes you.",
      stat: "5K+",
      statLabel: "members",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: MdEmojiEvents,
      title: "Challenge Hub",
      description:
        "Monthly transformation challenges with real rewards. Compete and track your progress.",
      stat: "12",
      statLabel: "annual events",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: FaHeartbeat,
      title: "Holistic Health",
      description:
        "Integrated wellness approach. Nutrition plans, mental health support, and recovery tools.",
      stat: "360°",
      statLabel: "wellness",
      color: "from-rose-400 to-red-400",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0a0c0f] via-[#0d0f12] to-[#0f1218] py-6 px-4 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[90rem] mx-auto">
        {/* Header with animated badge */}
        <div className="text-center mb-5 md:mb-8">
          <div className="inline-flex items-center gap-3 bg-lime-500/10 text-lime-400 font-semibold text-xs md:text-sm tracking-[0.2em] px-5 py-2.5 rounded-full border border-lime-500/30 uppercase mb-2 md:mb-4 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              why choose Vitalify fitness
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white tracking-tight mb-1 md:mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              Champions
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Every detail engineered to maximize your potential. Join the revolution.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-4 md:p-8 border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-lime-500/10 overflow-hidden"
              >
                {/* Animated gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/0 to-lime-400/0 group-hover:from-lime-400/20 group-hover:via-lime-400/10 group-hover:to-lime-400/20 blur-xl transition-all duration-500 rounded-3xl" />

                <div className="relative z-10">
                  {/* Icon with animated background */}
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-lime-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500/20 to-emerald-500/20 border border-lime-400/30 flex items-center justify-center text-3xl text-lime-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>

                  {/* Stat badge */}
                  <div className="mt-6 flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 group-hover:border-lime-400/30 transition-all duration-300">
                    <span
                      className={`text-2xl font-black bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                    >
                      {feature.stat}
                    </span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">
                      {feature.statLabel}
                    </span>
                    <div className="ml-auto w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center group-hover:bg-lime-400/20 transition-all">
                      <FaFire className="text-lime-400 text-xs opacity-60 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Bar */}
        {/* <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/5">
          {[
            { icon: FaAward, label: "Award Winning", value: "2024 Best Gym" },
            { icon: MdSecurity, label: "Certified Safe", value: "100% Secure" },
            { icon: GiMuscleUp, label: "Member Growth", value: "+245% YoY" },
            { icon: FaHeartbeat, label: "Member Satisfaction", value: "4.9/5 Stars" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-2xl text-lime-400 group-hover:bg-lime-500/20 group-hover:scale-110 transition-all duration-300 mb-3">
                  <Icon />
                </div>
                <span className="text-white font-bold text-sm md:text-base">
                  {item.value}
                </span>
                <span className="text-gray-500 text-xs uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div> */}

        {/* CTA Button */}
        {/* <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40">
            <span>Start Your Transformation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          </button>
          <p className="text-gray-500 text-sm mt-4">No commitment. Free 7-day trial.</p>
        </div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;