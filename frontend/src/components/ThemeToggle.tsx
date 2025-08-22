'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/i18n';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLanguage();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    // Load translations based on current locale
    getTranslations(locale, 'navbar')
      .then((navbarTranslations) => {
        setTranslations(navbarTranslations);
      })
      .catch(error => {
        console.error('Error loading translations:', error);
      });
  }, [locale]);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${className} ${
        theme === 'dark' 
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
      aria-label={theme === 'light' 
        ? (translations?.darkMode || 'Dark Mode') 
        : (translations?.lightMode || 'Light Mode')}
    >
      {theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;