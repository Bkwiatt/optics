import React from "react";

const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-7">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-10">Dashboard</h1>
        <h2 className="text-lg text-gray-700 dark:text-gray-300 ml-10 mb-4">Overview</h2>
        <div className="border-b border-gray-300 dark:border-gray-700 mb-6"></div>
      </div>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 justify-center items-center h-72 text-center border border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-green-500 font-semibold">Here is your dashboard overview.</p>
        </div>
        

        {/* Statistics Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center h-72 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Active Projects</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center h-72 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Pending Work Orders</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
        </div>

        {/* Additional Boxes for Future Components */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center h-72 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Graph Placeholder</h3>
          <p className="text-3xl">📊</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center h-72 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Calendar Placeholder</h3>
          <p className="text-3xl">📅</p>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <ul className="text-gray-900 dark:text-white list-disc pl-5">
            <li>Project X: New work order created.</li>
            <li>Project Y: Completed milestone 3.</li>
            <li>Project Z: Proposal sent to client.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
