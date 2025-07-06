# Massa Smart Contract Examples

This directory contains comprehensive examples demonstrating key concepts for building smart contracts on the Massa blockchain. These examples are designed to help developers understand and implement common patterns in Massa smart contract development.

## 📁 File Structure

```
assembly/utils/
├── MAIN_README.md              # This comprehensive guide
├── README.md                   # Counter example documentation
├── counter-example.ts          # Args serialization with counter contract
├── constructor-example.ts      # Constructor implementation with parameters
├── mas-token-example.ts        # MAS token interactions
└── serializable-example.ts     # Generic Serializable types
```

## 🚀 Quick Start

### Prerequisites

- Node.js and npm installed
- Massa Web3 library: `npm install @massalabs/massa-web3`
- Massa AS Types (for AssemblyScript): `npm install @massalabs/as-types`
- Massa AS SDK: `npm install @massalabs/massa-as-sdk`

### Basic Setup

1. **Install Dependencies**
   ```bash
   npm install @massalabs/massa-web3 @massalabs/massa-as-sdk
   ```

2. **Environment Setup**
   ```bash
   # Create .env file with your private key
   echo "MASSA_PRIVATE_KEY=your_private_key_here" > .env
   ```

3. **Compile Smart Contracts**
   ```bash
   # Build AssemblyScript contracts
   npm run build
   ```

## 📚 Examples Overview

### 1. Counter Example (`counter-example.ts`)

**Purpose**: Demonstrates basic Args serialization and deserialization patterns.

**Key Concepts**:
- Function argument serialization using `Args`
- Return value deserialization
- Multiple argument handling
- Error handling with `.expect()`

**Functions**:
- `increment(amount)` - Add to counter
- `decrement(amount)` - Subtract from counter
- `getValue()` - Get current value
- `reset(newValue)` - Reset counter
- `getValueWithMessage(message)` - Get value with custom message
- `complexOperation(operation, value1, value2, shouldMultiply)` - Multiple arguments

**Usage**:
```typescript
const counterClient = new CounterClient(contractAddress, provider);
const newValue = await counterClient.increment(5);
console.log(`New value: ${newValue}`);
```

### 2. Constructor Example (`constructor-example.ts`)

**Purpose**: Shows how to implement constructors with parameters for contract initialization.

**Key Concepts**:
- Constructor function implementation
- Deployment-time parameter handling
- Storage initialization
- Deployment script creation

**Features**:
- Multiple parameter types (string, u32, address)
- Deployment validation
- Storage setup
- TypeScript deployment client

**Usage**:
```typescript
const constructorArgs = new Args()
  .addString("Welcome to Massa!")
  .addU32(100)
  .addString("AS1HhJKL2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5");

const contract = await SmartContract.deploy(
  provider,
  byteCode,
  constructorArgs,
  { coins: Mas.fromString('0.01') }
);
```

### 3. MAS Token Example (`mas-token-example.ts`)

**Purpose**: Demonstrates how to interact with MAS tokens in smart contracts.

**Key Concepts**:
- Receiving MAS tokens with function calls
- Checking balances (contract and addresses)
- Sending MAS tokens to other addresses
- Access control for token operations

**Functions**:
- `receiveTokens()` - Receive MAS with function call
- `getContractBalance()` - Get contract's MAS balance
- `getAddressBalance(address)` - Get any address balance
- `sendTokens(toAddress, amount)` - Send MAS from contract
- `withdrawTokens(toAddress, amount)` - Owner-only withdrawal

**Usage**:
```typescript
const masClient = new MasTokenClient(contractAddress, provider);

// Send 10 MAS to contract
const received = await masClient.sendTokensToContract('10');

// Get contract balance
const balance = await masClient.getContractBalance();
```

### 4. Serializable Example (`serializable-example.ts`)

**Purpose**: Shows how to create custom data types that can be serialized and stored.

**Key Concepts**:
- Implementing `Serializable` interface
- Custom class serialization/deserialization
- Arrays of serializable objects
- Complex data structure handling

**Classes**:
- `User` - Basic user information
- `Product` - Product with price and stock
- `Order` - Complex order with products array

**Features**:
- Nested object serialization
- Array handling
- Type-safe data structures
- Client-side TypeScript implementations

**Usage**:
```typescript
const client = new SerializableClient(contractAddress, provider);

// Add user
const user = new User("Alice", 25, "alice@example.com");
await client.addUser(user);

// Create order with products
const order = new Order("O1", "Alice", [product1, product2], 0, "pending");
const createdOrder = await client.createOrder(order);
```

## 🔧 Development Patterns

### Args Serialization Pattern

**Client Side (TypeScript)**:
```typescript
const args = new Args()
  .addString("hello")
  .addU32(42)
  .addBool(true);

const result = await contract.call('myFunction', args);
```

**Smart Contract Side (AssemblyScript)**:
```assemblyscript
export function myFunction(argsData: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(argsData);
  const message = args.nextString().expect('Message missing');
  const value = args.nextU32().expect('Value missing');
  const flag = args.nextBool().expect('Flag missing');
  
  // Process data...
  
  const resultArgs = new Args();
  resultArgs.addString("response");
  resultArgs.addU32(100);
  return resultArgs.serialize();
}
```

### Error Handling

Always use `.expect()` for meaningful error messages:
```assemblyscript
const amount = args.nextU32().expect('Amount argument is missing or invalid');
```

### Storage Patterns

**Simple Storage**:
```assemblyscript
Storage.set("key", value);
const value = Storage.get("key");
```

**Serializable Storage**:
```assemblyscript
const user = new User(name, age, email);
Storage.set(userKey, user.serialize());

const userData = Storage.get(userKey);
const user = new User();
user.deserialize(userData, 0);
```

## 🛠️ Best Practices

### 1. **Function Design**
- Always validate input parameters
- Use meaningful error messages
- Return serialized data consistently
- Handle edge cases (underflow, overflow, etc.)

### 2. **Storage Management**
- Use consistent key naming conventions
- Check for existence before operations
- Clean up unused data when possible
- Consider storage costs

### 3. **Security**
- Implement access control for sensitive operations
- Validate all external inputs
- Use `assert()` for critical conditions
- Consider reentrancy attacks

### 4. **Gas Optimization**
- Minimize storage operations
- Use efficient data structures
- Batch operations when possible
- Avoid unnecessary computations

### 5. **Testing**
- Test all function paths
- Verify serialization/deserialization
- Test edge cases and error conditions
- Use integration tests for complex flows

## 📦 Deployment

### 1. **Compile Contracts**
```bash
npm run build
```

### 2. **Deploy with Constructor**
```typescript
import { deployContract } from './constructor-example';

const contract = await deployContract();
console.log(`Deployed at: ${contract.address}`);
```

### 3. **Interact with Deployed Contract**
```typescript
import { CounterClient } from './counter-example';

const client = new CounterClient(contract.address, provider);
const value = await client.getValue();
```

## 🔗 Useful Resources

- [Massa Documentation](https://docs.massa.net)
- [Massa Web3 Library](https://github.com/massalabs/massa-web3)
- [AssemblyScript Guide](https://www.assemblyscript.org/)
- [Massa Network](https://massa.net)

## 🐛 Troubleshooting

### Common Issues

1. **Serialization Errors**
   - Ensure argument order matches between client and contract
   - Use correct type methods (`nextU32()`, `nextString()`, etc.)
   - Check for missing `.expect()` calls

2. **Deployment Failures**
   - Verify sufficient MAS balance
   - Check constructor argument types
   - Ensure bytecode is properly compiled

3. **Storage Issues**
   - Verify storage keys are consistent
   - Check for existence before operations
   - Ensure proper serialization format

### Debug Tips

1. **Use Console Logs**
   ```assemblyscript
   console.log(`Processing: ${value}`);
   ```

2. **Validate Data**
   ```assemblyscript
   assert(value > 0, 'Value must be positive');
   ```

3. **Test Incrementally**
   - Start with simple functions
   - Add complexity gradually
   - Test each component separately

## 🤝 Contributing

When adding new examples:

1. Follow the existing code structure
2. Include comprehensive comments
3. Provide both AssemblyScript and TypeScript examples
4. Add usage examples
5. Update this README

## 📄 License

This project is part of the Massa Scaffold starter kit. See the main project license for details.

---

**Happy Building on Massa! 🚀** 