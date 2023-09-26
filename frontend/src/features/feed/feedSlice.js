import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedService from './feedService';

const initialState = {
  listings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalPages: 1,
};

// Get Listings
export const getFeed = createAsyncThunk(
  'feed/getAll',
  async (queryParams, thunkAPI) => {
    try {
      return await feedService.getFeed(queryParams);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search Listings
export const searchFeed = createAsyncThunk(
  'feed/search',
  async (queryParams, thunkAPI) => {
    try {
      return await feedService.searchFeed(queryParams);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Sort Listings
export const sortFeed = createAsyncThunk(
  'feed/sort',
  async (queryParams, thunkAPI) => {
    try {
      return await feedService.sortFeed(queryParams);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload.listings;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload.listings;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(searchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sortFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sortFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload.listings;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(sortFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFeed, stageLoading } = feedSlice.actions;
export default feedSlice.reducer;
