'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/i18n';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get language display name
  const getLanguageDisplay = (localeCode: Locale) => {
    switch (localeCode) {
      case 'en': return 'English';
      case 'es': return 'Español';
      case 'fr': return 'Français';
      default: return String(localeCode).toUpperCase();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span>{getLanguageDisplay(locale)}</span>
        <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`block w-full px-4 py-2 text-sm text-left ${locale === 'en' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`block w-full px-4 py-2 text-sm text-left ${locale === 'es' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Español
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`block w-full px-4 py-2 text-sm text-left ${locale === 'fr' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Français
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;