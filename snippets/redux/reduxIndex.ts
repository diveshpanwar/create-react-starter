import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Usage in Components
 *
 * import { useSelector, useDispatch } from 'react-redux';
 * import { RootState } from "./store";
 * import { increment, setCounter } from "./store/slices/counterSLice";
 *
 * const count = useSelector((state: RootState) => state.counterReducer.count);
 * const dispatch = useDispatch()
 *
 * dispatch(increment()) or dispatch(setCounter(10))
 *
 */
