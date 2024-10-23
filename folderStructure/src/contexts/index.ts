import { createContext } from "react";

// Define the shape of the context's state
interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create the context with default values
export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);
