/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
  // Configure API routes directory
  experimental: {
    appDir: true,
  },
  // Ensure CSS is properly processed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;