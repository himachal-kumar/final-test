'use client';

import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text = 'Loading...',
  fullScreen = false,
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
    : 'flex flex-col items-center justify-center py-6';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin`}
          />
        </div>
        {text && (
          <p className="mt-3 text-sm font-medium text-gray-600">{text}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;