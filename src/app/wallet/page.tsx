'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const connect = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
    } catch (error) {
      console.error("Connection failed:", error);
      setError('Connection failed - Please install Bearby wallet extension');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsLoading(true);
      // Simulate wallet disconnection
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsConnected(false);
    } catch (error) {
      console.error("Disconnection failed:", error);
      setError('Disconnection failed');
    } finally {
      setIsLoading(false);
    }
  };

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
            Wallet Provider Demo
          </h1>
          <p className="text-xl text-gray-300">
            Connect to Bearby wallet and manage your accounts
          </p>
        </div>

        {/* Wallet Status Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Wallet Status</h2>
            
            {/* Connection Status */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-white font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm">
                Wallet: Bearby (Demo Mode)
              </p>
            </div>

            {/* Connection Button */}
            <div className="mb-6">
              {isConnected ? (
                <button
                  onClick={disconnect}
                  disabled={isLoading}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  {isLoading ? 'Disconnecting...' : 'Disconnect Wallet'}
                </button>
              ) : (
                <button
                  onClick={connect}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Demo Accounts Section */}
        {isConnected && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Demo Accounts</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Demo Account 1</p>
                    <p className="text-gray-400 text-sm font-mono break-all">
                      0x1234567890abcdef1234567890abcdef12345678
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-medium">
                      1,000 MASSA
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Demo Account 2</p>
                    <p className="text-gray-400 text-sm font-mono break-all">
                      0xabcdef1234567890abcdef1234567890abcdef12
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-medium">
                      500 MASSA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Network Info Section */}
        {isConnected && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Demo Network Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Network Name</p>
                <p className="text-white font-medium">Massa Testnet</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Chain ID</p>
                <p className="text-white font-medium">7762958</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Currency</p>
                <p className="text-white font-medium">MASSA</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm">RPC URL</p>
                <p className="text-white font-medium text-sm break-all">
                  https://test.massa.net/api/v2
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              💡 Demo Mode
            </h3>
            <p className="text-orange-200 mb-4 text-sm">
              This is a demo version of the wallet integration. In a real implementation, you would:
            </p>
            <ul className="text-orange-200 space-y-2 text-sm text-left">
              <li>• Install Bearby wallet extension in your browser</li>
              <li>• Use the actual @massalabs/wallet-provider package</li>
              <li>• Connect to real Massa network and accounts</li>
              <li>• Perform actual transactions and operations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 