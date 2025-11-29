import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService, User, LoginData, RegisterData } from '@services/authService';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authChecked: boolean;
  error: string | null;
  favorites: string[]; // Меняем на string[]
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  authChecked: false,
  error: null,
  favorites: [], // string[]
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const userData = await authService.login(loginData);
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const userData = await authService.register(registerData);
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
  } catch (error: unknown) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка выхода');
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const userInfo = await authService.checkAuth();
    return userInfo;
  } catch (error) {
    return null;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.authChecked = action.payload;
    },
    // Обновляем редюсеры для работы со string[]
    addToFavorites: (state, action: PayloadAction<number>) => {
      const movieIdString = action.payload.toString();
      if (!state.favorites.includes(movieIdString)) {
        state.favorites.push(movieIdString);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const movieIdString = action.payload.toString();
      state.favorites = state.favorites.filter(id => id !== movieIdString);
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.error = null;
        // Сохраняем избранные фильмы из ответа сервера (string[])
        if (action.payload.favorites) {
          state.favorites = action.payload.favorites;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.user = null;
        state.favorites = [];
      })
      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.error = null;
        // Сохраняем избранные фильмы из ответа сервера (string[])
        if (action.payload.favorites) {
          state.favorites = action.payload.favorites;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.user = null;
        state.favorites = [];
      })
      // Logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.error = null;
        state.favorites = [];
      })
      .addCase(logout.rejected, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.favorites = [];
      })
      // Check Auth
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.authChecked = true;
        state.error = null;
        // Сохраняем избранные фильмы из ответа сервера (string[])
        if (action.payload?.favorites) {
          state.favorites = action.payload.favorites;
        } else {
          state.favorites = [];
        }
      })
      .addCase(checkAuth.rejected, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.favorites = [];
      });
  },
});

export const {
  clearError,
  setAuthChecked,
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} = authSlice.actions;
export {authSlice};
export default authSlice.reducer;
