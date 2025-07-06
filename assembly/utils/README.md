# Counter Smart Contract Example

This directory contains examples demonstrating how to use Args for serialization and deserialization in Massa smart contracts.

## Overview

The counter example shows how to:
- Serialize function arguments using Args
- Deserialize function arguments in smart contracts
- Handle multiple argument types (strings, numbers, booleans)
- Return serialized data from smart contract functions
- Call smart contract functions from TypeScript clients

## Files

- `counter-example.ts` - Complete example showing both TypeScript client code and AssemblyScript smart contract code
- `main.ts` - Placeholder for the actual smart contract implementation

## Key Concepts

### Args Serialization

Args is a utility provided by Massa for handling data serialization and deserialization between smart contracts and clients.

#### Supported Types

- **Native Types**: `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`
- **Strings**: `string`
- **Booleans**: `bool`
- **Arrays**: `Array<T>` where T is a supported type
- **Big Integers**: `u256` (from as-bignum library)

### Serialization Pattern

```typescript
// Client side (TypeScript)
const args = new Args()
  .addString("hello")
  .addU32(42)
  .addBool(true);

const result = await contract.call('myFunction', args);
```

```assemblyscript
// Smart contract side (AssemblyScript)
export function myFunction(argsData: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(argsData);
  const message = args.nextString().expect('Message missing');
  const value = args.nextU32().expect('Value missing');
  const flag = args.nextBool().expect('Flag missing');
  
  // Process the data...
  
  // Return serialized result
  const resultArgs = new Args();
  resultArgs.addString("response");
  resultArgs.addU32(100);
  return resultArgs.serialize();
}
```

### Deserialization Pattern

```typescript
// Client side - deserializing the result
const resultArgs = new Args(result.value);
const response = resultArgs.nextString().expect('Response missing');
const value = resultArgs.nextU32().expect('Value missing');
```

## Counter Functions

The counter example includes the following functions:

### 1. `increment(amount: u32)`
- **Purpose**: Increments the counter by a specified amount
- **Arguments**: `amount` - the value to add to the counter
- **Returns**: The new counter value

### 2. `decrement(amount: u32)`
- **Purpose**: Decrements the counter by a specified amount
- **Arguments**: `amount` - the value to subtract from the counter
- **Returns**: The new counter value (prevents underflow)

### 3. `getValue()`
- **Purpose**: Returns the current counter value
- **Arguments**: None
- **Returns**: The current counter value

### 4. `reset(newValue: u32)`
- **Purpose**: Resets the counter to a specified value
- **Arguments**: `newValue` - the value to set the counter to
- **Returns**: The new counter value

### 5. `getValueWithMessage(message: string)`
- **Purpose**: Returns the counter value with a custom message
- **Arguments**: `message` - a custom message to include
- **Returns**: A formatted string like "Counter Status: 42"

### 6. `complexOperation(operation: string, value1: u32, value2: u32, shouldMultiply: bool)`
- **Purpose**: Demonstrates multiple argument handling
- **Arguments**: 
  - `operation` - the operation to perform ("add", "subtract", "multiply")
  - `value1` - first operand
  - `value2` - second operand
  - `shouldMultiply` - whether to perform multiplication
- **Returns**: An object with result and message

## Usage Examples

### Basic Counter Operations

```typescript
// Initialize counter client
const counterClient = new CounterClient(contractAddress, provider);

// Get current value
const currentValue = await counterClient.getValue();
console.log(`Current value: ${currentValue}`);

// Increment by 5
const newValue = await counterClient.increment(5);
console.log(`After increment: ${newValue}`);

// Decrement by 2
const decrementedValue = await counterClient.decrement(2);
console.log(`After decrement: ${decrementedValue}`);
```

### Complex Operations

```typescript
// Reset to 100
const resetValue = await counterClient.reset(100);

// Get value with custom message
const message = await counterClient.getValueWithMessage("Counter Status");
console.log(message); // "Counter Status: 100"

// Complex operation
const result = await counterClient.complexOperation("add", 10, 20, false);
console.log(`Result: ${result.result}, Message: ${result.message}`);
```

## Error Handling

The examples include proper error handling using `.expect()`:

```assemblyscript
const amount = args.nextU32().expect('Amount argument is missing or invalid');
```

This provides clear error messages when arguments are missing or invalid.

## Best Practices

1. **Order Matters**: Always deserialize arguments in the same order they were serialized
2. **Error Handling**: Use `.expect()` to provide meaningful error messages
3. **Type Safety**: Use the correct type methods (`nextU32()`, `nextString()`, etc.)
4. **Return Values**: Always serialize return values using Args
5. **Multiple Returns**: Use Args to return multiple values from a single function

## Dependencies

To use these examples, you'll need:

- `@massalabs/massa-web3` - For TypeScript client code
- `@massalabs/as-types` - For AssemblyScript smart contract code

## Next Steps

1. Deploy the smart contract to the Massa network
2. Update the contract address in the client code
3. Test the functions with real network calls
4. Add additional functionality as needed 