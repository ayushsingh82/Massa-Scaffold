'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-orange-500/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-white">
                Massa Scaffold
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/counter" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Counter
            </Link>
            <Link 
              href="" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:flex items-center">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-400 focus:outline-none"
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-orange-500/20">
              <Link 
                href="/" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/counter" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Counter
              </Link>
              <Link 
                href="#features" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#about" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-3 py-2">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
