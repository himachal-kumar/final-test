'use client';

import React from 'react';
import Skeleton from './skeleton';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {/* Image placeholder */}
      <Skeleton 
        variant="rectangular" 
        className="w-full h-48" 
        animation="pulse" 
      />
      
      <div className="p-5 space-y-4">
        {/* Title placeholder */}
        <Skeleton 
          variant="text" 
          className="h-7 w-3/4" 
          animation="pulse" 
        />
        
        {/* Description placeholder - multiple lines */}
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-full" animation="pulse" />
          <Skeleton variant="text" className="h-4 w-full" animation="pulse" />
          <Skeleton variant="text" className="h-4 w-5/6" animation="pulse" />
        </div>
        
        {/* Stats/metadata row */}
        <div className="flex justify-between pt-2">
          <Skeleton variant="text" className="h-5 w-1/4" animation="pulse" />
          <Skeleton variant="text" className="h-5 w-1/4" animation="pulse" />
        </div>
        
        {/* Button placeholder */}
        <Skeleton 
          variant="rectangular" 
          className="h-10 w-full rounded-md mt-4" 
          animation="pulse" 
        />
      </div>
    </div>
  );
};

export default SkeletonCard;