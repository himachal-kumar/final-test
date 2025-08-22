"use client";
import "@/app/globals.css";

export default function TestPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Test Page</h1>
      <p className="text-gray-700 mb-6">This is a test page to check if Tailwind CSS is working properly.</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3">Test Container</h2>
        <p className="text-gray-600">This container should have a white background, rounded corners, and a shadow.</p>
      </div>
    </div>
  );
}