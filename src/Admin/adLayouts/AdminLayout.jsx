import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import AdminSidebar from "../adcomponents/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle Theme
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden transition-colors duration-300 bg-white dark:bg-darkTheme-bg">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-darkTheme-card border-b border-gray-200 dark:border-darkTheme-border shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border transition"
            >
              <FaBars size={20} className="text-gray-700 dark:text-darkTheme-text" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-darkTheme-text">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border transition"
            >
              {isDarkMode ? (
                <FaSun size={18} className="text-yellow-400" />
              ) : (
                <FaMoon size={18} className="text-gray-700" />
              )}
            </button>

            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-darkTheme-border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-2 md:p-6 bg-gray-100 dark:bg-darkTheme-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;