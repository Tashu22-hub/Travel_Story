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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Statistics</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Full Name:</strong> {userInfo.fullName}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Password:</strong> {userInfo.password}</p>
        <p><strong>Joined Date:</strong> {userInfo.createdOn || "N/A"}</p>
        {/* Add more stats if available */}
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
