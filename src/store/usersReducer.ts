import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api';

type UsersData = {
  users: User[];
  isLoadingUsers: boolean;
  fromPage: number;
  isLastPage: boolean;
};

const initialState: UsersData = {
  users: [],
  isLoadingUsers: true,
  fromPage: 0,
  isLastPage: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users.push(...action.payload);
    },
    // nextPage: (state) => {
    //   state.fromPage = (+state.fromPage + 1).toString()
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(addUsersFromServer.pending, (state) => {
      state.isLoadingUsers = true;
    });

    builder.addCase(addUsersFromServer.fulfilled, (state, action) => {
      if (action.meta.arg === 1) {
        state.fromPage = 1;
        state.users = action.payload.users;
      } else {
        state.users.push(...action.payload.users);
      }
      state.fromPage += 1;
      state.isLastPage = !!action.payload.links.next_url;
      state.isLoadingUsers = false;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;

export const addUsersFromServer = createAsyncThunk(
  'users/fetch',
  (page: number) => {
    return getUsers(page.toString());
  }
);
