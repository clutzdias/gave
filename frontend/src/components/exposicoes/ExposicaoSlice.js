import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    status: 'idle'
  };

export const exposicaoSlice = createSlice({
    name: 'exposicao',
    initialState,
    reducers: {
        fillTrabalhos: (state, action) => state + action.payload

    }
})

export const {fillTrabalhos} = exposicaoSlice.actions

export default exposicaoSlice.reducer
