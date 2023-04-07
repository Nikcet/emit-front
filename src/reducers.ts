import { combineReducers } from '@reduxjs/toolkit';
// import counterReducer from './features/counterSlice';
// import commandsScoreCounter from './features/commandsScoreSlice';
import matchState from './features/matchSlice';
// import commandsNamesStore from './features/commandsNames';

// Перечисление редьюсеров
const rootReducer = combineReducers({
    // counter: commandsScoreCounter,
    matchState: matchState,
    // commandsNames: commandsNamesStore,
});

export default rootReducer;
