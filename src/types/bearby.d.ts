declare global {
  interface Window {
    bearby?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (data: unknown) => void) => void;
      removeListener: (event: string, callback: (data: unknown) => void) => void;
      isConnected: () => boolean;
    };
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      isBearby?: boolean;
      connect?: () => Promise<void>;
      enable?: () => Promise<void>;
      getAccounts?: () => Promise<string[]>;
      accounts?: string[];
      on: (event: string, callback: (data: unknown) => void) => void;
      removeListener: (event: string, callback: (data: unknown) => void) => void;
    };
    bearbyWallet?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      connect: () => Promise<void>;
      enable: () => Promise<void>;
      getAccounts: () => Promise<string[]>;
      accounts: string[];
      on: (event: string, callback: (data: unknown) => void) => void;
      removeListener: (event: string, callback: (data: unknown) => void) => void;
    };
    massaWallet?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      connect: () => Promise<void>;
      enable: () => Promise<void>;
      getAccounts: () => Promise<string[]>;
      accounts: string[];
      on: (event: string, callback: (data: unknown) => void) => void;
      removeListener: (event: string, callback: (data: unknown) => void) => void;
    };
  }
}

export {}; 