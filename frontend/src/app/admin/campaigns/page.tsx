"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function CampaignsAdmin() {
  const [form, setForm] = useState({
    ngo_name: "",
    title: "",
    description: "",
    goal_amount: ""
  });

  const [campaigns, setCampaigns] = useState<any[]>([]);

  // fetch existing campaigns
  useEffect(() => {
    fetch("/api/campaigns")
      .then(res => res.json())
      .then(setCampaigns)
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.ngo_name || !form.title || !form.goal_amount) {
      toast.error("Please fill required fields");
      return;
    }

    const res = await fetch("/api/admin/campaigns/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, goal_amount: Number(form.goal_amount) })
    });

    if (res.ok) {
      const data = await res.json();
      toast.success("Campaign created successfully!");
      setCampaigns([...campaigns, data]);
      setForm({ ngo_name: "", title: "", description: "", goal_amount: "" });
    } else {
      const error = await res.json();
      toast.error(error?.error || "Failed to create campaign");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin – Create Campaign</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <Input
          placeholder="NGO Name"
          name="ngo_name"
          value={form.ngo_name}
          onChange={handleChange}
        />
        <Input
          placeholder="Campaign Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          placeholder="Description (optional)"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          type="number"
          placeholder="Goal Amount (in smallest unit)"
          name="goal_amount"
          value={form.goal_amount}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>Create Campaign</Button>
      </div>

      {/* List of campaigns */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Campaigns</h2>
        <ul className="space-y-2">
          {campaigns.map((c) => (
            <li key={c._id} className="border p-3 rounded">
              <strong>{c.title}</strong> ({c.ngo_name}) <br />
              Goal: {c.goal_amount}, Collected: {c.collected_amount} <br />
              Status: {c.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
