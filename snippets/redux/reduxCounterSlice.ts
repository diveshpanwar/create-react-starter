import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConterStoreType = {
  count: number;
};

const initialState: ConterStoreType = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    setCounter: (state, payload: PayloadAction<number>) => {
      return {
        ...state,
        count: payload.payload,
      };
    },
  },
});

export const { setCounter, increment } = counterSlice.actions;

export default counterSlice.reducer;
