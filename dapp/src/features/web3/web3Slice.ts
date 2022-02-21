import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { RootState } from '../../app/store';

interface Web3State {
    web3: Web3;
}

const initialState: Web3State = {
    web3: new Web3(Web3.givenProvider),
};

export const web3Slice = createSlice({
    name: 'Web3Slice',
    initialState,
    reducers: {
        setWeb3: (state, action: PayloadAction<Web3>) => {
            state.web3 = action.payload;
        },
    },
});

export const { setWeb3 } = web3Slice.actions;

export const selectWeb3State = (state: RootState) => state.web3;

export default web3Slice.reducer;
