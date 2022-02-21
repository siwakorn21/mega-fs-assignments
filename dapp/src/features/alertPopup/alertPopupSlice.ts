import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AlertPopupState {
    open: boolean;
    transaction: string | undefined;
}

const initialState: AlertPopupState = {
    open: false,
    transaction: undefined,
};

export const alertPopupSlice = createSlice({
    name: 'alertPopup',
    initialState,
    reducers: {
        setOpenAlertPopup: (
            state,
            action: PayloadAction<{ open: boolean; transaction: string }>
        ) => {
            state.open = action.payload.open;
            state.transaction = action.payload.transaction;
        },
        setTransactionAlertPopup: (
            state,
            action: PayloadAction<string | undefined>
        ) => {
            state.transaction = action.payload;
        },
        closeAlertPopup: (state) => {
            state.open = false;
            state.transaction = undefined;
        },
    },
});

export const { setOpenAlertPopup, setTransactionAlertPopup, closeAlertPopup } =
    alertPopupSlice.actions;

export const selectAlertPopupState = (state: RootState) => state.alertPopup;

export default alertPopupSlice.reducer;
