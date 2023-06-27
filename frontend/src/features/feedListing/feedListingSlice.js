import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedListingService from './feedListingService';

const initialState = {
  listing: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Request a Listing
export const requestListing = createAsyncThunk(
  'feedListing/request',
  async (id, thunkAPI, userId) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;
      return await feedListingService.requestListing(id, token, userId);
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

export const feedListingSlice = createSlice({
  name: 'feedListing',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(requestListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = feedListingSlice.actions;
export default feedListingSlice.reducer;
