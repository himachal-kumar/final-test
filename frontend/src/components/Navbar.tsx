"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { getTranslations } from '@/i18n';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [translations, setTranslations] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    // Check if user is logged in by looking for userId in localStorage
    const userId = localStorage.getItem('userId');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    if (userId) {
      setIsLoggedIn(true);
      // Extract username from email (everything before @)
      if (storedUserEmail) {
        const username = storedUserEmail.split('@')[0];
        setUserName(username);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);
  
  useEffect(() => {
    // Load translations based on current locale
    Promise.all([
      getTranslations(locale, 'navbar'),
      getTranslations(locale, 'common')
    ]).then(([navbarTranslations, commonTranslations]) => {
      setTranslations({...navbarTranslations, appName: commonTranslations.appName});
    }).catch(error => {
      console.error('Error loading translations:', error);
    });
  }, [locale]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    
    // Call logout API to clear cookies
    fetch('/api/auth/logout', {
      method: 'POST',
    }).then(() => {
      setIsLoggedIn(false);
      setUserName('');
      router.push('/');
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          {translations?.appName || "NGO Fund"}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'} transition duration-300`}
          >
            {translations?.home || "Home"}
          </Link>
          <Link 
            href="/campaign" 
            className={`${pathname.startsWith('/campaign') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'} transition duration-300`}
          >
            {translations?.campaigns || "Campaigns"}
          </Link>
          {/* <Link 
            href="/donate" 
            className={`${pathname.startsWith('/donate') ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'} transition duration-300`}
          >
            {translations?.donate || "Donate"}
          </Link> */}
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {translations?.greeting ? translations.greeting.replace('{username}', userName) : `Hi, ${userName}`}
              </span>
              <button 
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                {translations?.logout || "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                {translations?.login || "Login"}
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800 transition duration-300"
              >
                {translations?.signup || "Sign Up"}
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4">
          <div className="flex flex-col space-y-4">
            <div className="py-2 flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-300'} block py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations?.home || "Home"}
            </Link>
            <Link 
              href="/campaign" 
              className={`${pathname.startsWith('/campaign') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-300'} block py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations?.campaigns || "Campaigns"}
            </Link>
            <Link 
              href="/donate" 
              className={`${pathname.startsWith('/donate') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-300'} block py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations?.donate || "Donate"}
            </Link>
            
            {isLoggedIn ? (
              <>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium block py-2">
                  {translations?.greeting ? translations.greeting.replace('{username}', userName) : `Hi, ${userName}`}
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 dark:text-gray-300 block py-2 text-left"
                >
                  {translations?.logout || "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-600 dark:text-gray-300 block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translations?.login || "Login"}
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded-md inline-block hover:bg-indigo-700 dark:hover:bg-indigo-800 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translations?.signup || "Sign Up"}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;