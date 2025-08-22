'use client';

import React from 'react';
import SkeletonCard from './skeleton-card';

interface SkeletonListProps {
  count?: number;
  className?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ 
  count = 3,
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </div>
  );
};

export default SkeletonList;