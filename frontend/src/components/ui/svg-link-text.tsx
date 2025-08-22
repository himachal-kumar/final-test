'use client';

import React from 'react';

interface SvgLinkTextProps {
  text: string;
  className?: string;
}

const SvgLinkText: React.FC<SvgLinkTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="text-current">{text}</span>
    </div>
  );
};

export default SvgLinkText;