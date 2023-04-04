import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  firstCommandScore: number;
  secondCommandScore: number;
  period: number;
}

const initialState: CounterState = {
  firstCommandScore: 0,
  secondCommandScore: 0,
  period: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    firstIncrement(state) {
      state.firstCommandScore += 1;
    },
    firstDecrement(state) {
      if (state.firstCommandScore > 0) { state.firstCommandScore -= 1 }
    },
    firstIncrementByAmount(state, action: PayloadAction<number>) {
      state.firstCommandScore += action.payload;
    },
    secondIncrement(state) {
      state.secondCommandScore += 1;
    },
    secondDecrement(state) {
      if (state.secondCommandScore > 0) { state.secondCommandScore -= 1 }
    },
    secondIncrementByAmount(state, action: PayloadAction<number>) {
      state.secondCommandScore += action.payload;
    },
    increasePeriod(state) {
      state.period += 1;
    },
    decreasePeriod(state) {
      if(state.period > 1) state.period -= 1;
    },
  },
});

export const { firstIncrement, firstDecrement, firstIncrementByAmount, secondIncrement, secondDecrement, secondIncrementByAmount, increasePeriod, decreasePeriod } = counterSlice.actions;
export default counterSlice.reducer;
