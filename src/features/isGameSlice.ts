import { createSlice } from '@reduxjs/toolkit';
// Компонент (редьюсер), который обрабатывает actions и изменяет state хранилища

// Тип хранимого значения стором
interface isGame {
  isGame: boolean;
}

const initialState: isGame = {
  isGame: false,
};

const isGameSlice = createSlice({
  name: 'isStartGame',
  initialState,
  reducers: {
    startGame(state) {
      state.isGame = true;
    },
    endGame(state) {
      state.isGame = false;
    },
  },
});

export const { startGame, endGame } = isGameSlice.actions;
export default isGameSlice.reducer;
