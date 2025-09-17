"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [governmentId, setGovernmentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/login", { governmentId, password });
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Login to TezRoute
        </h2>
        <div className="mb-5">
          <label
            htmlFor="governmentId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Government ID
          </label>
          <input
            type="text"
            id="governmentId"
            name="governmentId"
            required
            value={governmentId}
            onChange={(e) => setGovernmentId(e.target.value)}
            className="block w-full px-4 py-2 border-b-2 border-blue-200 bg-transparent text-gray-900 rounded-md focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter your government ID"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border-b-2 border-blue-200 bg-transparent text-gray-900 rounded-md focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
