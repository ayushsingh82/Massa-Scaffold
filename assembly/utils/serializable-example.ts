// serializable-example.ts - Generic Serializable Types Example
// This file demonstrates how to use Serializable interface for custom data types in Massa smart contracts

// Example AssemblyScript smart contract with Serializable types
/*
// users.ts (AssemblyScript)
import { Args, stringToBytes, Result, Serializable } from '@massalabs/as-types';
import { Storage } from '@massalabs/massa-as-sdk';

// User class implementing Serializable
export class User implements Serializable {
  constructor(public name: string = '', public age: u8 = 0, public email: string = '') {}

  // Serialize user data to bytes for storage
  serialize(): StaticArray<u8> {
    return new Args().add(this.name).add(this.age).add(this.email).serialize();
  }

  // Deserialize user data from bytes
  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);
    this.name = args.nextString().expect("Can't deserialize name.");
    this.age = args.nextU8().expect("Can't deserialize age.");
    this.email = args.nextString().expect("Can't deserialize email.");
    return new Result(args.offset);
  }
}

// Product class implementing Serializable
export class Product implements Serializable {
  constructor(
    public id: string = '',
    public name: string = '',
    public price: u64 = 0,
    public inStock: bool = false
  ) {}

  serialize(): StaticArray<u8> {
    return new Args()
      .add(this.id)
      .add(this.name)
      .add(this.price)
      .add(this.inStock)
      .serialize();
  }

  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);
    this.id = args.nextString().expect("Can't deserialize product id.");
    this.name = args.nextString().expect("Can't deserialize product name.");
    this.price = args.nextU64().expect("Can't deserialize product price.");
    this.inStock = args.nextBool().expect("Can't deserialize product stock status.");
    return new Result(args.offset);
  }
}

// Order class implementing Serializable
export class Order implements Serializable {
  constructor(
    public orderId: string = '',
    public customerId: string = '',
    public products: Array<Product> = [],
    public totalAmount: u64 = 0,
    public status: string = 'pending'
  ) {}

  serialize(): StaticArray<u8> {
    return new Args()
      .add(this.orderId)
      .add(this.customerId)
      .add(this.products)
      .add(this.totalAmount)
      .add(this.status)
      .serialize();
  }

  deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);
    this.orderId = args.nextString().expect("Can't deserialize order id.");
    this.customerId = args.nextString().expect("Can't deserialize customer id.");
    this.products = args.nextSerializableObjectArray<Product>().expect("Can't deserialize products.");
    this.totalAmount = args.nextU64().expect("Can't deserialize total amount.");
    this.status = args.nextString().expect("Can't deserialize order status.");
    return new Result(args.offset);
  }
}
*/

// Main contract file with Serializable usage
/*
// main.ts (AssemblyScript)
import { Args, stringToBytes } from '@massalabs/as-types';
import { Storage } from '@massalabs/massa-as-sdk';
import { User, Product, Order } from './users';

// Add a single user
export function addUser(binArgs: StaticArray<u8>): void {
  const args = new Args(binArgs);
  const name = args.nextString().expect('Unable to decode user name');
  const age = args.nextU8().expect('Unable to decode user age');
  const email = args.nextString().expect('Unable to decode user email');
  const id = args.nextString().expect('Unable to decode user id');
  
  const userKey = stringToBytes(id);
  assert(!Storage.has(userKey), 'User already exists');

  // Create user serializable
  const user = new User(name, age, email);
  // Store serialized User
  Storage.set(userKey, user.serialize());
}

// Get a single user
export function getUser(binArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binArgs);
  const id = args.nextString().expect('Unable to decode user id');
  const userKey = stringToBytes(id);
  assert(Storage.has(userKey), 'User not found');

  return Storage.get(userKey);
}

// Add multiple users at once
export function addUsers(binArgs: StaticArray<u8>): void {
  const users = new Args(binArgs)
    .nextSerializableObjectArray<User>()
    .expect('Unable to decode users');
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userKey = stringToBytes(user.name);
    assert(!Storage.has(userKey), 'User already exists');
    Storage.set(userKey, user.serialize());
  }
}

// Add a product
export function addProduct(binArgs: StaticArray<u8>): void {
  const args = new Args(binArgs);
  const id = args.nextString().expect('Unable to decode product id');
  const name = args.nextString().expect('Unable to decode product name');
  const price = args.nextU64().expect('Unable to decode product price');
  const inStock = args.nextBool().expect('Unable to decode product stock status');
  
  const productKey = stringToBytes(`product_${id}`);
  assert(!Storage.has(productKey), 'Product already exists');

  const product = new Product(id, name, price, inStock);
  Storage.set(productKey, product.serialize());
}

// Get a product
export function getProduct(binArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binArgs);
  const id = args.nextString().expect('Unable to decode product id');
  const productKey = stringToBytes(`product_${id}`);
  assert(Storage.has(productKey), 'Product not found');

  return Storage.get(productKey);
}

// Create an order
export function createOrder(binArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binArgs);
  const orderId = args.nextString().expect('Unable to decode order id');
  const customerId = args.nextString().expect('Unable to decode customer id');
  const products = args.nextSerializableObjectArray<Product>().expect('Unable to decode products');
  const status = args.nextString().expect('Unable to decode order status');
  
  // Calculate total amount
  let totalAmount: u64 = 0;
  for (let i = 0; i < products.length; i++) {
    totalAmount += products[i].price;
  }
  
  const order = new Order(orderId, customerId, products, totalAmount, status);
  const orderKey = stringToBytes(`order_${orderId}`);
  
  Storage.set(orderKey, order.serialize());
  return order.serialize();
}

// Get an order
export function getOrder(binArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binArgs);
  const orderId = args.nextString().expect('Unable to decode order id');
  const orderKey = stringToBytes(`order_${orderId}`);
  assert(Storage.has(orderKey), 'Order not found');

  return Storage.get(orderKey);
}

// Update order status
export function updateOrderStatus(binArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binArgs);
  const orderId = args.nextString().expect('Unable to decode order id');
  const newStatus = args.nextString().expect('Unable to decode new status');
  
  const orderKey = stringToBytes(`order_${orderId}`);
  assert(Storage.has(orderKey), 'Order not found');

  // Deserialize existing order
  const orderData = Storage.get(orderKey);
  const order = new Order();
  order.deserialize(orderData, 0);
  
  // Update status
  order.status = newStatus;
  
  // Store updated order
  Storage.set(orderKey, order.serialize());
  return order.serialize();
}
*/

// TypeScript client implementation
/*
// user.ts (TypeScript)
import {
  Args,
  IDeserializedResult,
  ISerializable,
} from '@massalabs/massa-web3';

export class User implements ISerializable<User> {
  constructor(
    public name: string = '',
    public age: number = 0,
    public email: string = ''
  ) {}

  serialize(): Uint8Array {
    const data = new Args()
      .addString(this.name)
      .addU8(BigInt(this.age))
      .addString(this.email)
      .serialize();
    return new Uint8Array(data);
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<User> {
    const args = new Args(data, offset);

    this.name = args.nextString();
    this.age = Number(args.nextU8());
    this.email = args.nextString();

    return { instance: this, offset: args.getOffset() };
  }
}

export class Product implements ISerializable<Product> {
  constructor(
    public id: string = '',
    public name: string = '',
    public price: number = 0,
    public inStock: boolean = false
  ) {}

  serialize(): Uint8Array {
    const data = new Args()
      .addString(this.id)
      .addString(this.name)
      .addU64(BigInt(this.price))
      .addBool(this.inStock)
      .serialize();
    return new Uint8Array(data);
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<Product> {
    const args = new Args(data, offset);

    this.id = args.nextString();
    this.name = args.nextString();
    this.price = Number(args.nextU64());
    this.inStock = args.nextBool();

    return { instance: this, offset: args.getOffset() };
  }
}

export class Order implements ISerializable<Order> {
  constructor(
    public orderId: string = '',
    public customerId: string = '',
    public products: Product[] = [],
    public totalAmount: number = 0,
    public status: string = 'pending'
  ) {}

  serialize(): Uint8Array {
    const data = new Args()
      .addString(this.orderId)
      .addString(this.customerId)
      .addSerializableObjectArray(this.products)
      .addU64(BigInt(this.totalAmount))
      .addString(this.status)
      .serialize();
    return new Uint8Array(data);
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<Order> {
    const args = new Args(data, offset);

    this.orderId = args.nextString();
    this.customerId = args.nextString();
    this.products = args.nextSerializableObjectArray(Product);
    this.totalAmount = Number(args.nextU64());
    this.status = args.nextString();

    return { instance: this, offset: args.getOffset() };
  }
}
*/

// Client usage example
/*
// serializable-client.ts (TypeScript)
import { SmartContract, JsonRpcProvider, Account } from '@massalabs/massa-web3';
import { User, Product, Order } from './user';

export class SerializableClient {
  private contract: SmartContract;

  constructor(contractAddress: string, provider: JsonRpcProvider) {
    this.contract = new SmartContract(provider, contractAddress);
  }

  // Add a single user
  async addUser(user: User): Promise<void> {
    const args = new Args()
      .addString(user.name)
      .addU8(BigInt(user.age))
      .addString(user.email)
      .addString(user.name); // Using name as ID for simplicity
    
    await this.contract.call('addUser', args);
  }

  // Add multiple users
  async addUsers(users: User[]): Promise<void> {
    const args = new Args().addSerializableObjectArray(users);
    await this.contract.call('addUsers', args);
  }

  // Get a user
  async getUser(id: string): Promise<User> {
    const args = new Args().addString(id);
    const result = await this.contract.call('getUser', args);
    
    const user = new User();
    user.deserialize(result.value, 0);
    return user;
  }

  // Add a product
  async addProduct(product: Product): Promise<void> {
    const args = new Args()
      .addString(product.id)
      .addString(product.name)
      .addU64(BigInt(product.price))
      .addBool(product.inStock);
    
    await this.contract.call('addProduct', args);
  }

  // Get a product
  async getProduct(id: string): Promise<Product> {
    const args = new Args().addString(id);
    const result = await this.contract.call('getProduct', args);
    
    const product = new Product();
    product.deserialize(result.value, 0);
    return product;
  }

  // Create an order
  async createOrder(order: Order): Promise<Order> {
    const args = new Args()
      .addString(order.orderId)
      .addString(order.customerId)
      .addSerializableObjectArray(order.products)
      .addString(order.status);
    
    const result = await this.contract.call('createOrder', args);
    
    const createdOrder = new Order();
    createdOrder.deserialize(result.value, 0);
    return createdOrder;
  }

  // Get an order
  async getOrder(orderId: string): Promise<Order> {
    const args = new Args().addString(orderId);
    const result = await this.contract.call('getOrder', args);
    
    const order = new Order();
    order.deserialize(result.value, 0);
    return order;
  }

  // Update order status
  async updateOrderStatus(orderId: string, newStatus: string): Promise<Order> {
    const args = new Args().addString(orderId).addString(newStatus);
    const result = await this.contract.call('updateOrderStatus', args);
    
    const order = new Order();
    order.deserialize(result.value, 0);
    return order;
  }
}

// Example usage
export async function exampleUsage() {
  const account = await Account.fromEnv();
  const provider = JsonRpcProvider.buildnet(account);
  
  const client = new SerializableClient("<deployed_contract_address>", provider);
  
  try {
    // Add a single user
    const user = new User("Alice", 25, "alice@example.com");
    await client.addUser(user);
    
    // Add multiple users
    const users = [
      new User("Bob", 30, "bob@example.com"),
      new User("Charlie", 35, "charlie@example.com")
    ];
    await client.addUsers(users);
    
    // Add products
    const product1 = new Product("P1", "Laptop", 1000, true);
    const product2 = new Product("P2", "Mouse", 50, true);
    await client.addProduct(product1);
    await client.addProduct(product2);
    
    // Create an order
    const order = new Order("O1", "Alice", [product1, product2], 0, "pending");
    const createdOrder = await client.createOrder(order);
    console.log(`Order created with total: ${createdOrder.totalAmount}`);
    
    // Update order status
    const updatedOrder = await client.updateOrderStatus("O1", "shipped");
    console.log(`Order status updated to: ${updatedOrder.status}`);
    
  } catch (error) {
    console.error('Error using serializable types:', error);
  }
}
*/

// Benefits and best practices
/*
Benefits of using Serializable Types:
1. Flexibility: Create custom data types that can be stored and retrieved efficiently
2. Data Integrity: Control how data is represented and validated
3. Reusability: Use serializable types across different parts of the contract
4. Type Safety: Ensure consistent data structure handling
5. Complex Data: Handle nested objects and arrays easily

Best Practices:
1. Always implement both serialize() and deserialize() methods
2. Use meaningful error messages in .expect() calls
3. Handle arrays of serializable objects properly
4. Consider data validation in deserialize methods
5. Use consistent naming conventions for storage keys
6. Test serialization/deserialization thoroughly
*/

// Placeholder export for TypeScript compatibility
export function placeholder(): void {
  console.log("Serializable example - see comments for implementation details");
} 