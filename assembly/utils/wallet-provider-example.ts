// wallet-provider-example.ts - Massa Wallet Provider Integration Example
// This file demonstrates how to properly use the @massalabs/wallet-provider package

/*
// Example 1: Basic Wallet Connection
import { getWallets, WalletName } from "@massalabs/wallet-provider";

async function basicWalletExample() {
  try {
    // Get list of available wallets
    const wallets = await getWallets();
    console.log('Available wallets:', wallets.map(w => w.name()));

    if (wallets.length === 0) {
      console.log("No wallets found");
      return;
    }

    // Use the first available wallet (or prefer Bearby)
    let wallet = wallets[0];
    const bearbyWallet = wallets.find(w => w.name() === WalletName.BEARBY);
    if (bearbyWallet) {
      wallet = bearbyWallet;
    }

    console.log('Selected wallet:', wallet.name());

    // Connect to the wallet
    const connected = await wallet.connect();
    if (!connected) {
      console.log("Failed to connect to wallet");
      return;
    }

    // Get accounts
    const accounts = await wallet.accounts();
    console.log("Accounts:", accounts);

    // Listen for account changes
    const accountListener = wallet.listenAccountChanges((address) => {
      console.log("Account changed:", address);
    });

    // Get network info
    const networkInfo = await wallet.networkInfos();
    console.log("Network info:", networkInfo);

    // Listen for network changes
    const networkListener = wallet.listenNetworkChanges((network) => {
      console.log("Network changed:", network);
    });

    // Disconnect when done
    await wallet.disconnect();

    // Clean up listeners
    accountListener?.remove();
    networkListener?.remove();

  } catch (error) {
    console.error('Wallet operation failed:', error);
  }
}

// Example 2: React Hook for Wallet Integration
import { useState, useEffect, useCallback } from 'react';
import { getWallets, WalletName, Wallet, Provider } from '@massalabs/wallet-provider';

export function useMassaWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [accounts, setAccounts] = useState<Provider[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [networkInfo, setNetworkInfo] = useState<any>(null);

  // Initialize wallet
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const wallets = await getWallets();
        console.log('Available wallets:', wallets.map(w => w.name()));

        if (wallets.length === 0) {
          setError('No wallets found. Please install Bearby or MassaStation.');
          return;
        }

        // Prefer Bearby wallet
        let selectedWallet = wallets.find(w => w.name() === WalletName.BEARBY);
        if (!selectedWallet) {
          selectedWallet = wallets[0];
        }

        setWallet(selectedWallet);
        console.log('Selected wallet:', selectedWallet.name());

        // Check if already connected
        if (selectedWallet.connected()) {
          try {
            const walletAccounts = await selectedWallet.accounts();
            const network = await selectedWallet.networkInfos();
            
            if (walletAccounts.length > 0) {
              setIsConnected(true);
              setAccounts(walletAccounts);
              setNetworkInfo(network);
            }
          } catch (error) {
            console.log('No existing connection found:', error);
          }
        }

        // Set up listeners
        const accountListener = selectedWallet.listenAccountChanges((address: string) => {
          console.log('Account changed:', address);
          // Update accounts list
          selectedWallet.accounts().then(setAccounts);
        });

        const networkListener = selectedWallet.listenNetworkChanges((network: string) => {
          console.log('Network changed:', network);
          selectedWallet.networkInfos().then(setNetworkInfo);
        });

        // Cleanup on unmount
        return () => {
          accountListener?.remove();
          networkListener?.remove();
        };

      } catch (error) {
        console.error('Failed to initialize wallet:', error);
        setError('Failed to initialize wallet.');
      }
    };

    initializeWallet();
  }, []);

  // Connect to wallet
  const connect = useCallback(async () => {
    if (!wallet) {
      setError('Wallet not available.');
      return false;
    }

    try {
      setIsConnecting(true);
      setError('');

      const connected = await wallet.connect();
      if (!connected) {
        setError('Failed to connect to wallet.');
        return false;
      }

      const accounts = await wallet.accounts();
      const network = await wallet.networkInfos();

      if (accounts.length > 0) {
        setIsConnected(true);
        setAccounts(accounts);
        setNetworkInfo(network);
        console.log('Connected to wallet:', accounts[0].address());
        return true;
      } else {
        setError('No accounts found in wallet.');
        return false;
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setError('Connection failed. Please try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [wallet]);

  // Disconnect from wallet
  const disconnect = useCallback(async () => {
    if (!wallet) return false;

    try {
      const disconnected = await wallet.disconnect();
      if (disconnected) {
        setIsConnected(false);
        setAccounts([]);
        setNetworkInfo(null);
        console.log('Disconnected from wallet');
      }
      return disconnected;
    } catch (error) {
      console.error('Disconnection failed:', error);
      return false;
    }
  }, [wallet]);

  // Get account balance
  const getBalance = useCallback(async (address?: string) => {
    if (!wallet || !isConnected) {
      throw new Error('Wallet not connected');
    }

    const targetAddress = address || accounts[0]?.address();
    if (!targetAddress) {
      throw new Error('No address available');
    }

    try {
      // This would depend on the specific wallet implementation
      // You might need to use a different method based on the wallet
      const balance = await wallet.getBalance?.(targetAddress);
      return balance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }, [wallet, isConnected, accounts]);

  return {
    wallet,
    accounts,
    isConnected,
    isConnecting,
    error,
    networkInfo,
    connect,
    disconnect,
    getBalance
  };
}

// Example 3: Wallet Provider with Error Handling
export class WalletManager {
  private wallet: Wallet | null = null;
  private accountListener: any = null;
  private networkListener: any = null;

  async initialize() {
    try {
      const wallets = await getWallets();
      
      if (wallets.length === 0) {
        throw new Error('No wallets found. Please install Bearby or MassaStation.');
      }

      // Prefer Bearby
      this.wallet = wallets.find(w => w.name() === WalletName.BEARBY) || wallets[0];
      console.log('Initialized wallet:', this.wallet.name());

      // Set up listeners
      this.setupListeners();

      return this.wallet;
    } catch (error) {
      console.error('Wallet initialization failed:', error);
      throw error;
    }
  }

  private setupListeners() {
    if (!this.wallet) return;

    this.accountListener = this.wallet.listenAccountChanges((address: string) => {
      console.log('Account changed:', address);
      // Emit custom event or update state
      this.onAccountChange?.(address);
    });

    this.networkListener = this.wallet.listenNetworkChanges((network: string) => {
      console.log('Network changed:', network);
      // Emit custom event or update state
      this.onNetworkChange?.(network);
    });
  }

  async connect(): Promise<boolean> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      const connected = await this.wallet.connect();
      if (connected) {
        const accounts = await this.wallet.accounts();
        console.log('Connected with accounts:', accounts.map(a => a.address()));
      }
      return connected;
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<boolean> {
    if (!this.wallet) return false;

    try {
      const disconnected = await this.wallet.disconnect();
      if (disconnected) {
        console.log('Disconnected from wallet');
      }
      return disconnected;
    } catch (error) {
      console.error('Disconnection failed:', error);
      throw error;
    }
  }

  async getAccounts(): Promise<Provider[]> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    return await this.wallet.accounts();
  }

  async getNetworkInfo() {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    return await this.wallet.networkInfos();
  }

  isConnected(): boolean {
    return this.wallet?.connected() || false;
  }

  isEnabled(): boolean {
    return this.wallet?.enabled() || false;
  }

  cleanup() {
    this.accountListener?.remove();
    this.networkListener?.remove();
  }

  // Event handlers (can be overridden)
  onAccountChange?: (address: string) => void;
  onNetworkChange?: (network: string) => void;
}

// Example 4: Usage in a Component
export function WalletConnectComponent() {
  const {
    wallet,
    accounts,
    isConnected,
    isConnecting,
    error,
    networkInfo,
    connect,
    disconnect
  } = useMassaWallet();

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
    <div className="wallet-connect">
      <div className="wallet-status">
        <h3>Wallet Status</h3>
        <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p>Wallet: {wallet?.name() || 'None'}</p>
        {networkInfo && (
          <p>Network: {networkInfo.name || 'Unknown'}</p>
        )}
      </div>

      <div className="wallet-accounts">
        <h3>Accounts</h3>
        {accounts.length > 0 ? (
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>
                {formatAddress(account.address())}
              </li>
            ))}
          </ul>
        ) : (
          <p>No accounts connected</p>
        )}
      </div>

      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="connect-button"
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </div>
  );
}

// Example 5: Contract Interaction with Wallet
export async function interactWithContract(
  wallet: Wallet,
  contractAddress: string,
  functionName: string,
  args: any[]
) {
  if (!wallet.connected()) {
    throw new Error('Wallet not connected');
  }

  try {
    // This is a simplified example - actual implementation would depend on
    // the specific contract interaction library you're using
    const accounts = await wallet.accounts();
    const fromAddress = accounts[0].address();

    // Example contract call (this would be replaced with actual contract interaction)
    const transaction = {
      from: fromAddress,
      to: contractAddress,
      data: encodeFunctionCall(functionName, args)
    };

    // Send transaction through wallet
    const result = await wallet.sendTransaction?.(transaction);
    return result;
  } catch (error) {
    console.error('Contract interaction failed:', error);
    throw error;
  }
}

// Helper function for encoding function calls (simplified)
function encodeFunctionCall(functionName: string, args: any[]): string {
  // This would use a proper ABI encoder in a real implementation
  return `0x${functionName}${args.map(arg => arg.toString(16)).join('')}`;
}
*/

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("Wallet provider example - see comments for implementation details");
} 