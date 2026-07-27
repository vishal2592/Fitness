import React, { useState } from "react";
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
  FaCheckCircle,
  FaUser,
  FaComment,
  FaPaperPlane
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Fitness Avenue", "Los Angeles, CA 90001"],
      color: "from-lime-400 to-emerald-400",
    },
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["info@vitalifygym.com", "support@vitalifygym.com"],
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Mon - Fri: 5:00 AM - 11:00 PM", "Sat - Sun: 6:00 AM - 10:00 PM"],
      color: "from-orange-400 to-amber-400",
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
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-3 bg-lime-500/10 text-lime-400 font-semibold text-xs md:text-sm tracking-[0.2em] px-5 py-2.5 rounded-full border border-lime-500/30 uppercase mb-4 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              get in touch
            </span>
          </div>

          {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Contact{" "}
            <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              Us
            </span>
          </h2> */}
          {/* <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Have questions? We'd love to hear from you. Reach out and let's start your fitness journey together.
          </p> */}
        </div>

        {/* Contact Info Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-6 border border-white/5 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-500/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-500/20 to-emerald-500/20 border border-lime-400/30 flex items-center justify-center text-2xl text-lime-400 group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-400 text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Contact Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-4 md:p-8 border border-white/5 hover:border-lime-400/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
            <p className="text-gray-400 text-sm mb-6">
              Fill in the form below and we'll get back to you within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 rounded-full bg-lime-500/20 flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-5xl text-lime-400" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-gray-400 text-center">
                  Your message has been sent successfully. We'll contact you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-3 text-gray-500" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-[#0d0f12] border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                      placeholder="Tell us about your fitness goals..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-3.5 px-8 rounded-full text-base hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40"
                >
                  <span>Send Message</span>
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Map & Social Section */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-6 border border-white/5 hover:border-lime-400/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Find Us Here</h3>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0d0f12] border border-white/10">
                <iframe
                  title="Gym Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.3687829874567!2d-118.34380968478259!3d34.08871428058073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6794b8d47c!2sLos%20Angeles%20CA!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#1a1f26] to-[#13181e] rounded-3xl p-6 border border-white/5 hover:border-lime-400/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex-1 min-w-[80px] group flex items-center justify-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300"
                >
                  <FaFacebook className="text-lg" />
                  <span className="text-sm font-medium hidden sm:inline">Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex-1 min-w-[80px] group flex items-center justify-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300"
                >
                  <FaInstagram className="text-lg" />
                  <span className="text-sm font-medium hidden sm:inline">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex-1 min-w-[80px] group flex items-center justify-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300"
                >
                  <FaTwitter className="text-lg" />
                  <span className="text-sm font-medium hidden sm:inline">Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex-1 min-w-[80px] group flex items-center justify-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-4 py-3 text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300"
                >
                  <FaYoutube className="text-lg" />
                  <span className="text-sm font-medium hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;