"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import '@/app/globals.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  // fetch users and campaigns
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error(err));

    fetch("/api/campaigns")
      .then((res) => res.json())
      .then(setCampaigns)
      .catch((err) => console.error(err));
  }, []);

  const handleCreateCampaign = () => {
    // redirect to create campaign page
    window.location.href = "/admin/campaigns";
  };

  const handleCreateFundingPlan = () => {
    // redirect to create funding plan page
    window.location.href = "/admin/funding-plans";
  };

  return (
    <div className="p-6 space-y-8 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <h1 className="text-3xl font-bold dark:text-white transition-colors duration-200">Admin Dashboard</h1>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Button onClick={handleCreateCampaign}>+ Create Campaign</Button>
        <Button onClick={handleCreateFundingPlan}>+ Create Funding Plan</Button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-4 dark:text-white transition-colors duration-200">All Users</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 transition-colors duration-200">
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Name</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Email</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{user.name}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{user.email}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-4 dark:text-white transition-colors duration-200">All Campaigns</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 transition-colors duration-200">
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Title</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">NGO Name</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Goal Amount</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Collected</th>
              <th className="border dark:border-gray-600 px-4 py-2 dark:text-white transition-colors duration-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{c.title}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{c.ngo_name}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{c.goal_amount}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{c.collected_amount}</td>
                <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200 transition-colors duration-200">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
