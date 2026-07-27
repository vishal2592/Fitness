import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      title: 'STRENGTH TRAINING',
      description: 'Build Muscle & Power',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '20% OFF',
      rating: '4.9'
    },
    {
      id: 2,
      title: 'HIIT & CARDIO',
      description: 'Burn Fat & Boost Endurance',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '15% OFF',
      rating: '4.8'
    },
    {
      id: 3,
      title: 'YOGA & FLEXIBILITY',
      description: 'Improve Balance & Flexibility',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '25% OFF',
      rating: '4.9'
    },
    {
      id: 4,
      title: 'CROSSFIT',
      description: 'Functional Fitness & Strength',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '10% OFF',
      rating: '4.7'
    },
    {
      id: 5,
      title: 'PILATES',
      description: 'Core Strength & Stability',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '18% OFF',
      rating: '4.8'
    },
    {
      id: 6,
      title: 'BOXING',
      description: 'Cardio & Self-Defense',
      image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '22% OFF',
      rating: '4.6'
    },
    {
      id: 7,
      title: 'ZUMBA',
      description: 'Dance Fitness & Fun',
      image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '12% OFF',
      rating: '4.7'
    },
    {
      id: 8,
      title: 'SPINNING',
      description: 'Cycling & Endurance',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      discount: '16% OFF',
      rating: '4.8'
    }
  ];

  return (
    <section className="py-4 md:py-6 bg-[#0a0a0a]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered with Lines on Both Sides */}
        <div className="mb-4">
          {/* Top Row: Line - Our Categories - Line */}
          <div className="flex items-center gap-4 mb-2">
            {/* Left Line - Light to Clear with Glow */}
            <div className="flex-1 h-0.5 bg-gradient-to-r from-lime-500/10 via-lime-500/50 to-lime-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]"></div>

            <span className="text-lime-400 text-sm font-semibold uppercase tracking-wider whitespace-nowrap px-2">Our Categories</span>

            {/* Right Line - Clear to Light with Glow */}
            <div className="flex-1 h-0.5 bg-gradient-to-l from-green-500/10 via-lime-500/50 to-lime-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]"></div>
          </div>

          {/* Second Row: CHOOSE YOUR WORKOUT */}
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            CHOOSE YOUR <span className="text-lime-400">WORKOUT</span>
          </h2>
          <div className="w-20 h-1 bg-lime-400 mt-3 rounded-full mx-auto shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
            className="category-swiper"
          >
            {categories.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-lime-400 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/20">
                  {/* Image Container - Clickable */}
                  <Link to={`/category/${item.id}`} className="block">
                    <div className="relative h-[220px] sm:h-[250px] md:h-[280px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      {/* Discount Badge - Top Left */}
                      <div className="absolute top-4 left-4 bg-lime-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-lime-400/30">
                        {item.discount}
                      </div>

                      {/* Overlay with arrow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-lime-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-lime-500/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Text Content - Inside Card Below Image */}
                  <div className="p-2">
                    {/* Title with Rating */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lime-500 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-lime-500/20">
                        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white text-xs font-semibold">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm sm:text-base font-medium">
                      {item.description}
                    </p>

                    {/* Learn More Link */}
                    <Link
                      to={`/category/${item.id}`}
                      className="inline-flex items-center gap-2 text-lime-500 font-semibold text-sm mt-3 hover:text-lime-400 transition-colors group/link"
                    >
                      Learn More
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .category-swiper {
          padding: 10px 0 50px 0;
        }
        
        .category-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        
        .category-swiper .swiper-pagination-bullet-active {
          background: #22c55e;
          width: 25px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
        }
        
        .category-swiper .swiper-pagination {
          bottom: 0;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;