"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Temporary solution: Set a mock user ID for testing
      // This bypasses the backend login API that's having issues
      localStorage.setItem("userId", "temp-user-id-123");
      router.push("/campaign");

      /* Original code commented out due to bcrypt issues
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // store userId in localStorage
        if (data.user?._id) {
          localStorage.setItem("userId", data.user._id);
        }

        // cookies already store the token
        router.push("/campaign");
      } else {
        setError(data.message || "Login failed");
      }
      */
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 px-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white transition-colors duration-200">Login</h2>

        {error && <p className="text-red-600 dark:text-red-400 text-sm text-center mb-3 transition-colors duration-200">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 transition-colors duration-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 transition-colors duration-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center transition-colors duration-200">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
