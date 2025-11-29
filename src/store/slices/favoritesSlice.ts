import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@services/axiosInstance';
import { authSlice } from './authSlice';
import { FAVORITES_URL } from '@config';
import { IMovie } from '@types';

export interface FavoritesState {
  items: IMovie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IMovie[]>(FAVORITES_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки избранного');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (movieId: number, { rejectWithValue, dispatch }) => {
    try {
      const formData = new URLSearchParams();
      formData.append('id', movieId.toString());

      const response = await axiosInstance.post<IMovie>(FAVORITES_URL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // После успешного добавления, обновляем auth.favorites
      dispatch(authSlice.actions.addToFavorites(movieId));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления в избранное');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (movieId: number, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`${FAVORITES_URL}/${movieId}`);

      // После успешного удаления, обновляем auth.favorites
      dispatch(authSlice.actions.removeFromFavorites(movieId));

      return movieId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления из избранного');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: state => {
      state.items = [];
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add to Favorites
      .addCase(addToFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.isLoading = false;
        // Добавляем фильм в список, если его еще нет
        if (!state.items.find(item => item.id === action.payload.id)) {
          state.items.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove from Favorites
      .addCase(removeFromFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        // Удаляем фильм из списка
        state.items = state.items.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFavorites, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
