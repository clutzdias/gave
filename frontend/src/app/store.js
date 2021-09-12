import { configureStore } from '@reduxjs/toolkit';
import ExposicaoReducer from '../components/exposicoes/ExposicaoSlice';

export const store = configureStore({
  reducer: {
    exposicao: ExposicaoReducer,
  },
});
