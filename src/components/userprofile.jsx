import React, { useState } from "react";

const userProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">Customer Name</h1>

      {/* Account Details */}
      <div className="mt-4 space-y-2">
        <p>
          <strong>Active:</strong> Yes
        </p>
        <p>
          <strong>Number of Buildings:</strong> 5
        </p>
        <p>
          <strong>Sales Representative:</strong> John Doe
        </p>
      </div>

      {/* Add Building Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Add Building
      </button>

      {/* Buildings List */}
      <h2 className="mt-12 text-xl font-semibold">Buildings</h2>
      <ul className="mt-4 space-y-2">
        <li className="p-2 bg-white dark:bg-gray-800 rounded-md shadow">
          123 Main St
        </li>
        <li className="p-2 bg-white dark:bg-gray-800 rounded-md shadow">
          456 Oak Ave
        </li>
        <li className="p-2 bg-white dark:bg-gray-800 rounded-md shadow">
          789 Pine Rd
        </li>
      </ul>

      {/* Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold">Add Building</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default userProfile;
