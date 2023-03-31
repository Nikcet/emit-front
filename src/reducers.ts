import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import isGameReducer from './features/isGameSlice';

// Перечисление редьюсеров
const rootReducer = combineReducers({
    counter: counterReducer,
    isGameReducer,
});

export default rootReducer;
