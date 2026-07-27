import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaTimes,
  FaUserCircle,
  FaChevronUp,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaHome,
  FaUsers,
  FaDumbbell,
  FaList,
  FaCalendarAlt,
  FaUserTie,
  FaCreditCard,
  FaCamera,
  FaStar,
  FaImages,
  FaBlog,
} from "react-icons/fa";
import { GiWeightLiftingUp, GiMuscleUp } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";

const AdminSidebar = ({
  sidebarOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
}) => {
  // Updated menu items as per your list
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome size={20} />, exact: true },
    { name: "Members", path: "/admin/members", icon: <FaUsers size={20} /> },
    { name: "Workout Categories", path: "/admin/workout-categories", icon: <GiWeightLiftingUp size={20} />},
    { name: "Programs", path: "/admin/programs", icon: <FaList size={20} /> },
    { name: "Classes", path: "/admin/classes", icon: <FaCalendarAlt size={20} /> },
    { name: "Trainers", path: "/admin/trainers", icon: <FaUserTie size={20} /> },
    { name: "Membership Plans", path: "/admin/membership-plans", icon: <FaCreditCard size={20} /> },
    { name: "Transformations", path: "/admin/transformations", icon: <FaCamera size={20} /> },
    { name: "Testimonials", path: "/admin/testimonials", icon: <FaStar size={20} /> },
    { name: "Gallery", path: "/admin/gallery", icon: <FaImages size={20} /> },
    { name: "Blog", path: "/admin/blog", icon: <FaBlog size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <IoSettingsSharp size={20} /> },
  ];

  // Profile dropdown (static)
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        w-72 h-screen
        flex flex-col
        bg-white dark:bg-[#0F172A]
        border-r border-[#E2E8F0] dark:border-[#1E293B]
        shadow-xl
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        lg:static
        lg:flex
        overflow-hidden
      `}
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6] opacity-80" />

      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors z-10 text-[#64748B] dark:text-[#94A3B8]"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-[#E2E8F0] dark:border-[#1E293B]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#3B82F6] shadow-md shadow-[#3B82F6]/20">
            <FaUserCircle className="text-xl text-white" />
          </div>
          <div>
            <Link to="/admin" className="text-xl font-bold text-[#0F172A] dark:text-white">
              Gym Admin
            </Link>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium tracking-wide">
              Management Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact || false}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20"
                  : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                <span className="flex-1 text-lg font-medium">{item.name}</span>
                {item.badge && (
                  <span className="text-xs text-yellow-500 dark:text-yellow-400">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section: profile */}
      <div className="border-t border-[#E2E8F0] dark:border-[#233f6b] p-4">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center justify-between rounded-xl hover:bg-[#c4d5e6] dark:hover:bg-[#1E293B] p-3 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaUserCircle className="text-4xl text-[#3B82F6]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#0F172A] rounded-full" />
              </div>
              <div className="text-left">
                <p className="text-lg font-medium text-[#0F172A] dark:text-white truncate max-w-[100px]">
                  Admin
                </p>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] capitalize">admin</p>
              </div>
            </div>
            <FaChevronUp
              className={`text-[#64748B] dark:text-[#94A3B8] transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
              size={14}
            />
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl shadow-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] overflow-hidden animate-slideUp">
              <div className="p-1.5 space-y-0.5">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors text-[#0F172A] dark:text-white group">
                  <FaUser className="text-[#64748B] dark:text-[#94A3B8]" />
                  <span className="text-base font-medium">My Profile</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors text-[#0F172A] dark:text-white group">
                  <FaCog className="text-[#64748B] dark:text-[#94A3B8]" />
                  <span className="text-base font-medium">Settings</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors text-[#0F172A] dark:text-white group">
                  <FaBell className="text-[#64748B] dark:text-[#94A3B8]" />
                  <span className="text-base font-medium">Notifications</span>
                  <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">3</span>
                </button>
                <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-500 group"
                >
                  <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                  <span className="text-base font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollbar styles – same as before */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.15s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #1E293B;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;