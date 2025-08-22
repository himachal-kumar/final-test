'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string;
  height?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  // Base classes for all skeleton types
  const baseClasses = 'bg-gray-200 relative overflow-hidden';
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse-custom',
    wave: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    none: '',
  };

  // Variant specific classes
  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  // Combine all classes
  const classes = [
    baseClasses,
    variantClasses[variant],
    animationClasses[animation],
    className,
  ].join(' ');

  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  return <div className={classes} style={styles} aria-hidden="true" />;
};

export default Skeleton;