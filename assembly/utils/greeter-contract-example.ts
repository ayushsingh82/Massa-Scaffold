// greeter-contract-example.ts - Greeter Smart Contract Example
// This file demonstrates a simple greeter smart contract with setter and getter functions

/*
// AssemblyScript Smart Contract Code (to be deployed)
import { Storage, Context, Args, Result, Address } from '@massalabs/as-types';

// Contract state
const GREETING_KEY = 'greeting';
const OWNER_KEY = 'owner';

// Initialize the contract
export function init(): void {
  // Set the contract creator as the owner
  const owner = Context.caller();
  Storage.set(OWNER_KEY, owner);
  
  // Set default greeting
  Storage.set(GREETING_KEY, 'Hello, World!');
  
  console.log('Greeter contract initialized by:', owner);
}

// Set a new greeting (only owner can call this)
export function setGreeting(args: Args): Result {
  // Check if caller is the owner
  const owner = Storage.get(OWNER_KEY);
  if (Context.caller() !== owner) {
    return Result.error('Only the owner can set the greeting');
  }

  // Get the new greeting from arguments
  const newGreeting = args.nextString();
  if (!newGreeting) {
    return Result.error('Greeting message is required');
  }

  // Store the new greeting
  Storage.set(GREETING_KEY, newGreeting);
  
  console.log('Greeting updated to:', newGreeting);
  return Result.success();
}

// Get the current greeting
export function getGreeting(): Result {
  const greeting = Storage.get(GREETING_KEY);
  if (!greeting) {
    return Result.error('No greeting found');
  }
  
  return Result.success(greeting);
}

// Get the contract owner
export function getOwner(): Result {
  const owner = Storage.get(OWNER_KEY);
  if (!owner) {
    return Result.error('No owner found');
  }
  
  return Result.success(owner);
}

// Transfer ownership to a new address
export function transferOwnership(args: Args): Result {
  // Check if caller is the current owner
  const owner = Storage.get(OWNER_KEY);
  if (Context.caller() !== owner) {
    return Result.error('Only the owner can transfer ownership');
  }

  // Get the new owner address
  const newOwner = args.nextString();
  if (!newOwner) {
    return Result.error('New owner address is required');
  }

  // Update the owner
  Storage.set(OWNER_KEY, newOwner);
  
  console.log('Ownership transferred to:', newOwner);
  return Result.success();
}

// Get contract information
export function getContractInfo(): Result {
  const owner = Storage.get(OWNER_KEY);
  const greeting = Storage.get(GREETING_KEY);
  
  const info = {
    owner: owner || 'Unknown',
    greeting: greeting || 'No greeting set',
    contractAddress: Context.contractAddress()
  };
  
  return Result.success(JSON.stringify(info));
}
*/

// TypeScript Client Code for interacting with the Greeter contract
export class GreeterContractClient {
  private contractAddress: string;
  private web3: any;

  constructor(contractAddress: string, web3: any) {
    this.contractAddress = contractAddress;
    this.web3 = web3;
  }

  // Call smart contract function
  private async callContract(
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

  // Read from smart contract
  private async readContract(
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
      // Return mock data for development
      return this.getMockData(functionName);
    }
  }

  // Mock data for development
  private getMockData(functionName: string): any {
    console.log('Using mock data for:', functionName);
    
    switch (functionName) {
      case 'getGreeting':
        return 'Hello, World! (Mock Data)';
      case 'getOwner':
        return 'AS1234...abcd (Mock Owner)';
      case 'getContractInfo':
        return JSON.stringify({
          owner: 'AS1234...abcd (Mock Owner)',
          greeting: 'Hello, World! (Mock Data)',
          contractAddress: this.contractAddress
        });
      default:
        return null;
    }
  }

  // Public API methods

  // Set a new greeting
  async setGreeting(greeting: string): Promise<string> {
    if (!greeting.trim()) {
      throw new Error('Greeting message is required');
    }

    return await this.callContract('setGreeting', [greeting]);
  }

  // Get the current greeting
  async getGreeting(): Promise<string> {
    return await this.readContract('getGreeting', []);
  }

  // Get the contract owner
  async getOwner(): Promise<string> {
    return await this.readContract('getOwner', []);
  }

  // Transfer ownership
  async transferOwnership(newOwner: string): Promise<string> {
    if (!newOwner.trim()) {
      throw new Error('New owner address is required');
    }

    return await this.callContract('transferOwnership', [newOwner]);
  }

  // Get contract information
  async getContractInfo(): Promise<any> {
    const result = await this.readContract('getContractInfo', []);
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }
}

// React Hook for Greeter Contract
export function useGreeterContract(contractAddress: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');
  const [owner, setOwner] = useState('');
  const [contractInfo, setContractInfo] = useState<any>(null);

  const client = new GreeterContractClient(contractAddress, web3);

  // Set greeting
  const setGreeting = async (newGreeting: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      const txHash = await client.setGreeting(newGreeting);
      console.log('Greeting set successfully. Transaction hash:', txHash);
      
      // Update the greeting display
      setGreeting(newGreeting);
      
      return txHash;
    } catch (error) {
      console.error('Error setting greeting:', error);
      setError('Failed to set greeting. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get greeting
  const getGreeting = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const result = await client.getGreeting();
      setGreeting(result);
      
      return result;
    } catch (error) {
      console.error('Error getting greeting:', error);
      setError('Failed to get greeting. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get owner
  const getOwner = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const result = await client.getOwner();
      setOwner(result);
      
      return result;
    } catch (error) {
      console.error('Error getting owner:', error);
      setError('Failed to get owner. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get contract info
  const getContractInfo = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const result = await client.getContractInfo();
      setContractInfo(result);
      
      return result;
    } catch (error) {
      console.error('Error getting contract info:', error);
      setError('Failed to get contract info. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    greeting,
    owner,
    contractInfo,
    setGreeting,
    getGreeting,
    getOwner,
    getContractInfo
  };
}

// Usage Example
export async function exampleUsage() {
  const contractAddress = 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT'; // Replace with actual contract
  const client = new GreeterContractClient(contractAddress, web3);

  try {
    // Get current greeting
    const currentGreeting = await client.getGreeting();
    console.log('Current greeting:', currentGreeting);

    // Set new greeting
    const txHash = await client.setGreeting('Hello from TypeScript!');
    console.log('Greeting set. Transaction hash:', txHash);

    // Get updated greeting
    const newGreeting = await client.getGreeting();
    console.log('New greeting:', newGreeting);

    // Get contract info
    const info = await client.getContractInfo();
    console.log('Contract info:', info);

  } catch (error) {
    console.error('Contract interaction failed:', error);
  }
}

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("Greeter contract example - see comments for implementation details");
} 