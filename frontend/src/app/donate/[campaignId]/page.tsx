"use client";

import { useState } from "react";

export default function DonatePage({ params }: { params: { campaignId: string } }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "UPI",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, campaignId: params.campaignId }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Donation successful!");
      setFormData({ name: "", email: "", amount: "", paymentMethod: "UPI" });
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4 transition-colors duration-200"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white transition-colors duration-200">Donate to Campaign</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border dark:border-gray-600 p-2 rounded-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border dark:border-gray-600 p-2 rounded-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Donation Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border dark:border-gray-600 p-2 rounded-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
          required
        />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full border dark:border-gray-600 p-2 rounded-md dark:bg-gray-700 dark:text-white transition-colors duration-200"
        >
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-2 rounded-md transition-colors duration-200"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
}
