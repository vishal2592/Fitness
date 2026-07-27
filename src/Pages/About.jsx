import React from "react";
import { 
  FaArrowRight, 
  FaPlay, 
  FaCheckCircle,
  FaHeartbeat,
  FaRunning,
  FaUsers,
  FaUserCheck,
  FaClipboardList,
  FaDumbbell,
  FaAppleAlt,
  FaChartLine,
  FaTrophy,
  FaUserTie,
  FaUtensils,
  FaChartBar,
  FaClock,
  FaAward,
  FaFire,
  FaStar
} from "react-icons/fa";

import hero from "../assets/images/hero.jpeg";

const About = () => {
  return (
    <section className="bg-black overflow-hidden">
      {/* =======================================
          HERO SECTION - IMPROVED
      ======================================= */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 py-6">
        <div className="grid lg:grid-cols-2 items-center gap-2 pt-10 lg:pt-20">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 font-semibold text-xs tracking-wider px-4 py-2 rounded-full border border-lime-500/30 uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
              </span>
              About Our Gym
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mt-6">
              Transform
              <span className="text-lime-400"> Your Body Build</span>
              <br />
              <span className="text-white"> Your Future</span>
            </h1>
            <p className="text-gray-400 text-lg leading-8 mt-6 max-w-xl">
              Achieve your fitness goals with expert coaching,
              premium equipment, personalized training,
              yoga sessions and a supportive community that
              inspires you every day.
            </p>

            {/* Statistics */}
            <div className="flex gap-12 mt-6">
              <div className="group">
                <h2 className="text-5xl font-bold text-lime-400 group-hover:scale-110 transition-transform">15+</h2>
                <p className="text-gray-400 mt-2">Years Experience</p>
              </div>
              <div className="group">
                <h2 className="text-5xl font-bold text-lime-400 group-hover:scale-110 transition-transform">10K+</h2>
                <p className="text-gray-400 mt-2">Happy Members</p>
              </div>
              <div className="group">
                <h2 className="text-5xl font-bold text-lime-400 group-hover:scale-110 transition-transform">98%</h2>
                <p className="text-gray-400 mt-2">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right - Image with Cards */}
          <div className="relative flex justify-center items-center py-10">
            {/* Green Glow */}
            <div className="absolute w-[520px] h-[520px] rounded-full bg-lime-500/20 blur-[120px]"></div>
            
            {/* Main Image */}
            <img
              src={hero}
              alt=""
              className="relative z-10 w-[450px] h-[450px] object-cover rounded-3xl border-2 border-lime-500/20"
            />
            
            {/* Card 1 - Top Left */}
            <div className="absolute left-[-20px] top-10 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl p-5 w-40 backdrop-blur-md shadow-xl shadow-lime-500/20 z-20">
              <div className="flex items-center gap-2 mb-2">
                <FaFire className="text-lime-400 text-xl" />
                <h2 className="text-4xl font-bold text-lime-400">500+</h2>
              </div>
              <p className="text-gray-300 text-sm">Calories Burn</p>
            </div>

            {/* Card 2 - Top Right */}
            <div className="absolute right-[-20px] top-20 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl p-5 w-40 backdrop-blur-md shadow-xl shadow-lime-500/20 z-20">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-lime-400 text-xl" />
                <h2 className="text-4xl font-bold text-lime-400">50+</h2>
              </div>
              <p className="text-gray-300 text-sm">Expert Trainers</p>
            </div>

            {/* Card 3 - Bottom Left */}
            <div className="absolute left-[-10px] bottom-10 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl p-5 w-40 backdrop-blur-md shadow-xl shadow-lime-500/20 z-20">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-lime-400 text-xl" />
                <h2 className="text-4xl font-bold text-lime-400">24/7</h2>
              </div>
              <p className="text-gray-300 text-sm">Gym Access</p>
            </div>

            {/* Card 4 - Bottom Right */}
            <div className="absolute right-[-10px] bottom-20 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl p-5 w-40 backdrop-blur-md shadow-xl shadow-lime-500/20 z-20">
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-lime-400 text-xl" />
                <h2 className="text-4xl font-bold text-lime-400">98%</h2>
              </div>
              <p className="text-gray-300 text-sm">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================
          INSPIRED SECTION
      ======================================= */}
      <section className="bg-black py-8">
        <div className="max-w-[90rem] mx-auto px-6">
          {/* Heading */}
          <div className="text-center">
            <span className="uppercase tracking-[6px] text-lime-400 font-semibold">
              OUR MISSION
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-lime-400 mt-3 leading-tight">
              Inspired To <span className="text-white">Inspire Your</span> Best Self
              <br />
              <span className="text-lime-400"></span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto leading-8">
              Whether you're just starting your fitness journey or
              pushing toward elite performance, .
            </p>
          </div>

          {/* Cards - Lime Colored */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
            {/* Card 1 */}
            <div className="group bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-3xl p-8 transition-all duration-500 hover:border-lime-400 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(132,204,22,.2)]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-400/20 to-emerald-400/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                🏋️
              </div>
              <h3 className="text-white text-3xl font-bold mt-6 group-hover:text-lime-400 transition-colors">Personalized Training</h3>
              <p className="text-gray-400 leading-8 mt-4">
                Every member receives customized workout plans designed
                around their fitness level, body type, and personal goals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-3xl p-8 transition-all duration-500 hover:border-lime-400 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(132,204,22,.2)]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-400/20 to-emerald-400/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                🥗
              </div>
              <h3 className="text-white text-3xl font-bold mt-6 group-hover:text-lime-400 transition-colors">Nutrition Guidance</h3>
              <p className="text-gray-400 leading-8 mt-4">
                Expert nutrition coaching and meal planning that supports
                muscle gain, fat loss, and long-term healthy living.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-3xl p-8 transition-all duration-500 hover:border-lime-400 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(132,204,22,.2)]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-400/20 to-emerald-400/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                🏆
              </div>
              <h3 className="text-white text-3xl font-bold mt-6 group-hover:text-lime-400 transition-colors">Real Results</h3>
              <p className="text-gray-400 leading-8 mt-4">
                Track measurable progress with expert guidance,
                consistent motivation, and scientifically proven
                training methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================
          ABOUT SECTION
      ======================================= */}
      <section className="bg-[#070707] py-10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT SIDE */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[420px] h-[420px] bg-lime-500/20 blur-[120px] rounded-full"></div>
              </div>
              <img
                src={hero}
                alt=""
                className="relative z-10 w-full max-w-lg mx-auto rounded-2xl object-cover h-[620px] border border-lime-500/20"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-0 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl px-6 py-4 shadow-xl shadow-lime-500/20 z-20">
                <h2 className="text-3xl font-bold text-lime-400">15+</h2>
                <p className="text-gray-300">Years Experience</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <span className="uppercase tracking-[6px] text-lime-400 font-semibold">
                About Our Gym
              </span>
              <h2 className="text-5xl lg:text-6xl font-black text-white mt-5 leading-tight">
                Strong Body
                <br />
                <span className="text-lime-400">Healthy Mind</span>
              </h2>
              <p className="text-gray-400 leading-8 text-lg mt-8">
                We combine expert coaching, personalized workout
                plans, nutrition guidance, yoga sessions and modern
                equipment to help you become the strongest version
                of yourself.
              </p>

              {/* FEATURES */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaDumbbell />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Personal Training</h3>
                    <p className="text-gray-400 mt-2 text-sm">One-to-one coaching designed around your goals.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaHeartbeat />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Health Monitoring</h3>
                    <p className="text-gray-400 mt-2 text-sm">Regular fitness assessments and progress tracking.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaRunning />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Functional Training</h3>
                    <p className="text-gray-400 mt-2 text-sm">Improve strength, mobility and endurance.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaAppleAlt />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Nutrition Plans</h3>
                    <p className="text-gray-400 mt-2 text-sm">Customized meal plans for every fitness goal.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaUsers />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Community Support</h3>
                    <p className="text-gray-400 mt-2 text-sm">Stay motivated with our fitness community.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-lime-400 transition-colors">Guaranteed Results</h3>
                    <p className="text-gray-400 mt-2 text-sm">Proven programs backed by experienced trainers.</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              {/* <button className="mt-12 bg-gradient-to-r from-lime-400 to-emerald-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-lime-500/25">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* =======================================
          TRANSFORMATION JOURNEY
      ======================================= */}
      <section className="bg-black py-6">
        <div className="max-w-[90rem] mx-auto px-6">
          {/* Heading */}
          <div className="text-center">
            <span className="uppercase tracking-[6px] text-lime-400 font-semibold">
              YOUR FITNESS ROADMAP
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-white mt-3">
              Your Journey
              <span className="text-lime-400"> Starts Here</span>
            </h2>
            <p className="text-gray-400 text-lg leading-8 mt-3 max-w-3xl mx-auto">
              From your first consultation to achieving your dream body,
              every step is guided by expert trainers, personalized plans,
              and continuous support.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-10 relative">
            {/* Desktop Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-lime-500/20 rounded-full"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaUserCheck />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Join Gym</h3>
                <p className="text-gray-400 mt-3">Register and become part of our fitness family.</p>
              </div>
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaClipboardList />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Assessment</h3>
                <p className="text-gray-400 mt-3">Evaluate fitness level and set realistic goals.</p>
              </div>
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaDumbbell />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Training</h3>
                <p className="text-gray-400 mt-3">Follow customized workout plans with expert coaching.</p>
              </div>
              {/* Step 4 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaAppleAlt />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Nutrition</h3>
                <p className="text-gray-400 mt-3">Healthy meal plans designed for your fitness goals.</p>
              </div>
              {/* Step 5 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaChartLine />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Progress</h3>
                <p className="text-gray-400 mt-3">Weekly tracking and performance improvements.</p>
              </div>
              {/* Step 6 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-4xl text-black shadow-lg shadow-lime-500/40 hover:scale-110 transition-transform">
                  <FaTrophy />
                </div>
                <h3 className="text-white text-xl font-bold mt-4">Success</h3>
                <p className="text-gray-400 mt-3">Celebrate your transformation and achieve new milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;