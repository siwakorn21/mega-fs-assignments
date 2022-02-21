import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import web3Reducer from '../features/web3/web3Slice';
import alertPopupReducer from '../features/alertPopup/alertPopupSlice';

export const store = configureStore({
    reducer: {
        web3: web3Reducer,
        alertPopup: alertPopupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
