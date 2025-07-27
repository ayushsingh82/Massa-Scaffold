'use client';

import { useState, useEffect } from 'react';
import { web3 } from '@hicaru/bearby.js';

interface GreeterState {
  greeting: string;
  isLoading: boolean;
  error: string;
  isConnected: boolean;
  walletAddress: string;
}

export default function GreeterPage() {
  const [state, setState] = useState<GreeterState>({
    greeting: '',
    isLoading: false,
    error: '',
    isConnected: false,
    walletAddress: ''
  });

  const [newGreeting, setNewGreeting] = useState('');
  const [contractAddress, setContractAddress] = useState('AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT'); // Replace with actual contract address

  // Initialize wallet connection
  useEffect(() => {
    const checkConnection = () => {
      try {
        if (web3.wallet.installed && web3.wallet.connected && web3.wallet.account?.base58) {
          setState(prev => ({
            ...prev,
            isConnected: true,
            walletAddress: web3.wallet.account.base58
          }));
          console.log('Found existing connection:', web3.wallet.account.base58);
        }
      } catch (error) {
        console.log('No existing connection found:', error);
      }
    };

    // Delay check to ensure extension is loaded
    const timer = setTimeout(checkConnection, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Connect to Bearby wallet
  const connectWallet = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: '' }));

      if (!web3.wallet.installed) {
        setState(prev => ({ 
          ...prev, 
          error: 'Bearby wallet is not installed. Please install the Bearby extension from the Chrome Web Store.',
          isLoading: false 
        }));
        return;
      }

      console.log('Attempting wallet connection...');
      
      const connected = await web3.wallet.connect();
      console.log('Connection result:', connected);
      
      if (connected && web3.wallet.account?.base58) {
        const address = web3.wallet.account.base58;
        setState(prev => ({
          ...prev,
          isConnected: true,
          walletAddress: address,
          isLoading: false
        }));
        console.log('Connected to Bearby wallet:', address);
      } else {
        setState(prev => ({
          ...prev,
          error: 'Failed to connect to Bearby wallet or no account available.',
          isLoading: false
        }));
      }
    } catch (error) {
      console.error('Failed to connect to Bearby wallet:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to connect to Bearby wallet. Please try again.',
        isLoading: false
      }));
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    try {
      await web3.wallet.disconnect();
      setState(prev => ({
        ...prev,
        isConnected: false,
        walletAddress: '',
        greeting: ''
      }));
      console.log('Disconnected from Bearby wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Call smart contract function
  const callContract = async (
    functionName: string,
    parameters: any[] = [],
    coins: number = 0
  ): Promise<string> => {
    try {
      if (!web3.wallet.connected) {
        throw new Error('Wallet not connected');
      }

      console.log('Calling contract function:', functionName, 'with parameters:', parameters);

      // Convert parameters to the correct format for Bearby
      const formattedParams = parameters.map((param) => {
        if (typeof param === 'string') {
          return {
            type: web3.contract.types.STRING,
            value: param
          };
        } else if (typeof param === 'number') {
          return {
            type: web3.contract.types.U64,
            value: param
          };
        } else if (typeof param === 'boolean') {
          return {
            type: web3.contract.types.BOOL,
            value: param
          };
        } else {
          return {
            type: web3.contract.types.STRING,
            value: String(param)
          };
        }
      });

      // Call the smart contract using Bearby Web3
      const txHash = await web3.contract.call({
        fee: 0, // Transaction fee
        maxGas: 2000000, // Maximum gas for the function call
        coins: coins, // Coins to attach to the function call
        targetAddress: contractAddress, // Contract address
        functionName: functionName, // Function to call
        parameters: formattedParams // Function parameters
      });

      console.log('Transaction hash:', txHash);
      return txHash;

    } catch (error) {
      console.error('Error calling contract:', error);
      throw error;
    }
  };

  // Read from smart contract
  const readContract = async (
    functionName: string,
    parameters: any[] = []
  ): Promise<any> => {
    try {
      console.log('Reading from contract function:', functionName, 'with parameters:', parameters);

      // Convert parameters to the correct format for Bearby
      const formattedParams = parameters.map((param) => {
        if (typeof param === 'string') {
          return {
            type: web3.contract.types.STRING,
            value: param
          };
        } else if (typeof param === 'number') {
          return {
            type: web3.contract.types.U64,
            value: param
          };
        } else if (typeof param === 'boolean') {
          return {
            type: web3.contract.types.BOOL,
            value: param
          };
        } else {
          return {
            type: web3.contract.types.STRING,
            value: String(param)
          };
        }
      });

      // Read from the smart contract using Bearby Web3
      const result = await web3.contract.readSmartContract({
        fee: 0, // No fee for read operations
        maxGas: 200000, // Maximum gas for the read operation
        targetAddress: contractAddress, // Contract address
        targetFunction: functionName, // Function to call
        parameter: formattedParams // Function parameters
      });

      console.log('Read result:', result);
      return result;

    } catch (error) {
      console.error('Error reading from contract:', error);
      // Return mock data for development
      return getMockGreeting();
    }
  };

  // Mock greeting for development
  const getMockGreeting = (): string => {
    return 'Hello, World! (Mock Data)';
  };

  // Set greeting function
  const setGreeting = async () => {
    if (!newGreeting.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a greeting message.' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: '' }));

      // Call the setter function on the smart contract
      const txHash = await callContract('setGreeting', [newGreeting]);
      
      console.log('Greeting set successfully. Transaction hash:', txHash);
      
      // Update the greeting display
      setState(prev => ({
        ...prev,
        greeting: newGreeting,
        isLoading: false
      }));
      
      setNewGreeting('');
      
      // Show success message
      setState(prev => ({ 
        ...prev, 
        error: `Greeting set successfully! Transaction: ${txHash.slice(0, 10)}...` 
      }));

    } catch (error) {
      console.error('Error setting greeting:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to set greeting. Please try again.',
        isLoading: false
      }));
    }
  };

  // Get greeting function
  const getGreeting = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: '' }));

      // Read the greeting from the smart contract
      const result = await readContract('getGreeting', []);
      
      setState(prev => ({
        ...prev,
        greeting: result || 'No greeting found',
        isLoading: false
      }));

    } catch (error) {
      console.error('Error getting greeting:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to get greeting. Please try again.',
        isLoading: false
      }));
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Greeter Smart Contract
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Interact with a simple greeting smart contract on Massa
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wallet Connection */}
        <div className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Wallet Connection</h2>
          
          {!state.isConnected ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-2">Connect your Bearby wallet to interact with the contract</p>
                <p className="text-sm text-gray-400">Contract Address: {formatAddress(contractAddress)}</p>
              </div>
              <button
                onClick={connectWallet}
                disabled={state.isLoading}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {state.isLoading ? 'Connecting...' : 'Connect Bearby'}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 mb-1">✓ Connected to Bearby</p>
                <p className="text-gray-300">Address: {formatAddress(state.walletAddress)}</p>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Contract Interaction */}
        {state.isConnected && (
          <div className="space-y-8">
            {/* Set Greeting */}
            <div className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Set Greeting</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newGreeting" className="block text-sm font-medium text-gray-300 mb-2">
                    New Greeting Message
                  </label>
                  <input
                    type="text"
                    id="newGreeting"
                    value={newGreeting}
                    onChange={(e) => setNewGreeting(e.target.value)}
                    placeholder="Enter your greeting message..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={setGreeting}
                  disabled={state.isLoading || !newGreeting.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {state.isLoading ? 'Setting...' : 'Set Greeting'}
                </button>
              </div>
            </div>

            {/* Get Greeting */}
            <div className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Get Greeting</h3>
              <div className="space-y-4">
                <button
                  onClick={getGreeting}
                  disabled={state.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {state.isLoading ? 'Loading...' : 'Get Greeting'}
                </button>
                
                {state.greeting && (
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Current Greeting:</p>
                    <p className="text-white text-lg font-medium">{state.greeting}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {state.error && (
          <div className="mt-8 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-400">{state.error}</span>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!state.isConnected && (
          <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">How to Use</h3>
            <div className="space-y-2 text-blue-300">
              <p>1. Install the Bearby wallet extension from the Chrome Web Store</p>
              <p>2. Connect your Bearby wallet using the button above</p>
              <p>3. Use the "Set Greeting" function to store a new greeting message</p>
              <p>4. Use the "Get Greeting" function to retrieve the current greeting</p>
              <p className="text-sm text-blue-400 mt-4">
                Note: This demo uses mock data when the contract is not deployed. 
                Replace the contract address with your actual deployed contract address.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 