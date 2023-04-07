import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Match {
  firstCommand: string;
  secondCommand: string;
  isRunning: boolean;
  isPaused: boolean;
  period: number;
  seconds: number;
  minutes: number;
  firstCommandScore: number;
  secondCommandScore: number;
}

const initialState: Match = {
  firstCommand: 'Команда 1',
  secondCommand: 'Команда 2',
  isRunning: false,
  isPaused: false,
  period: 1,
  seconds: 0,
  minutes: 12,
  firstCommandScore: 0,
  secondCommandScore: 0,
};

const matchSlice = createSlice({
  name: 'Match',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstCommand = action.payload;
    },
    setSecondName(state, action: PayloadAction<string>) {
      state.secondCommand = action.payload;
    },
    startMatch(state) {
      state.isRunning = true;
      state.isPaused = false;
    },
    stopMatch(state) {
      state.isRunning = false;
      state.isPaused = false;
    },
    pauseMatch(state) {
      state.isRunning = false;
      state.isPaused = true;
    },
    setPeriod(state, action: PayloadAction<number>) {
      state.period = action.payload;
    },
    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload;
    },
    setMinutes(state, action: PayloadAction<number>) {
      state.minutes = action.payload;
    },
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
      if (state.period > 1) state.period -= 1;
    },
    setMatch(state, action: PayloadAction<Match>) {
      const {
        firstCommand,
        firstCommandScore,
        isPaused,
        isRunning,
        minutes,
        period,
        secondCommand,
        secondCommandScore,
        seconds,
      } = action.payload;

      state.firstCommand = firstCommand;
      state.firstCommandScore = firstCommandScore;
      state.isPaused = isPaused;
      state.isRunning = isRunning;
      state.minutes = minutes;
      state.period = period;
      state.secondCommand = secondCommand;
      state.secondCommandScore = secondCommandScore;
      state.seconds = seconds;
    },
  }
});

export const {
  startMatch,
  stopMatch,
  pauseMatch,
  setPeriod,
  setSeconds,
  setMinutes,
  firstIncrement,
  firstDecrement,
  firstIncrementByAmount,
  secondIncrement,
  secondDecrement,
  secondIncrementByAmount,
  increasePeriod,
  decreasePeriod,
  setFirstName,
  setSecondName,
  setMatch,
} = matchSlice.actions;
export default matchSlice.reducer;
