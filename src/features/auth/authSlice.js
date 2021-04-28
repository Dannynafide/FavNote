import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';

export const signInAsync = createAsyncThunk(
  'auth/signInAsync',
  async (args) => {
    const response = await auth().signInWithEmailAndPassword(
      args.email,
      args.password
    );

    return {
      id: response.user.uid,
      email: response.user.email,
      refreshToken: response.user.refreshToken,
    };
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signInAsync',
  async (args) => {
    const response = await auth().createUserWithEmailAndPassword(
      args.email,
      args.password
    );

    return {
      id: response.user.uid,
      email: response.user.email,
      refreshToken: response.user.refreshToken,
    };
  }
);

export const signOutAsync = createAsyncThunk('auth/signOutAsync', async () => {
  const result = await auth().signOut();
  localStorage.removeItem('authUser');
  return result;
});

export const STATUS = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: STATUS.idle,
    error: null, // string | null
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.status = STATUS.succeeded;
    },
    signOut: (state) => {
      state.user = null;
      state.status = STATUS.idle;
    },
  },
  extraReducers: {
    [signInAsync.pending || signUpAsync.pending]: (state) => {
      state.error = null;
      state.status = STATUS.loading;
    },
    [signInAsync.fulfilled || signUpAsync.fulfilled]: (state, action) => {
      state.error = null;
      state.user = action.payload;
      state.status = STATUS.succeeded;
    },
    [signInAsync.rejected]: (state, action) => {
      if (action.error && action.error.code) {
        state.error = 'Invalid email or password!';
      } else {
        state.error = 'Error occurred during login';
      }
      state.status = STATUS.failed;
    },
    [signUpAsync.rejected]: (state) => {
      state.error = 'Error occurred during register';
      state.status = STATUS.failed;
    },

    [signOutAsync.pending]: (state) => {
      state.error = null;
      state.status = STATUS.loading;
    },
    [signOutAsync.fulfilled]: (state) => {
      state.error = null;
      state.user = null;
      state.status = STATUS.idle;
    },
    [signOutAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.status = STATUS.failed;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
