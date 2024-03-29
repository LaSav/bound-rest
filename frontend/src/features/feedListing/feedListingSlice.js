import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedListingService from './feedListingService';

const initialState = {
  listing: {},
  requested: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get a Single Listing from Feed
export const getFeedListing = createAsyncThunk(
  'feedListing/getOne',
  async (id, thunkAPI) => {
    try {
      return await feedListingService.getFeedListing(id);
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

// Request a Listing
export const requestListing = createAsyncThunk(
  'feedListing/request',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await feedListingService.requestListing(id, token);
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
    resetFeedListing: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(getFeedListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requested = action.payload;
        console.log(action.payload);
      })
      .addCase(requestListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFeedListing } = feedListingSlice.actions;
export default feedListingSlice.reducer;
