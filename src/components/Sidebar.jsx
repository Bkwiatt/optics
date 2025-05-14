import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon, // Hamburger icon
} from "@heroicons/react/24/outline";
import logo from "../assets/images/Optic_Logo.png"; // Import the logo

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeLink, setActiveLink] = useState(""); // Track active link

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode class to <body> and store preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300 fixed top-0 left-0 flex flex-col overflow-hidden ${
          isSidebarOpen ? "w-[280px]" : "w-[60px]"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-3">
          <Link to="/" className="flex items-center space-x-2 group">
            {isSidebarOpen && (
              <img src={logo} alt="Optics Logo" className="w-10 h-10" />
            )}
            {isSidebarOpen && (
              <span className="text-md font-bold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-green-500 after:left-0 after:bottom-[-2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Optics
              </span>
            )}
          </Link>
        </div>

        {/* User Profile */}
        {isSidebarOpen && (
          <div className="flex flex-col items-center p-3">
            <Link to="/profile-page">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-white hover:border-green-500 hover:border-3 transition-all duration-50"
              />
            </Link>
            <div className="text-center mt-1">
              <p className="text-m font-semibold">Brandon Kwiatkowski</p>
              <p className="text-green-400 text-sm font-semibold">
                Sr. Project Manager
              </p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="mt-10 flex flex-col space-y-2">
          {[
            { to: "/", label: "Home", icon: HomeIcon },
            {
              to: "/project-management",
              label: "Project Management",
              icon: Cog6ToothIcon,
            },
            { to: "/accounts", label: "Accounts", icon: UserGroupIcon },
            { to: "/proposals", label: "Proposals", icon: DocumentTextIcon },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setActiveLink(label.toLowerCase())}
              className={`flex items-center p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ${
                isSidebarOpen ? "space-x-2" : "justify-center"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  activeLink === label.toLowerCase() ? "text-green-500" : ""
                }`}
              />
              {isSidebarOpen && (
                <span
                  className={`text-sm font-medium ${
                    activeLink === label.toLowerCase() ? "text-green-500" : ""
                  }`}
                >
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Dark Mode & Logout Button */}
        <div className="mt-auto p-3 flex flex-col space-y-3">
          {isSidebarOpen && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-1 rounded-md text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-800" />
              )}
              <span className="ml-2">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          )}

          {/* Logout Button */}
          <div className="flex justify-center">
            {isSidebarOpen ? (
              <Link to="/login" className="w-full">
                <button className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600">
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login" className="block">
                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-4 transition-all duration-300 ${
          isSidebarOpen ? "left-[250px]" : "left-[18px]"
        }`}
      >
        <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-white hover:cursor-pointer hover:text-green-500 hover:scale-110 transition-transform duration-100" />
      </button>
    </div>
  );
};

export default Sidebar;
