import { generateEvent, Storage, Context, Args } from "@massalabs/massa-as-sdk";

// Storage keys
const GREETING_KEY = "greeting_key";
const VALUE_KEY = "value_key";
const COUNTER_KEY = "counter_key";

// Constructor: initializes greeting, value, and counter
export function constructor(args: StaticArray<u8>): void {
  assert(Context.isDeployingContract(), "Can only be called at deployment");
  const argParser = new Args(args);

  // Greeting (string)
  const initialGreeting = argParser.nextString().expect("Missing greeting");
  Storage.set(GREETING_KEY, initialGreeting);

  // Value (u32)
  const initialValue = argParser.nextU32().expect("Missing initial value");
  Storage.set(VALUE_KEY, initialValue.toString());

  // Counter (i32, allows for increments+decrements)
  const initialCounter = argParser.nextI32().expect("Missing initial counter");
  Storage.set(COUNTER_KEY, initialCounter.toString());

  generateEvent("Greeting, Value, and Counter initialized");
}

// Greeter functions
export function greet(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(GREETING_KEY);
}

export function setGreeting(args: StaticArray<u8>): void {
  const newGreeting = new Args(args).nextString().expect("Missing new greeting");
  Storage.set(GREETING_KEY, newGreeting);
  generateEvent(`Greeting updated to: ${newGreeting}`);
}

// Setter functions
export function getValue(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(VALUE_KEY);
}

export function setValue(args: StaticArray<u8>): void {
  const newValue = new Args(args).nextU32().expect("Missing new value");
  Storage.set(VALUE_KEY, newValue.toString());
  generateEvent(`Value updated to: ${newValue}`);
}

// Counter functions
export function getCounter(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(COUNTER_KEY);
}

export function increment(_: StaticArray<u8>): void {
  let current = I32.parseInt(Storage.get(COUNTER_KEY).toString());
  current += 1;
  Storage.set(COUNTER_KEY, current.toString());
  generateEvent(`Counter incremented to: ${current}`);
}

export function decrement(_: StaticArray<u8>): void {
  let current = I32.parseInt(Storage.get(COUNTER_KEY).toString());
  current -= 1;
  Storage.set(COUNTER_KEY, current.toString());
  generateEvent(`Counter decremented to: ${current}`);
}
