import { combineReducers } from '@reduxjs/toolkit';
// import counterReducer from './features/counterSlice';
import commandsScoreCounter from './features/commandsScoreSlice';
import isGameState from './features/isGameSlice';
import commandsNamesStore from './features/commandsNames';

// Перечисление редьюсеров
const rootReducer = combineReducers({
    counter: commandsScoreCounter,
    isGameReducer: isGameState,
    commandsNames: commandsNamesStore,
});

export default rootReducer;
