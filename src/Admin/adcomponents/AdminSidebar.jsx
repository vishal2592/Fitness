import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Folder, FolderOpen, FolderClosed } from "lucide-react";
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
  FaList,
  FaCalendarAlt,
  FaUserTie,
  FaCreditCard,
  FaCamera,
  FaStar,
  FaImages,
  FaBlog,
  FaChevronDown,
  FaChartLine,
  FaEnvelope,
  FaTags,
  FaBell as FaBellIcon,
  FaUserCog,
  FaGlobe,
  FaUserShield,
} from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";

const AdminSidebar = ({
  sidebarOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
}) => {
  // ─────────────────────────────────────────────
  // Menu Structure
  // ─────────────────────────────────────────────
  const sections = [
    // Dashboard - Direct Link
    {
      label: "Dashboard",
      path: "/admin",
      icon: <FaHome size={18} />,
    },
    {
      label: "Category",
      path: "/admin/category",
      icon: <Folder size={18} />,
    },

    // Member Management
    {
      label: "Member Management",
      icon: <FaUsers size={18} />,
      items: [
        {
          name: "Members",
          path: "/admin/members",
          icon: <FaUsers size={18} />,
        },
        {
          name: "Subscriptions",
          path: "/admin/subscriptions",
          icon: <FaCreditCard size={18} />,
        },
        {
          name: "payments",
          path: "/admin/payments",
          icon: <FaCreditCard size={18} />,
        },
      ],
    },

    // Fitness
    {
      label: "Fitness",
      icon: <GiWeightLiftingUp size={20} />,
      items: [
        {
          name: "Programs",
          path: "/admin/programs",
          icon: <FaList size={20} />,
        },
        {
          name: "classes",
          path: "/admin/classes",
          icon: <FaCalendarAlt size={20} />,
        },
        {
          name: "Trainers",
          path: "/admin/trainers",
          icon: <FaUserTie size={20} />,
        },
      ],
    },

    // Progress
    {
      label: "Progress",
      icon: <FaChartLine size={20} />,
      items: [
        {
          name: "Transformations",
          path: "/admin/transformations",
          icon: <FaCamera size={20} />,
        },
        {
          name: "Progress Tracking",
          path: "/admin/progress-tracking",
          icon: <FaChartLine size={20} />,
        },
      ],
    },

    // Website
    {
      label: "Website",
      icon: <FaGlobe size={20} />,
      items: [
        {
          name: "Testimonials",
          path: "/admin/testimonials",
          icon: <FaStar size={20} />,
        },
        {
          name: "Gallery",
          path: "/admin/gallery",
          icon: <FaImages size={20} />,
        },
        {
          name: "Blog",
          path: "/admin/blogs",
          icon: <FaBlog size={20} />,
        },
        {
          name: "Contact Queries",
          path: "/admin/contact",
          icon: <FaEnvelope size={20} />,
        },
      ],
    },

    // Marketing
    {
      label: "Marketing",
      icon: <FaTags size={20} />,
      items: [
        {
          name: "Offers & Coupons",
          path: "/admin/offers",
          icon: <FaTags size={20} />,
        },
        {
          name: "Notifications",
          path: "/admin/notifications",
          icon: <FaBellIcon size={20} />,
        },
      ],
    },

    // Settings
    {
      label: "Settings",
      icon: <IoSettingsSharp size={20} />,
      items: [
        {
          name: "Profile",
          path: "/admin/profile",
          icon: <FaUserCog size={20} />,
        },
        {
          name: "Website Settings",
          path: "/admin/website-settings",
          icon: <FaGlobe size={20} />,
        },
        {
          name: "Admin Users",
          path: "/admin/admin-users",
          icon: <FaUserShield size={20} />,
        },
      ],
    },
  ];

  // ─────────────────────────────────────────────
  // Expanded Sections
  // ─────────────────────────────────────────────
  const [expandedSections, setExpandedSections] = useState(
    Object.fromEntries(
      sections
        .map((section, index) =>
          section.items ? [index, true] : null
        )
        .filter(Boolean)
    )
  );

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // ─────────────────────────────────────────────
  // Profile
  // ─────────────────────────────────────────────
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
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6] opacity-80" />

      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="
          lg:hidden absolute top-4 right-4 p-2 rounded-lg
          hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
          transition-colors z-10
          text-[#64748B] dark:text-[#94A3B8]
        "
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
            <Link
              to="/admin"
              className="text-xl font-bold text-[#0F172A] dark:text-white"
            >
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
        {sections.map((section, idx) => {
          // ─────────────────────────────────────
          // Dashboard / Direct Link
          // ─────────────────────────────────────
          if (section.path) {
            return (
              <NavLink
                key={idx}
                to={section.path}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    px-4 py-2.5 rounded-xl
                    transition-all duration-200
                    ${isActive
                    ? "bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-white" : "text-[#3B82F6]"}>
                      {section.icon}
                    </span>

                    <span className="flex-1 text-left text-[17px] font-medium">
                      {section.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          }

          // ─────────────────────────────────────
          // Dropdown Sections
          // ─────────────────────────────────────
          const isExpanded = expandedSections[idx] ?? false;

          const isActiveSection = section.items?.some(
            (item) =>
              window.location.pathname === item.path ||
              window.location.pathname.startsWith(item.path + "/")
          );

          return (
            <div key={idx} className="mb-1">
              {/* Section Heading */}
              <button
                onClick={() => toggleSection(idx)}
                className={`
                  w-full flex items-center gap-3
                  px-4 py-2.5 rounded-xl
                  transition-all duration-200
                  text-[#64748B] dark:text-[#94A3B8]
                  hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
                  hover:text-[#0F172A] dark:hover:text-white
                  ${isActiveSection
                    ? "text-[#0F172A] dark:text-white font-semibold"
                    : ""
                  }
                `}
              >
                <span className="text-[#3B82F6]">
                  {section.icon}
                </span>

                <span className="flex-1 text-left text-lg font-medium">
                  {section.label}
                </span>

                <FaChevronDown
                  className={`
                    transition-transform duration-200
                    ${isExpanded ? "rotate-180" : ""}
                  `}
                  size={14}
                />
              </button>

              {/* Sub Items */}
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          flex items-center gap-3
                          px-4 py-2.5 rounded-lg
                          transition-all duration-200
                          ${isActive
                          ? "bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20"
                          : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white"
                        }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={isActive ? "text-white" : ""}>
                            {item.icon}
                          </span>

                          <span className="flex-1 text-base font-medium">
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] p-4">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              w-full flex items-center justify-between
              rounded-xl
              hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
              p-3 transition-colors group
            "
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaUserCircle className="text-4xl text-[#3B82F6]" />

                <div
                  className="
                    absolute bottom-0 right-0
                    w-3 h-3 bg-emerald-500
                    border-2 border-white dark:border-[#0F172A]
                    rounded-full
                  "
                />
              </div>

              <div className="text-left">
                <p className="text-lg font-medium text-[#0F172A] dark:text-white truncate max-w-[100px]">
                  Admin
                </p>

                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] capitalize">
                  admin
                </p>
              </div>
            </div>

            <FaChevronUp
              className={`
                text-[#64748B] dark:text-[#94A3B8]
                transition-transform duration-200
                ${profileOpen ? "rotate-180" : ""}
              `}
              size={14}
            />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div
              className="
                absolute bottom-full left-0 right-0 mb-2
                rounded-xl shadow-xl
                border border-[#E2E8F0] dark:border-[#1E293B]
                bg-white dark:bg-[#0F172A]
                overflow-hidden animate-slideUp
              "
            >
              <div className="p-1.5 space-y-0.5">
                <button
                  className="
                    flex items-center gap-3 w-full
                    px-4 py-2.5 rounded-lg
                    hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
                    transition-colors
                    text-[#0F172A] dark:text-white
                  "
                >
                  <FaUser className="text-[#64748B] dark:text-[#94A3B8]" />
                  <span className="text-base font-medium">
                    My Profile
                  </span>
                </button>

                <button
                  className="
                    flex items-center gap-3 w-full
                    px-4 py-2.5 rounded-lg
                    hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
                    transition-colors
                    text-[#0F172A] dark:text-white
                  "
                >
                  <FaCog className="text-[#64748B] dark:text-[#94A3B8]" />
                  <span className="text-base font-medium">
                    Settings
                  </span>
                </button>

                <button
                  className="
                    flex items-center gap-3 w-full
                    px-4 py-2.5 rounded-lg
                    hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
                    transition-colors
                    text-[#0F172A] dark:text-white
                  "
                >
                  <FaBell className="text-[#64748B] dark:text-[#94A3B8]" />

                  <span className="text-base font-medium">
                    Notifications
                  </span>

                  <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                    3
                  </span>
                </button>

                <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] my-1" />

                <button
                  onClick={handleLogout}
                  className="
                    flex items-center gap-3 w-full
                    px-4 py-2.5 rounded-lg
                    hover:bg-red-50 dark:hover:bg-red-950/20
                    transition-colors text-red-500 group
                  "
                >
                  <FaSignOutAlt className="group-hover:scale-110 transition-transform" />

                  <span className="text-base font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollbar + Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
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
