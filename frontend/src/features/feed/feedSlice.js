import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedService from './feedService';

const initialState = {
  listings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get User Listings
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
        state.listings = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
