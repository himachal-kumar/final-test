'use client';

import React from 'react';
import Skeleton from './skeleton';

const SkeletonCampaignDetails: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left column - Campaign image placeholder */}
          <div className="md:w-1/2">
            <Skeleton 
              variant="rectangular" 
              className="w-full h-full min-h-[300px]" 
              animation="pulse" 
            />
          </div>
          
          {/* Right column - Campaign details */}
          <div className="p-8 md:w-1/2 space-y-6">
            {/* Title placeholder */}
            <Skeleton 
              variant="text" 
              className="h-8 w-3/4" 
              animation="pulse" 
            />
            
            {/* NGO name placeholder */}
            <Skeleton 
              variant="text" 
              className="h-5 w-1/3" 
              animation="pulse" 
            />
            
            {/* Progress bar placeholder */}
            <div className="space-y-2 py-2">
              <div className="flex justify-between">
                <Skeleton variant="text" className="h-5 w-1/4" animation="pulse" />
                <Skeleton variant="text" className="h-5 w-1/6" animation="pulse" />
              </div>
              <Skeleton 
                variant="rectangular" 
                className="h-2.5 w-full rounded-full" 
                animation="pulse" 
              />
              <Skeleton variant="text" className="h-4 w-1/3 mt-1" animation="pulse" />
            </div>
            
            {/* Description placeholders */}
            <div className="space-y-2 py-4">
              <Skeleton variant="text" className="h-4 w-full" animation="pulse" />
              <Skeleton variant="text" className="h-4 w-full" animation="pulse" />
              <Skeleton variant="text" className="h-4 w-full" animation="pulse" />
              <Skeleton variant="text" className="h-4 w-5/6" animation="pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Funding plans section */}
      <div className="mt-8">
        <Skeleton variant="text" className="h-6 w-1/4 mb-6" animation="pulse" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <Skeleton variant="text" className="h-6 w-2/3 mb-4" animation="pulse" />
              <Skeleton variant="text" className="h-8 w-1/2 mb-6" animation="pulse" />
              <Skeleton variant="text" className="h-4 w-full mb-2" animation="pulse" />
              <Skeleton variant="text" className="h-4 w-5/6 mb-6" animation="pulse" />
              <Skeleton 
                variant="rectangular" 
                className="h-12 w-full rounded-lg mt-4" 
                animation="pulse" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonCampaignDetails;