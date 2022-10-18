import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersReducer';

const store = configureStore({
  reducer: {
    usersData: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
