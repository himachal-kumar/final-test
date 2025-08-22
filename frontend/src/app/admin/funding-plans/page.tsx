"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
export default function FundingPlansAdmin() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [form, setForm] = useState({
    campaign_id: "",
    title: "",
    amount_cents: "",
    interval: "",
    ps_provider_plan_id: ""
  });
  const [plans, setPlans] = useState<any[]>([]);
  const router = useRouter();
  // fetch campaigns for dropdown
  useEffect(() => {
    fetch("/api/campaigns")
      .then(res => res.json())
      .then(setCampaigns);
    fetch("/api/funding-plans")
      .then(res => res.json())
      .then(setPlans);
  }, []);
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const res = await fetch("/api/admin/funding-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setPlans([...plans, data.plan]);
      setForm({ campaign_id: "", title: "", amount_cents: "", interval: "", ps_provider_plan_id: "" });
      // :white_tick: Navigate to admin dashboard after success
      router.push("/admin/dashboard");
    }
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin – Funding Plans</h1>
      {/* Create Funding Plan */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Create Funding Plan</h2>
        <select
          name="campaign_id"
          value={form.campaign_id}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
        >
          <option value="">Select Campaign</option>
          {campaigns.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title} ({c.ngo_name})
            </option>
          ))}
        </select>
        <Input placeholder="Title" name="title" value={form.title} onChange={handleChange} className="mb-3" />
        <Input placeholder="Amount (in cents)" name="amount_cents" value={form.amount_cents} onChange={handleChange} className="mb-3" />
        <select
          name="interval"
          value={form.interval}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
        >
          <option value="">Select Interval</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half_year">Half Year</option>
          <option value="yearly">Yearly</option>
        </select>
        <Input placeholder="Payment Provider Plan ID" name="ps_provider_plan_id" value={form.ps_provider_plan_id} onChange={handleChange} className="mb-3" />
        <Button onClick={handleSubmit}>Create Plan</Button>
      </div>
      {/* List Funding Plans */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Funding Plans</h2>
        <ul className="space-y-2">
          {plans.map((p) => p && (
            <li key={p._id} className="border p-3 rounded">
              <strong>{p?.title || 'Untitled Plan'}</strong> – ${((p?.amount_cents || 0) / 100).toFixed(2)} / {p?.interval || 'N/A'} <br />
              Campaign: {p?.campaign_id ? `${p.campaign_id.title || 'Untitled'} (${p.campaign_id.ngo_name || 'Unknown'})` : 'No campaign linked'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}






