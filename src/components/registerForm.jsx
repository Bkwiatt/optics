import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import Heroicons

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Registration Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        {/* Back Button */}
        <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          <span>Back to Login</span>
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Create a new account</h1>

        {/* Registration Form */}
        <form className="flex flex-col space-y-4">
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Username"
            required
          />
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Last Name"
            required
          />
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Job Title"
            required
          />

          {/* Register Button */}
          <button className="w-full bg-green-500 text-white py-3 rounded-md text-lg hover:bg-green-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
