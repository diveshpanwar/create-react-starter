import { create } from "zustand";

// Define the type for the store's state
type CounterStoreState = {
  count: number;
};

type CounterStoreAction = {
  increment: () => void;
  decrement: () => void;
};

type CounterStore = CounterStoreState & CounterStoreAction;

export const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
