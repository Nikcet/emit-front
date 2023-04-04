import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Компонент (редьюсер), который обрабатывает actions и изменяет state хранилища

// Тип хранимого значения стором
interface Command {
  firstName: string;
  secondName: string;
}

const initialState: Command = {
  firstName: '',
  secondName: '',
};

const commandsNamesSlice = createSlice({
  name: 'commandsNames',
  initialState,
  reducers: {
    setFirstName(state,  action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setSecondName(state, action: PayloadAction<string>) {
        state.secondName = action.payload;
    }
  },
});

export const { setFirstName, setSecondName } = commandsNamesSlice.actions;
export default commandsNamesSlice.reducer;
