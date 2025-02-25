import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileStats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state?.userInfo; // Get user data passed from navigation

  if (!userInfo) {
    navigate("/dashboard"); // Redirect to dashboard if no user data is available
    return null;
  }

  return (
    <div className="w-2/4 p-10 bg-white rounded-lg shadow-lg z-50 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Profile Statistics</h2>
      <div>
        <p className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"><strong>Full Name:</strong> {userInfo.fullName}</p>
        <p className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"><strong>Email:</strong> {userInfo.email}</p>
        <p className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"><strong>Password:</strong> {userInfo.password}</p>
        <p className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"><strong>Joined Date:</strong> {userInfo.createdOn || "N/A"}</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ProfileStats;
