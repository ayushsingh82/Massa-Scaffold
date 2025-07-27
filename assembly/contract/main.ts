import { generateEvent, Storage, Context, Args } from "@massalabs/massa-as-sdk";

// Keys for storage
const GREETING_KEY = "greeting_key";
const VALUE_KEY = "value_key";

// Constructor: initializes both greeting and value
export function constructor(args: StaticArray<u8>): void {
  assert(Context.isDeployingContract(), "Can only be called at deployment");
  const argParser = new Args(args);

  // Initialize greeting (string)
  const initialGreeting = argParser.nextString().expect("Missing greeting");
  Storage.set(GREETING_KEY, initialGreeting);

  // Initialize value (u32)
  const initialValue = argParser.nextU32().expect("Missing initial value");
  Storage.set(VALUE_KEY, initialValue.toString());

  generateEvent("Greeting and Value initialized");
}

// Greeter: get and set functions
export function greet(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(GREETING_KEY);
}

export function setGreeting(args: StaticArray<u8>): void {
  const newGreeting = new Args(args).nextString().expect("Missing new greeting");
  Storage.set(GREETING_KEY, newGreeting);
  generateEvent(`Greeting updated to: ${newGreeting}`);
}

// Setter: get and set functions
export function getValue(_: StaticArray<u8>): StaticArray<u8> {
  return Storage.get(VALUE_KEY);
}

export function setValue(args: StaticArray<u8>): void {
  const newValue = new Args(args).nextU32().expect("Missing new value");
  Storage.set(VALUE_KEY, newValue.toString());
  generateEvent(`Value updated to: ${newValue}`);
}
