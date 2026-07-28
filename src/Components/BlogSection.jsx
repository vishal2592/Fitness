import React from "react";
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaClock, FaComment, FaShareAlt, FaEye } from "react-icons/fa";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "10 Essential Exercises for Building Core Strength",
      excerpt: "Discover the most effective core exercises that will transform your midsection and improve your overall athletic performance. Learn proper form, technique, and progressive overload strategies.",
      category: "Workout Tips",
      author: "Sarah Mitchell",
      date: "March 15, 2026",
      readTime: "5 min read",
    //   comments: 24,
      views: 1247,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format",
      featured: true,
      blogPage: "/blog/core-strength-exercises",
    },
    {
      id: 2,
      title: "Nutrition Guide: What to Eat Before and After Workout",
      excerpt: "Learn the science behind pre and post-workout nutrition to maximize your gains and recovery time.",
      category: "Nutrition",
      author: "David Thompson",
      date: "March 12, 2026",
      readTime: "7 min read",
    //   comments: 18,
      views: 856,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&auto=format",
      featured: false,
      blogPage: "/blog/nutrition-guide",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Progressive Overload",
      excerpt: "Master the principle of progressive overload and take your strength training to the next level.",
      category: "Strength Training",
      author: "Mike Rodriguez",
      date: "March 10, 2026",
      readTime: "6 min read",
    //   comments: 31,
      views: 932,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&auto=format",
      featured: false,
      blogPage: "/blog/progressive-overload-guide",
    },
    {
      id: 4,
      title: "Recovery Techniques: Sleep, Stretching & Mobility",
      excerpt: "Explore the most effective recovery methods to enhance performance and prevent injuries.",
      category: "Recovery",
      author: "Jessica Chen",
      date: "March 8, 2026",
      readTime: "4 min read",
    //   comments: 15,
      views: 654,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop&auto=format",
      featured: false,
      blogPage: "/blog/recovery-techniques",
    },
    {
      id: 5,
      title: "Cardio vs Strength Training: Finding the Balance",
      excerpt: "Discover the perfect balance between cardio and strength training for optimal fitness results.",
      category: "Fitness",
      author: "Sarah Mitchell",
      date: "March 5, 2026",
      readTime: "8 min read",
    //   comments: 42,
      views: 1523,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&auto=format",
      featured: false,
      blogPage: "/blog/cardio-vs-strength",
    },
  ];

  const featuredBlog = blogs.find(blog => blog.featured);
  const recentBlogs = blogs.filter(blog => !blog.featured);

  // Navigation function
  const navigateTo = (path) => {
    window.location.href = path;
  };

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
        <div className="text-center mb-3 md:mb-6">
          <div className="inline-flex items-center gap-3 bg-lime-500/10 text-lime-400 font-semibold text-xs md:text-sm tracking-[0.2em] px-5 py-2.5 rounded-full border border-lime-500/30 uppercase mb-2 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              latest from our blog
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 md:mb-4">
            Fitness{" "}
            <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Expert advice, nutrition tips, and workout guides to fuel your fitness journey.
          </p>
        </div>

        {/* Featured Blog - Small Banner with More Content */}
        {featuredBlog && (
          <div className="mb-4 md:mb-8 group">
            <div className="relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl overflow-hidden border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Image */}
                <div className="relative overflow-hidden md:col-span-1">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-[200px] md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-lime-400 text-black font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content - More content added */}
                <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-center">
                  {/* Metadata with more details */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-lime-400" />
                      {featuredBlog.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <FaClock className="text-lime-400" />
                      {featuredBlog.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <FaComment className="text-lime-400" />
                      {featuredBlog.comments} comments
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <FaEye className="text-lime-400" />
                      {featuredBlog.views} views
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                    {featuredBlog.title}
                  </h3>

                  {/* Full Excerpt - More content */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-3">
                    {featuredBlog.excerpt}
                  </p>

                  {/* Additional content - Key takeaways */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-lime-500/10 text-lime-400 text-[14px] font-semibold px-2.5 py-1 rounded-full border border-lime-400/20">
                      💪 Advanced Techniques
                    </span>
                    <span className="bg-lime-500/10 text-lime-400 text-[14px] font-semibold px-2.5 py-1 rounded-full border border-lime-400/20">
                      📊 Science-Based
                    </span>
                    <span className="bg-lime-500/10 text-lime-400 text-[14px] font-semibold px-2.5 py-1 rounded-full border border-lime-400/20">
                      🏆 Proven Results
                    </span>
                  </div>

                  {/* Author & Category with Read More */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <div className="w-6 h-6 rounded-full bg-lime-400/20 flex items-center justify-center">
                          <FaUser className="text-lime-400 text-[10px]" />
                        </div>
                        <span className="font-medium text-white/80">{featuredBlog.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <FaTag className="text-lime-400" />
                        <span className="text-white/80">{featuredBlog.category}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigateTo(featuredBlog.blogPage)}
                      className="group/btn inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 font-semibold text-sm px-5 py-2 rounded-full border border-lime-400/30 hover:bg-lime-400 hover:text-black transition-all duration-300 cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {recentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl overflow-hidden border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-lime-500/10"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-lime-400/90 text-black font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="relative p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-lime-400" />
                    {blog.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <FaClock className="text-lime-400" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-300 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <FaUser className="text-lime-400" />
                    <span>{blog.author}</span>
                  </div>
                  <button 
                    onClick={() => navigateTo(blog.blogPage)}
                    className="inline-flex items-center gap-2 text-lime-400 font-semibold text-sm hover:text-lime-300 transition-colors group/btn cursor-pointer"
                  >
                    <span>Read</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform text-xs" />
                  </button>
                </div>

                {/* Comments count */}
                <div className="absolute bottom-5 right-5 flex items-center gap-1 text-gray-500 text-xs">
                  {/* <FaComment className="text-lime-400/60" /> */}
                  <span>{blog.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigateTo('/blog')}
            className="group relative inline-flex items-center gap-3 bg-transparent text-lime-400 font-bold py-3 px-8 rounded-full text-base border-2 border-lime-400/50 hover:bg-lime-400 hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>View All Articles</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;