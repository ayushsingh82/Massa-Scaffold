# Wallet Commands Documentation

## Installation

To install @massalabs/wallet-provider, add it to your project via npm:

```bash
npm install @massalabs/wallet-provider
```

## Wallet Usage Example

Here's a basic example of how to use the Wallet interface with Bearby wallet:

```typescript
import { getWallets } from "@massalabs/wallet-provider";

async function walletExample() {
  // Get list of available wallets
  const wallets = await getWallets();

  if (wallets.length === 0) {
    console.log("No wallets found");
    return;
  }

  // Use the first available wallet (Bearby)
  const wallet = wallets[0];

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
  wallet.listenAccountChanges((address) => {
    console.log("Account changed:", address);
  });

  // Get network info
  const networkInfo = await wallet.networkInfos();
  console.log("Network info:", networkInfo);

  // Disconnect when done
  await wallet.disconnect();
}

walletExample().catch(console.error);
```

## Wallet Methods

Here's a detailed explanation of each method in the Wallet interface, along with their availability in Bearby wallet:

### Core Methods

| Method | Description | Bearby Support |
|--------|-------------|----------------|
| `name(): WalletName` | Returns the name of the wallet | ✅ |
| `accounts(): Promise<Provider[]>` | Retrieves the list of accounts | ✅ |
| `networkInfos(): Promise<Network>` | Gets current network information | ✅ |
| `connect(): Promise<boolean>` | Initiates connection to wallet | ✅ |
| `disconnect(): Promise<boolean>` | Disconnects from wallet | ✅ |
| `connected(): boolean` | Returns connection status | ✅ |
| `enabled(): boolean` | Returns if wallet is enabled | ✅ |

### Listener Methods

| Method | Description | Bearby Support |
|--------|-------------|----------------|
| `listenAccountChanges(callback)` | Listens for account changes | ✅ |
| `listenNetworkChanges(callback)` | Listens for network changes | ✅ |

### Account Management (Not Available in Bearby)

| Method | Description | Bearby Support |
|--------|-------------|----------------|
| `importAccount(publicKey, privateKey)` | Imports account | ❌ |
| `deleteAccount(address)` | Deletes account | ❌ |
| `generateNewAccount(name)` | Generates new account | ❌ |

## Bearby Wallet-Specific Notes

### ✅ Supported Features
- Full connection management (connect, disconnect, status)
- Account retrieval and monitoring
- Network information and monitoring
- Event listeners for account and network changes

### ❌ Not Supported
- Account import/export
- Account deletion
- Account generation within the wallet

### Best Practices for Bearby

1. **Always check connection status** before performing operations
2. **Handle connection failures** gracefully
3. **Use listeners** for real-time updates
4. **Provide clear user feedback** for unsupported operations

## Error Handling

```typescript
async function safeWalletOperation() {
  try {
    const wallets = await getWallets();
    const wallet = wallets[0];
    
    if (!wallet.enabled()) {
      throw new Error("Wallet not enabled");
    }
    
    const connected = await wallet.connect();
    if (!connected) {
      throw new Error("Failed to connect");
    }
    
    // Perform wallet operations...
    
  } catch (error) {
    console.error("Wallet operation failed:", error);
    // Handle error appropriately
  }
}
```

## React Hook Example

```typescript
import { useState, useEffect } from 'react';
import { getWallets } from "@massalabs/wallet-provider";

export function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function initializeWallet() {
      try {
        const wallets = await getWallets();
        if (wallets.length > 0) {
          const walletInstance = wallets[0];
          setWallet(walletInstance);
          
          // Set up listeners
          walletInstance.listenAccountChanges((address) => {
            console.log("Account changed:", address);
          });
          
          walletInstance.listenNetworkChanges((network) => {
            console.log("Network changed:", network);
          });
        }
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
      }
    }
    
    initializeWallet();
  }, []);

  const connect = async () => {
    if (!wallet) return false;
    
    try {
      const connected = await wallet.connect();
      if (connected) {
        const accounts = await wallet.accounts();
        setAccounts(accounts);
        setIsConnected(true);
      }
      return connected;
    } catch (error) {
      console.error("Connection failed:", error);
      return false;
    }
  };

  const disconnect = async () => {
    if (!wallet) return false;
    
    try {
      const disconnected = await wallet.disconnect();
      if (disconnected) {
        setAccounts([]);
        setIsConnected(false);
      }
      return disconnected;
    } catch (error) {
      console.error("Disconnection failed:", error);
      return false;
    }
  };

  return {
    wallet,
    accounts,
    isConnected,
    connect,
    disconnect
  };
}
```

## Integration with Massa Scaffold

This wallet provider is integrated into the Massa Scaffold project and can be used in:

1. **Navbar** - Connect/disconnect wallet
2. **Counter Page** - Demonstrate wallet integration
3. **Custom Components** - Build wallet-aware features

Remember to handle errors appropriately in your actual implementation, as wallet operations can fail due to various reasons such as user rejection, network issues, or wallet-specific limitations. 