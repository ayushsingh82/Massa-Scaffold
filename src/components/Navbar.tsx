'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Import Bearby Web3 - using dynamic import to avoid build issues
let web3: any = null;

// Dynamic import to handle potential build issues
if (typeof window !== 'undefined') {
  import('@hicaru/bearby.js').then((module) => {
    web3 = module.web3;
  }).catch((error) => {
    console.error('Failed to load Bearby Web3:', error);
  });
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);

  // Initialize wallet on component mount
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // Wait for Bearby Web3 to load
        if (!web3) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!web3) {
            setError('Bearby Web3 not available. Please refresh the page.');
            return;
          }
        }

        // Check if Bearby is installed
        if (!web3.wallet.installed) {
          setError('Bearby wallet is not installed. Please install the Bearby extension from the Chrome Web Store.');
          return;
        }

        console.log('Bearby wallet is installed');

        // Check if already connected
        if (web3.wallet.connected && web3.wallet.account?.base58) {
          setIsConnected(true);
          setWalletAddress(web3.wallet.account.base58);
          console.log('Found existing connection:', web3.wallet.account.base58);
        }

        // Set up wallet instance for later use
        setWallet(web3.wallet);

      } catch (error) {
        console.error('Failed to initialize Bearby wallet:', error);
        setError('Failed to initialize Bearby wallet. Please ensure Bearby extension is installed.');
      }
    };

    // Delay initialization to ensure extensions are loaded
    const timer = setTimeout(initializeWallet, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Connect to wallet
  const connectWallet = async () => {
    if (!web3 || !web3.wallet) {
      setError('Bearby Web3 not available. Please refresh the page.');
      return;
    }

    try {
      setIsConnecting(true);
      setError('');

      // Check if Bearby is installed
      if (!web3.wallet.installed) {
        setError('Bearby wallet is not installed. Please install the Bearby extension from the Chrome Web Store.');
        return;
      }

      console.log('Attempting wallet connection...');
      
      // Connect to Bearby wallet
      const connected = await web3.wallet.connect();
      console.log('Connection result:', connected);
      
      if (connected && web3.wallet.account?.base58) {
        const address = web3.wallet.account.base58;
        setIsConnected(true);
        setWalletAddress(address);
        console.log('Connected to Bearby wallet:', address);
      } else {
        setError('Failed to connect to Bearby wallet or no account available.');
      }
    } catch (error) {
      console.error('Failed to connect to Bearby wallet:', error);
      if (error && typeof error === 'object' && 'code' in error && error.code === 4001) {
        setError('Connection rejected by user.');
      } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        setError(`Connection failed: ${error.message}`);
      } else {
        setError('Failed to connect to Bearby wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    try {
      if (web3 && web3.wallet) {
        await web3.wallet.disconnect();
      }
      setIsConnected(false);
      setWalletAddress('');
      setAccounts([]);
      setError('');
      console.log('Disconnected from Bearby wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Get shortened address for display
  const getShortAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle wallet connection button
  const handleWalletButton = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

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
              href="/greeter" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Greeter
            </Link>
            <Link 
              href="/counter" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Counter
            </Link>
            <Link 
              href="/bridge" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              Bridge
            </Link>
            <Link 
              href="/mnsdomain" 
              className="text-white hover:text-orange-400 transition-colors"
            >
              MNS-Domain
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleWalletButton}
              disabled={isConnecting}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                isConnected 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
              } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isConnecting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : isConnected ? (
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {getShortAddress(walletAddress)}
                </span>
              ) : (
                'Connect Bearby'
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 border-t border-orange-500/20">
              <Link 
                href="/greeter" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Greeter
              </Link>
              <Link 
                href="/counter" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Counter
              </Link>
              <Link 
                href="/bridge" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Bridge
              </Link>
              <Link 
                href="/mnsdomain" 
                className="block px-3 py-2 text-white hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MNS-Domain
              </Link>
              
              <div className="px-3 py-2">
                <button 
                  onClick={() => {
                    handleWalletButton();
                    setIsMenuOpen(false);
                  }}
                  disabled={isConnecting}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isConnected 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                  } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isConnecting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : isConnected ? (
                    <span className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {getShortAddress(walletAddress)}
                    </span>
                                      ) : (
                      'Connect Bearby'
                    )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm">{error}</span>
              <button 
                onClick={() => setError('')}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
