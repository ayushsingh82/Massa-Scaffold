import { defineChain } from 'viem';

// Massa Mainnet
export const massaMainnet = defineChain({
  id: 7762959,
  name: 'Massa Mainnet',
  nativeCurrency: {
    decimals: 9,
    name: 'MASSA',
    symbol: 'MASSA',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.massa.net/api/v2'],
    },
    public: {
      http: ['https://mainnet.massa.net/api/v2'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Massa Explorer',
      url: 'https://explorer.massa.net',
    },
  },
});

// Massa Testnet
export const massaTestnet = defineChain({
  id: 7762958,
  name: 'Massa Testnet',
  nativeCurrency: {
    decimals: 9,
    name: 'MASSA',
    symbol: 'MASSA',
  },
  rpcUrls: {
    default: {
      http: ['https://test.massa.net/api/v2'],
    },
    public: {
      http: ['https://test.massa.net/api/v2'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Massa Testnet Explorer',
      url: 'https://test.massa.net',
    },
  },
});

// Massa Buildnet
export const massaBuildnet = defineChain({
  id: 7762957,
  name: 'Massa Buildnet',
  nativeCurrency: {
    decimals: 9,
    name: 'MASSA',
    symbol: 'MASSA',
  },
  rpcUrls: {
    default: {
      http: ['https://build.massa.net/api/v2'],
    },
    public: {
      http: ['https://build.massa.net/api/v2'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Massa Buildnet Explorer',
      url: 'https://build.massa.net',
    },
  },
});

// Default chain configuration
export const defaultChains = [massaTestnet, massaBuildnet, massaMainnet];

// Network configuration
export const networkConfig = {
  defaultChain: massaTestnet,
  supportedChains: defaultChains,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
}; 