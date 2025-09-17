"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  governmentId: string;
}

const Page = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from /api/users/about
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/about");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          User Profile
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : user ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name: </span>
              <span className="text-gray-900">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email: </span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Phone: </span>
              <span className="text-gray-900">{user.phone}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">
                Government ID:{" "}
              </span>
              <span className="text-gray-900">{user.governmentId}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500">
            Failed to load user details.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
