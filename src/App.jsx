import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/userprofile";
import Dashboard from "./components/home";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const location = useLocation(); // Get current route

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content (Shifts based on sidebar state) */}
      <div
        className={`p-6 transition-all duration-300 flex-1 ${
          isSidebarOpen ? "ml-[280px]" : "ml-[60px]"
        } ${location.pathname === "/login" ? "flex items-center justify-center" : ""}`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile-page" element={<UserProfile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
