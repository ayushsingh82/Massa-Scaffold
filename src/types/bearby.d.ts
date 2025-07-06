declare global {
  interface Window {
    bearby?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
      isConnected: () => boolean;
    };
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isBearby?: boolean;
      connect?: () => Promise<void>;
      enable?: () => Promise<void>;
      getAccounts?: () => Promise<string[]>;
      accounts?: string[];
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
    };
    bearbyWallet?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      connect: () => Promise<void>;
      enable: () => Promise<void>;
      getAccounts: () => Promise<string[]>;
      accounts: string[];
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
    };
    massaWallet?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      connect: () => Promise<void>;
      enable: () => Promise<void>;
      getAccounts: () => Promise<string[]>;
      accounts: string[];
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
    };
  }
}

export {}; 