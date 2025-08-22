"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, Users, Target, ArrowRight } from "lucide-react";
import SkeletonList from "../../components/ui/skeleton-list";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  goal_amount: number;
  collected_amount: number;
  ngo_name?: string;
  created_at?: string;
}

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`);
        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
    
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              NGO Crowdfunding Platform
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
              Discover meaningful campaigns from NGOs around the world and make a difference with your contribution.
            </p>
          </div>
          
          {/* Import and use the SkeletonList component */}
          <div className="max-w-7xl mx-auto">
            <SkeletonList count={6} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
            NGO Crowdfunding Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            Discover meaningful campaigns from NGOs around the world and make a difference with your contribution.
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">No campaigns available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {campaigns.map((c) => {
              const percentFunded = Math.round((c.collected_amount / c.goal_amount) * 100);
              return (
                <div
                  key={c._id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col transition-colors duration-200"
                >
                  <div className="p-6 flex-grow">
                    {c.ngo_name && (
                      <div className="flex items-center mb-4">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3 transition-colors duration-200">
                          <Users size={16} />
                        </span>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 transition-colors duration-200">{c.ngo_name}</span>
                      </div>
                    )}
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-200">{c.title}</h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 transition-colors duration-200">{c.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200">
                          ₹{c.collected_amount.toLocaleString()} raised
                        </span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-200">
                          {percentFunded}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden transition-colors duration-200">
                        <div
                          className={`h-2.5 rounded-full ${percentFunded >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                          style={{
                            width: `${Math.min(percentFunded, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Goal: ₹{c.goal_amount.toLocaleString()}
                      </div>
                    </div>
                    
                    {c.created_at && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                        <Calendar size={14} className="mr-1" />
                        <span>Created {new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 pb-6 space-y-3">
                    <Link
                      href={`/campaign/${c._id}`}
                      className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      View Details <ArrowRight size={16} className="ml-2" />
                    </Link>
                    
                    {isLoggedIn && (
                      <Link
                        href={`/campaign/${c._id}`}
                        className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        Donate Now
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
