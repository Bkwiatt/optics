import React from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"; // Import Heroicons
import Optics from "../assets/images/Optic_Logo.png";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-125 h-100 ">
      {/* Header */}
  

      {/* Logo */}
      <div className="flex flex-col items-center mb-6 ">
        <img src={Optics} alt="Logo" className="w-12 h-auto" />
      </div>

      {/* Login Form */}
      <form className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-80 shadow-xl">
        {/* Email Input */}
        <div className="flex items-center gap-3 mb-4 border border-gray-300 rounded-md p-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          <input
            className="w-full outline-none text-gray-700"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center gap-3 mb-4 border border-gray-300 rounded-md p-2">
          <LockClosedIcon className="w-5 h-5 text-gray-500" />
          <input
            className="w-full outline-none text-gray-700"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Login Button */}
        <button className="bg-green-500 text-white py-2 rounded-md text-lg hover:bg-green-600 transition">
          Login
        </button>

        {/* Separator */}
        <div className="h-px bg-gray-300 my-4"></div>

        {/* Forgot Password */}
        <h2 className="text-center text-sm text-gray-600 cursor-pointer hover:underline">
          Forgot Password
        </h2>

        {/* Register Button */}
        <Link to="/register" className="mt-4">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition">
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
