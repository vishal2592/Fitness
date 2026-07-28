import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const successData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop",
    quote: "I lost 20 lbs and gained muscle. Best decision ever!",
    name: "SARAH J.",
    result: "Lost 20 lbs",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=500&auto=format&fit=crop",
    quote: "Transformed my body in just 3 months!",
    name: "MICHAEL B.",
    result: "Gained 15 lbs of Muscle",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=500&auto=format&fit=crop",
    quote: "My strength and confidence have never been better!",
    name: "DAVID R.",
    result: "Lost 18 lbs",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop",
    quote: "Yoga helped me become flexible and stress free.",
    name: "EMMA W.",
    result: "Yoga Transformation",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop",
    quote: "Personal coaching completely changed my lifestyle.",
    name: "JAMES K.",
    result: "Muscle Gain",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop",
    quote: "From beginner to marathon runner in just six months!",
    name: "OLIVIA P.",
    result: "Endurance Training",
  },
];

const SuccessSection = () => {
  return (
    <section className="bg-[#141414] py-3 md:py-6">
      <div className="max-w-[90rem] mx-auto px-4">
        {/* Heading - Centered */}
        <div className="mb-6 lg:mb-12 text-center">
          <div className="flex items-center justify-center gap-4 ">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-lime-400"></div>
            <h2 className="text-3xl font-extrabold uppercase text-white whitespace-nowrap">
              Our <span className="text-lime-400">Stories</span>
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-lime-400 to-lime-400"></div>
          </div>

          <p className="uppercase tracking-[3px] text-gray-400 mt-2 text-sm">
            Real Results From Our Members
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-7">
          {successData.map((item) => (
            <div
              key={item.id}
              className="bg-[#232323] border border-[#3c3c3c] rounded-lg overflow-hidden flex h-[210px] hover:border-lime-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-lime-400/20"
            >
              {/* Image */}
              <div className="w-[140px] flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative flex-1 p-4 md:p-5">
                <FaQuoteLeft className="text-lime-400 text-lg mb-3" />

                <p className="text-white text-lg leading-7">
                  "{item.quote}"
                </p>

                <div className="mt-2">
                  <h3 className="text-lime-400 uppercase font-bold text-lg">
                    {item.name}
                  </h3>
{/* 
                  <p className="text-gray-400 text-sm mt-1">
                    {item.result}
                  </p> */}
                </div>

                <FaQuoteRight className="absolute bottom-5 right-5 text-3xl text-lime-400 opacity-90" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;