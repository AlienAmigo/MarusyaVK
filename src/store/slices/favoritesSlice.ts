import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@services/axiosInstance';
import { FAVORITES_URL } from '@config';
import { IMovie } from '@types';

export interface FavoriteItem {
  id: number;
}

export interface FavoritesState {
  items: FavoriteItem[];
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
  async (movieId: number, { rejectWithValue }) => {
    try {
      // Создаем FormData для отправки как application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('id', movieId.toString());

      const response = await axiosInstance.post<FavoriteItem>(FAVORITES_URL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления в избранное');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (movieId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${FAVORITES_URL}/${movieId}`);
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
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<FavoriteItem>) => {
        state.isLoading = false;
        // Проверяем, нет ли уже этого фильма в избранном
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
        state.items = state.items.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
