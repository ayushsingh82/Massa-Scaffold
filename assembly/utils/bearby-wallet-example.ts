// bearby-wallet-example.ts - Bearby Wallet Integration Example
// This file demonstrates how to properly integrate with Bearby wallet extension

// TypeScript interface for Bearby wallet
interface BearbyWallet {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (data: unknown) => void) => void;
  removeListener: (event: string, callback: (data: unknown) => void) => void;
  isConnected: () => boolean;
  isBearby?: boolean;
}

// React hook for Bearby wallet integration
/*
import { useState, useEffect, useCallback } from 'react';

export function useBearbyWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<BearbyWallet | null>(null);

  // Get Bearby wallet instance
  const getBearbyWallet = useCallback((): BearbyWallet | null => {
    if (typeof window === 'undefined') return null;
    
    // Check for Bearby wallet in different possible locations
    const bearby = (window as any).bearby;
    const ethereum = (window as any).ethereum;
    
    // Prefer Bearby if available
    if (bearby && bearby.isBearby) {
      return bearby;
    }
    
    // Fallback to ethereum if it's Bearby
    if (ethereum && ethereum.isBearby) {
      return ethereum;
    }
    
    return null;
  }, []);

  // Initialize wallet
  useEffect(() => {
    const initializeWallet = async () => {
      const walletInstance = getBearbyWallet();
      if (walletInstance) {
        setWallet(walletInstance);
        
        // Check if already connected
        try {
          const accounts = await walletInstance.request({ method: 'eth_accounts' }) as string[];
          if (accounts && accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.log('No existing connection found');
        }
        
        // Set up event listeners
        walletInstance.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          } else {
            setWalletAddress('');
            setIsConnected(false);
          }
        });
        
        walletInstance.on('chainChanged', (chainId: string) => {
          console.log('Chain changed:', chainId);
          // Reload page on chain change as recommended by MetaMask
          window.location.reload();
        });
        
        walletInstance.on('disconnect', () => {
          setWalletAddress('');
          setIsConnected(false);
        });
      }
    };

    // Delay initialization to ensure extensions are loaded
    const timer = setTimeout(initializeWallet, 1000);
    return () => clearTimeout(timer);
  }, [getBearbyWallet]);

  // Connect to wallet
  const connect = useCallback(async () => {
    const walletInstance = getBearbyWallet();
    if (!walletInstance) {
      setError('Bearby wallet not found. Please install the Bearby extension.');
      return false;
    }

    try {
      setIsConnecting(true);
      setError('');

      const accounts = await walletInstance.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        console.log('Connected to Bearby wallet:', accounts[0]);
        return true;
      } else {
        setError('No accounts found in Bearby wallet.');
        return false;
      }
    } catch (error) {
      console.error('Failed to connect to Bearby wallet:', error);
      
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as any).code;
        if (errorCode === 4001) {
          setError('Connection rejected by user.');
        } else if (errorCode === -32002) {
          setError('Connection request already pending. Please check your wallet.');
        } else {
          setError(`Connection failed: ${(error as any).message || 'Unknown error'}`);
        }
      } else {
        setError('Failed to connect to Bearby wallet. Please try again.');
      }
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [getBearbyWallet]);

  // Disconnect from wallet
  const disconnect = useCallback(async () => {
    try {
      setWalletAddress('');
      setIsConnected(false);
      setError('');
      console.log('Disconnected from Bearby wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }, []);

  // Get account balance
  const getBalance = useCallback(async (address?: string) => {
    if (!wallet || !isConnected) {
      throw new Error('Wallet not connected');
    }

    const targetAddress = address || walletAddress;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    try {
      const balance = await wallet.request({
        method: 'eth_getBalance',
        params: [targetAddress, 'latest']
      }) as string;
      
      // Convert from hex to decimal
      const balanceInWei = parseInt(balance, 16);
      const balanceInEth = balanceInWei / Math.pow(10, 18);
      
      return balanceInEth;
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }, [wallet, isConnected, walletAddress]);

  // Sign a message
  const signMessage = useCallback(async (message: string) => {
    if (!wallet || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await wallet.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      }) as string;
      
      return signature;
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  }, [wallet, isConnected, walletAddress]);

  // Send transaction
  const sendTransaction = useCallback(async (transaction: {
    to: string;
    value: string;
    data?: string;
  }) => {
    if (!wallet || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await wallet.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: transaction.to,
          value: transaction.value,
          data: transaction.data || '0x'
        }]
      }) as string;
      
      return txHash;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }, [wallet, isConnected, walletAddress]);

  return {
    wallet,
    isConnected,
    walletAddress,
    isConnecting,
    error,
    connect,
    disconnect,
    getBalance,
    signMessage,
    sendTransaction
  };
}
*/

// Example usage in a component
/*
import React from 'react';
import { useBearbyWallet } from './bearby-wallet-example';

export function WalletConnectButton() {
  const {
    isConnected,
    walletAddress,
    isConnecting,
    error,
    connect,
    disconnect
  } = useBearbyWallet();

  const getShortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
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
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
*/

// Example of using wallet with smart contracts
/*
export function useContractInteraction() {
  const { wallet, isConnected, walletAddress } = useBearbyWallet();

  const callContract = async (contractAddress: string, data: string) => {
    if (!wallet || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await wallet.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: contractAddress,
          data: data
        }]
      }) as string;
      
      return txHash;
    } catch (error) {
      console.error('Contract call failed:', error);
      throw error;
    }
  };

  return { callContract };
}
*/

// Utility functions for Bearby wallet
export const BearbyUtils = {
  // Check if Bearby wallet is available
  isBearbyAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const bearby = (window as any).bearby;
    const ethereum = (window as any).ethereum;
    
    return !!(bearby?.isBearby || ethereum?.isBearby);
  },

  // Get Bearby wallet instance
  getBearbyWallet: (): BearbyWallet | null => {
    if (typeof window === 'undefined') return null;
    
    const bearby = (window as any).bearby;
    const ethereum = (window as any).ethereum;
    
    if (bearby?.isBearby) return bearby;
    if (ethereum?.isBearby) return ethereum;
    
    return null;
  },

  // Format address for display
  formatAddress: (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Convert hex to decimal
  hexToDecimal: (hex: string): number => {
    return parseInt(hex, 16);
  },

  // Convert wei to ether
  weiToEther: (wei: string): number => {
    const weiNumber = parseInt(wei, 16);
    return weiNumber / Math.pow(10, 18);
  }
};

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("Bearby wallet example - see comments for implementation details");
} 