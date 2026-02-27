import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { attendeeService } from '../../services/attendeeService';

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  status: 'initial' | 'loading' | 'success' | 'danger';
  msg: string;
}

const userFromStorage = localStorage.getItem('user');

const initialState: AuthState = {
  isLoggedIn: !!userFromStorage,
  user: userFromStorage,
  status: 'initial',
  msg: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (username: string, { rejectWithValue }) => {
    try {
      const user = await attendeeService.login(username);
      localStorage.setItem('user', user);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await attendeeService.logout();
    localStorage.removeItem('user');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = 'initial';
      state.msg = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.msg = '';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'danger';
        state.msg = action.payload as string || 'Something went wrong!';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.status = 'initial';
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
