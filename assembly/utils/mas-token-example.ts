// mas-token-example.ts - MAS Token Interactions Example
// This file demonstrates how to interact with MAS tokens in Massa smart contracts

// Example AssemblyScript smart contract with MAS token interactions
/*
// main.ts (AssemblyScript)
import { Args, Storage, Context } from "@massalabs/as-types";
import { 
  transferredCoins, 
  balance, 
  balanceOf, 
  transferCoins, 
  Address 
} from '@massalabs/massa-as-sdk';

// Function to receive MAS tokens
export function receiveTokens(): StaticArray<u8> {
  const receivedAmount = transferredCoins();
  assert(receivedAmount > 0, 'No MAS tokens were sent.');
  
  // Store the received amount
  const currentBalance = balance();
  Storage.set("lastReceived", u64ToBytes(receivedAmount));
  Storage.set("totalBalance", u64ToBytes(currentBalance));
  
  // Return the received amount
  return u64ToBytes(receivedAmount);
}

// Function to get contract's current balance
export function getContractBalance(): StaticArray<u8> {
  const contractBalance = Context.balance();
  return u64ToBytes(contractBalance);
}

// Function to get balance of a specific address
export function getAddressBalance(argsData: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(argsData);
  const address = args.nextString().expect('Address parameter missing or invalid');
  
  const addressBalance = balanceOf(address);
  return u64ToBytes(addressBalance);
}

// Function to send MAS tokens to another address
export function sendTokens(argsData: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(argsData);
  const toAddress = args.nextString().expect('Recipient address missing or invalid');
  const amount = args.nextU64().expect('Amount missing or invalid');
  
  const contractBalance = balance();
  assert(contractBalance >= amount, 'Insufficient balance to send MAS tokens');
  
  // Create Address object
  const recipientAddress = new Address(toAddress);
  
  // Transfer the tokens
  transferCoins(recipientAddress, amount);
  
  // Return the new contract balance
  const newBalance = balance();
  return u64ToBytes(newBalance);
}

// Function to withdraw tokens (only owner can call)
export function withdrawTokens(argsData: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(argsData);
  const toAddress = args.nextString().expect('Recipient address missing or invalid');
  const amount = args.nextU64().expect('Amount missing or invalid');
  
  // Check if caller is the owner (you would implement your own ownership logic)
  const owner = Storage.get("owner");
  assert(Context.caller() == owner, 'Only owner can withdraw tokens');
  
  const contractBalance = balance();
  assert(contractBalance >= amount, 'Insufficient balance to withdraw tokens');
  
  const recipientAddress = new Address(toAddress);
  transferCoins(recipientAddress, amount);
  
  return u64ToBytes(balance());
}

// Function to get the last received amount
export function getLastReceived(): StaticArray<u8> {
  const lastReceived = Storage.get("lastReceived");
  return lastReceived;
}

// Function to get total balance from storage
export function getTotalBalance(): StaticArray<u8> {
  const totalBalance = Storage.get("totalBalance");
  return totalBalance;
}
*/

// TypeScript client example for interacting with MAS token functions
/*
// mas-token-client.ts (TypeScript)
import {
  Account,
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
  bytesToU64,
  bytesToStr
} from '@massalabs/massa-web3';

export class MasTokenClient {
  private contract: SmartContract;
  private provider: JsonRpcProvider;

  constructor(contractAddress: string, provider: JsonRpcProvider) {
    this.contract = new SmartContract(provider, contractAddress);
    this.provider = provider;
  }

  // Send MAS tokens to the contract
  async sendTokensToContract(amount: string): Promise<number> {
    const masAmount = Mas.fromString(amount);
    const result = await this.contract.call(
      'receiveTokens',
      undefined, // No arguments needed
      { coins: masAmount }
    );
    return Number(bytesToU64(result.value));
  }

  // Get contract's balance
  async getContractBalance(): Promise<number> {
    const result = await this.contract.call('getContractBalance', new Args());
    return Number(bytesToU64(result.value));
  }

  // Get balance of a specific address
  async getAddressBalance(address: string): Promise<number> {
    const args = new Args().addString(address);
    const result = await this.contract.call('getAddressBalance', args);
    return Number(bytesToU64(result.value));
  }

  // Send tokens from contract to another address
  async sendTokensFromContract(toAddress: string, amount: number): Promise<number> {
    const args = new Args().addString(toAddress).addU64(BigInt(amount));
    const result = await this.contract.call('sendTokens', args);
    return Number(bytesToU64(result.value));
  }

  // Withdraw tokens (owner only)
  async withdrawTokens(toAddress: string, amount: number): Promise<number> {
    const args = new Args().addString(toAddress).addU64(BigInt(amount));
    const result = await this.contract.call('withdrawTokens', args);
    return Number(bytesToU64(result.value));
  }

  // Get last received amount
  async getLastReceived(): Promise<number> {
    const result = await this.contract.call('getLastReceived', new Args());
    return Number(bytesToU64(result.value));
  }

  // Get total balance from storage
  async getTotalBalance(): Promise<number> {
    const result = await this.contract.call('getTotalBalance', new Args());
    return Number(bytesToU64(result.value));
  }
}

// Example usage
export async function exampleUsage() {
  const account = await Account.fromEnv();
  const provider = JsonRpcProvider.buildnet(account);
  
  const masClient = new MasTokenClient("<deployed_contract_address>", provider);
  
  try {
    // Send 10 MAS to the contract
    const received = await masClient.sendTokensToContract('10');
    console.log(`Received ${received} MAS in contract`);
    
    // Get contract balance
    const balance = await masClient.getContractBalance();
    console.log(`Contract balance: ${balance} MAS`);
    
    // Get balance of a specific address
    const addressBalance = await masClient.getAddressBalance("AS1HhJKL2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5");
    console.log(`Address balance: ${addressBalance} MAS`);
    
    // Send 5 MAS from contract to another address
    const newBalance = await masClient.sendTokensFromContract("AS1HhJKL2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5", 5);
    console.log(`New contract balance after sending: ${newBalance} MAS`);
    
    // Get last received amount
    const lastReceived = await masClient.getLastReceived();
    console.log(`Last received amount: ${lastReceived} MAS`);
    
  } catch (error) {
    console.error('Error interacting with MAS token contract:', error);
  }
}
*/

// Important notes about MAS token interactions
/*
Key Points:
1. All contract functions are payable by default in Massa
2. Use transferredCoins() to get the amount sent with the call
3. Use balance() to get the contract's current balance
4. Use balanceOf(address) to get balance of any address
5. Use transferCoins(address, amount) to send tokens from contract
6. Always check sufficient balance before transferring
7. Consider implementing access control for sensitive operations
*/

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("MAS token example - see comments for implementation details");
} 