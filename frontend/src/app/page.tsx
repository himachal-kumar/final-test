"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-20 transition-colors duration-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Join our community of donors helping NGOs create positive change around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaign" className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg">
              Browse Campaigns
            </Link>
            {!isLoggedIn ? (
              <Link href="/auth/signup" className="bg-transparent hover:bg-indigo-600 border-2 border-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg">
                Sign Up to Donate
              </Link>
            ) : (
              <Link href="/campaign" className="bg-transparent hover:bg-indigo-600 border-2 border-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg">
                Donate Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white transition-colors duration-200">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300 dark:hover:bg-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold transition-colors duration-200">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white transition-colors duration-200">Browse Campaigns</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Explore various NGO campaigns and find causes that resonate with you.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300 dark:hover:bg-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <span className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold transition-colors duration-200">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white transition-colors duration-200">Choose a Plan</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Select a funding plan that fits your budget and commitment level.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300 dark:hover:bg-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <span className="text-purple-600 dark:text-purple-400 text-2xl font-bold transition-colors duration-200">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white transition-colors duration-200">Make an Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Your contribution directly helps NGOs achieve their mission and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white transition-colors duration-200">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-200">
            Join thousands of donors who are creating positive change through our platform.
          </p>
          <Link href="/campaign" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
