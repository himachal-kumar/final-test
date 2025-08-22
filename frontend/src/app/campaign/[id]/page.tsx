"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Campaign } from "@/models/campaign";
import { FundingPlan } from "@/models/fundingPlan";
import Script from "next/script";
import Link from "next/link";
import SkeletonCampaignDetails from "@/components/ui/skeleton-campaign-details";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  image?: string;
  goal_amount: number;
  collected_amount: number;
  ngo_name?: string;
}

interface FundingPlan {
  _id: string;
  title: string;
  amount_cents: number;
  interval: string;
  ps_provider_plan_id: string;
}

const CampaignDetailsPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [plans, setPlans] = useState<FundingPlan[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [campaignRes, plansRes] = await Promise.all([
          fetch(`/api/campaigns/${id}`),
          fetch(`/api/funding-plans?campaign_id=${id}`),
        ]);

        if (campaignRes.ok) {
          const campaignData = await campaignRes.json();
          setCampaign(campaignData);
        }

        if (plansRes.ok) {
          const plansData = await plansRes.json();
          setPlans(plansData);
        }

        // get user id from localStorage
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        // Add a small delay to show the skeleton loader
        setTimeout(() => {
          setLoading(false);
        }, 800); // 800ms delay for better UX
      }
    };

    fetchData();
  }, [id]);

  const handleChoosePlan = async (plan: FundingPlan) => {
    if (!userId) {
      alert("⚠️ Please login first!");
      return;
    }

    setSelectedPlan(plan._id);
    setIsProcessing(true);

    try {
      // Create Razorpay order
      const res = await fetch("/api/razorpay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          campaignId: campaign?._id,
          fundingPlanId: plan._id,
          totalAmount: plan.amount_cents, // Convert from paise to rupees
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to create payment");
      }
      
      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "NGO Crowdfunding",
        description: `Donation for ${campaign?.title}`,
        order_id: data.razorpayOrder.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
                userId: userId,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              alert("✅ Payment successful! Thank you for your donation.");
              // Refresh campaign data to show updated amount
              window.location.reload();
            } else {
              alert("❌ Payment verification failed: " + verifyData.message);
            }
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("❌ Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
            setSelectedPlan(null);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#4F46E5", // Indigo color for better UI
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setSelectedPlan(null);
          }
        }
      };

      // @ts-ignore - Razorpay is loaded via script
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("❌ Something went wrong. Try again later.");
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return <SkeletonCampaignDetails />;
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md w-full text-center transition-colors duration-200">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">Campaign Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link href="/campaign" className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Browse Campaigns
          </Link>
        </div>
      </div>
    );
  }

  const percentFunded = Math.round(
    (campaign.collected_amount / campaign.goal_amount) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-8 lg:px-20 transition-colors duration-200">
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/campaigns" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            <span className="mr-2">←</span>
            Back to Campaigns
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md mb-8 transition-colors duration-200">
          <h1 className="text-3xl font-bold mb-2 dark:text-white transition-colors duration-200">{campaign.title}</h1>
          {campaign.ngo_name && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">By {campaign.ngo_name}</p>
          )}
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6 transition-colors duration-200">
            <div className="flex flex-wrap items-end justify-between mb-2">
              <div>
                <span className="block text-3xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-200">₹{campaign.collected_amount.toLocaleString()}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">raised of ₹{campaign.goal_amount.toLocaleString()} goal</span>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${percentFunded >= 100 ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'} transition-colors duration-200`}>
                  {percentFunded}%
                </span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">funded</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden transition-colors duration-200">
              <div
                className={`h-3 rounded-full ${percentFunded >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                style={{ width: `${Math.min(percentFunded, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8 dark:prose-invert transition-colors duration-200">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-200">{campaign.description}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Choose a Funding Plan</h2>
          
          {plans.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div key={plan._id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{plan.title}</h3>
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-200">₹{plan.amount_cents.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">{plan.interval}</span>
                  </div>
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    disabled={isProcessing || !isLoggedIn}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${(isProcessing && selectedPlan === plan._id) || !isLoggedIn
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-400 dark:text-indigo-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isProcessing && selectedPlan === plan._id ? (
                      <>
                        <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-400 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : !isLoggedIn ? (
                      'Login to Donate'
                    ) : (
                      'Choose Plan'
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8 transition-colors duration-200">No funding plans available for this campaign.</p>
          )}
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
            <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Your donation is secure and will directly support this campaign. Once payment is complete, you'll receive a confirmation email with details of your contribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
