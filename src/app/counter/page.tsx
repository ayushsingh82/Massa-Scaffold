'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Counter Demo
          </h1>
          <p className="text-xl text-gray-300">
            A simple example of state management in your Massa dApp
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-white mb-4">
                {count}
              </div>
              <p className="text-gray-400">
                Current count value
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCount(count - 1)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Decrease
              </button>
              
              <button
                onClick={() => setCount(0)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Reset
              </button>
              
              <button
                onClick={() => setCount(count + 1)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Increase
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            Ready to build something more complex?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.massa.net"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold"
            >
              Read Massa Docs
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-400 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 font-semibold"
            >
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}