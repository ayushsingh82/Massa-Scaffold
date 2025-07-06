// config.ts - Massa Starter Kit Configuration
// This file contains all configuration settings for the Massa dApp

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  chainId: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface AppConfig {
  name: string;
  version: string;
  description: string;
  networks: {
    buildnet: NetworkConfig;
    testnet: NetworkConfig;
    mainnet: NetworkConfig;
  };
  defaultNetwork: keyof AppConfig['networks'];
  contractAddresses: {
    [key: string]: string;
  };
  api: {
    timeout: number;
    retries: number;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
}

// Massa Network Configurations
export const MASSA_NETWORKS: AppConfig['networks'] = {
  buildnet: {
    name: 'Massa Buildnet',
    rpcUrl: 'https://buildnet.massa.net/api/v2',
    explorerUrl: 'https://buildnet-explorer.massa.net',
    chainId: 'buildnet',
    currency: {
      name: 'Massa',
      symbol: 'MAS',
      decimals: 9,
    },
  },
  testnet: {
    name: 'Massa Testnet',
    rpcUrl: 'https://test.massa.net/api/v2',
    explorerUrl: 'https://test-explorer.massa.net',
    chainId: 'testnet',
    currency: {
      name: 'Massa',
      symbol: 'MAS',
      decimals: 9,
    },
  },
  mainnet: {
    name: 'Massa Mainnet',
    rpcUrl: 'https://mainnet.massa.net/api/v2',
    explorerUrl: 'https://explorer.massa.net',
    chainId: 'mainnet',
    currency: {
      name: 'Massa',
      symbol: 'MAS',
      decimals: 9,
    },
  },
};

// Application Configuration
export const APP_CONFIG: AppConfig = {
  name: 'Massa Scaffold',
  version: '1.0.0',
  description: 'A modern starter kit for building decentralized applications on the Massa blockchain',
  networks: MASSA_NETWORKS,
  defaultNetwork: 'buildnet',
  contractAddresses: {
    // Add your deployed contract addresses here
    counter: '',
    masToken: '',
    serializable: '',
    constructor: '',
  },
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
  },
  ui: {
    theme: 'auto',
    language: 'en',
  },
};

// Smart Contract Configuration
export const CONTRACT_CONFIG = {
  // Gas limits for different operations
  gasLimits: {
    deploy: 1000000,
    call: 100000,
    transfer: 50000,
  },
  
  // Default deployment settings
  deployment: {
    coins: '0.01', // Initial MAS allocation to contract
    maxGas: 1000000,
  },
  
  // Storage configuration
  storage: {
    maxKeyLength: 64,
    maxValueLength: 1024 * 1024, // 1MB
  },
};

// Wallet Configuration
export const WALLET_CONFIG = {
  // Supported wallet providers
  providers: ['bearby', 'massaStation'],
  
  // Default wallet settings
  defaultProvider: 'bearby',
  
  // Connection timeout
  connectionTimeout: 10000, // 10 seconds
  
  // Auto-connect settings
  autoConnect: true,
  autoConnectTimeout: 5000, // 5 seconds
};

// Development Configuration
export const DEV_CONFIG = {
  // Development mode settings
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Debug settings
  debug: {
    enabled: process.env.NODE_ENV === 'development',
    logLevel: 'info' as 'error' | 'warn' | 'info' | 'debug',
  },
  
  // Testing configuration
  testing: {
    mockNetwork: false,
    mockContracts: false,
  },
};

// Environment Variables
export const ENV_CONFIG = {
  // Required environment variables
  required: ['MASSA_PRIVATE_KEY'],
  
  // Optional environment variables
  optional: ['MASSA_NETWORK', 'MASSA_CONTRACT_ADDRESS'],
  
  // Environment variable validation
  validate: () => {
    const missing = ENV_CONFIG.required.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  },
};

// Utility Functions
export const CONFIG_UTILS = {
  // Get current network configuration
  getCurrentNetwork: (): NetworkConfig => {
    const networkName = process.env.MASSA_NETWORK || APP_CONFIG.defaultNetwork;
    return APP_CONFIG.networks[networkName as keyof AppConfig['networks']];
  },
  
  // Get contract address
  getContractAddress: (contractName: string): string => {
    return APP_CONFIG.contractAddresses[contractName] || '';
  },
  
  // Check if running in development mode
  isDevelopment: (): boolean => {
    return DEV_CONFIG.isDevelopment;
  },
  
  // Get API configuration
  getApiConfig: () => {
    return {
      ...APP_CONFIG.api,
      baseUrl: CONFIG_UTILS.getCurrentNetwork().rpcUrl,
    };
  },
  
  // Get explorer URL for transaction
  getExplorerUrl: (txHash: string): string => {
    const network = CONFIG_UTILS.getCurrentNetwork();
    return `${network.explorerUrl}/transaction/${txHash}`;
  },
  
  // Get explorer URL for address
  getAddressExplorerUrl: (address: string): string => {
    const network = CONFIG_UTILS.getCurrentNetwork();
    return `${network.explorerUrl}/address/${address}`;
  },
};

// Export default configuration
export default APP_CONFIG;
