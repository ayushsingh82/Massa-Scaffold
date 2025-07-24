// bearby-integration-example.ts - Bearby Integration Example using @hicaru/bearby.js
// This file demonstrates how to properly integrate with Bearby wallet using the correct package

/*
// Example 1: Basic Bearby Integration
import { web3 } from '@hicaru/bearby.js';

export class BearbyWalletManager {
  private web3: any;

  constructor() {
    this.web3 = web3;
  }

  // Check if Bearby is installed
  isBearbyInstalled(): boolean {
    try {
      return this.web3.wallet.installed;
    } catch (error) {
      console.error('Error checking Bearby installation:', error);
      return false;
    }
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    try {
      return this.web3.wallet.connected;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  }

  // Connect to Bearby wallet
  async connectWallet(): Promise<string | null> {
    try {
      if (!this.isBearbyInstalled()) {
        throw new Error('Bearby wallet is not installed. Please install the Bearby extension from the Chrome Web Store.');
      }

      console.log('Attempting wallet connection...');
      
      const connected = await this.web3.wallet.connect();
      console.log('Connection result:', connected);
      
      if (connected && this.web3.wallet.account?.base58) {
        const address = this.web3.wallet.account.base58;
        console.log('Wallet connected successfully:', address);
        return address;
      }

      console.warn('Connection failed or no account available');
      return null;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  }

  // Disconnect from Bearby wallet
  async disconnectWallet(): Promise<void> {
    try {
      await this.web3.wallet.disconnect();
      console.log('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }

  // Get current wallet address
  getWalletAddress(): string | null {
    try {
      if (!this.isWalletConnected()) return null;
      return this.web3.wallet.account?.base58 || null;
    } catch (error) {
      console.error('Error getting wallet address:', error);
      return null;
    }
  }

  // Get wallet account info
  getWalletAccount() {
    try {
      if (!this.isWalletConnected()) return null;
      return this.web3.wallet.account;
    } catch (error) {
      console.error('Error getting wallet account:', error);
      return null;
    }
  }
}

// Example 2: React Hook for Bearby Integration
import { useState, useEffect, useCallback } from 'react';
import { web3 } from '@hicaru/bearby.js';

export function useBearbyWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [account, setAccount] = useState<any>(null);

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = () => {
      try {
        if (web3.wallet.installed && web3.wallet.connected && web3.wallet.account?.base58) {
          setIsConnected(true);
          setWalletAddress(web3.wallet.account.base58);
          setAccount(web3.wallet.account);
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

  // Connect to wallet
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError('');

      if (!web3.wallet.installed) {
        setError('Bearby wallet is not installed. Please install the Bearby extension from the Chrome Web Store.');
        return false;
      }

      console.log('Attempting wallet connection...');
      
      const connected = await web3.wallet.connect();
      console.log('Connection result:', connected);
      
      if (connected && web3.wallet.account?.base58) {
        const address = web3.wallet.account.base58;
        setIsConnected(true);
        setWalletAddress(address);
        setAccount(web3.wallet.account);
        console.log('Connected to Bearby wallet:', address);
        return true;
      } else {
        setError('Failed to connect to Bearby wallet or no account available.');
        return false;
      }
    } catch (error) {
      console.error('Failed to connect to Bearby wallet:', error);
      setError('Failed to connect to Bearby wallet. Please try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect from wallet
  const disconnect = useCallback(async () => {
    try {
      await web3.wallet.disconnect();
      setIsConnected(false);
      setWalletAddress('');
      setAccount(null);
      setError('');
      console.log('Disconnected from Bearby wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }, []);

  return {
    isConnected,
    walletAddress,
    isConnecting,
    error,
    account,
    connect,
    disconnect,
    isBearbyInstalled: () => web3.wallet.installed
  };
}

// Example 3: Contract Interaction with Bearby
export class BearbyContractManager {
  private web3: any;
  private contractAddress: string;

  constructor(contractAddress: string) {
    this.web3 = web3;
    this.contractAddress = contractAddress;
  }

  // Call a smart contract function
  async callContract(
    functionName: string,
    parameters: any[] = [],
    coins: number = 0
  ): Promise<string> {
    try {
      if (!this.web3.wallet.connected) {
        throw new Error('Wallet not connected');
      }

      console.log('Calling contract function:', functionName, 'with parameters:', parameters);

      // Convert parameters to the correct format for Bearby
      const formattedParams = parameters.map((param) => {
        if (typeof param === 'string') {
          return {
            type: this.web3.contract.types.STRING,
            value: param
          };
        } else if (typeof param === 'number') {
          return {
            type: this.web3.contract.types.U64,
            value: param
          };
        } else if (typeof param === 'boolean') {
          return {
            type: this.web3.contract.types.BOOL,
            value: param
          };
        } else {
          // Default to string representation
          return {
            type: this.web3.contract.types.STRING,
            value: String(param)
          };
        }
      });

      // Call the smart contract using Bearby Web3
      const txHash = await this.web3.contract.call({
        fee: 0, // Transaction fee
        maxGas: 2000000, // Maximum gas for the function call
        coins: coins, // Coins to attach to the function call
        targetAddress: this.contractAddress, // Contract address
        functionName: functionName, // Function to call
        parameters: formattedParams // Function parameters
      });

      console.log('Transaction hash:', txHash);
      return txHash;

    } catch (error) {
      console.error('Error calling contract:', error);
      throw error;
    }
  }

  // Read from smart contract (no transaction required)
  async readContract(
    functionName: string,
    parameters: any[] = []
  ): Promise<any> {
    try {
      console.log('Reading from contract function:', functionName, 'with parameters:', parameters);

      // Convert parameters to the correct format for Bearby
      const formattedParams = parameters.map((param) => {
        if (typeof param === 'string') {
          return {
            type: this.web3.contract.types.STRING,
            value: param
          };
        } else if (typeof param === 'number') {
          return {
            type: this.web3.contract.types.U64,
            value: param
          };
        } else if (typeof param === 'boolean') {
          return {
            type: this.web3.contract.types.BOOL,
            value: param
          };
        } else {
          return {
            type: this.web3.contract.types.STRING,
            value: String(param)
          };
        }
      });

      // Read from the smart contract using Bearby Web3
      const result = await this.web3.contract.readSmartContract({
        fee: 0, // No fee for read operations
        maxGas: 200000, // Maximum gas for the read operation
        targetAddress: this.contractAddress, // Contract address
        targetFunction: functionName, // Function to call
        parameter: formattedParams // Function parameters
      });

      console.log('Read result:', result);
      return result;

    } catch (error) {
      console.error('Error reading from contract:', error);
      throw error;
    }
  }
}

// Example 4: Usage in a Component
export function BearbyWalletComponent() {
  const {
    isConnected,
    walletAddress,
    isConnecting,
    error,
    account,
    connect,
    disconnect,
    isBearbyInstalled
  } = useBearbyWallet();

  const formatAddress = (address: string) => {
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
    <div className="bearby-wallet">
      <div className="wallet-status">
        <h3>Bearby Wallet Status</h3>
        <p>Installed: {isBearbyInstalled() ? 'Yes' : 'No'}</p>
        <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
        {account && (
          <p>Account: {formatAddress(account.base58)}</p>
        )}
      </div>

      <button
        onClick={handleConnect}
        disabled={isConnecting || !isBearbyInstalled()}
        className="connect-button"
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect Bearby'}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </div>
  );
}

// Example 5: Contract Interaction Example
export async function interactWithCounterContract() {
  const contractAddress = 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT'; // Replace with actual contract
  const contractManager = new BearbyContractManager(contractAddress);

  try {
    // Read current counter value
    const currentValue = await contractManager.readContract('getValue', []);
    console.log('Current counter value:', currentValue);

    // Increment counter
    const txHash = await contractManager.callContract('increment', [5], 0);
    console.log('Increment transaction hash:', txHash);

    return { currentValue, txHash };
  } catch (error) {
    console.error('Contract interaction failed:', error);
    throw error;
  }
}

// Example 6: Utility Functions
export const BearbyUtils = {
  // Check if Bearby is available
  isBearbyAvailable: (): boolean => {
    try {
      return web3.wallet.installed;
    } catch (error) {
      return false;
    }
  },

  // Get wallet address
  getWalletAddress: (): string | null => {
    try {
      if (!web3.wallet.connected) return null;
      return web3.wallet.account?.base58 || null;
    } catch (error) {
      return null;
    }
  },

  // Format address for display
  formatAddress: (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Convert nanoMAS to MAS
  nanoMastoMAS: (nanoMAS: number): number => {
    return nanoMAS / 1_000_000_000;
  },

  // Convert MAS to nanoMAS
  mastoNanoMAS: (mas: number): number => {
    return Math.floor(mas * 1_000_000_000);
  }
};
*/

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("Bearby integration example - see comments for implementation details");
} 