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
export const getFeed = createAsyncThunk('feed/getAll', async (_, thunkAPI) => {
  try {
    return await feedService.getFeed();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Request a Listing
export const requestListing = createAsyncThunk(
  'feed/request',
  async (id, thunkAPI, userId) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;
      return await feedService.requestListing(id, token, userId);
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
    reset: (state) => initialState,
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
      })
      .addCase(requestListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = state.listings.filter(
          (listing) => listing._id !== action.payload.id
        );
        state.listings.requests.push(action.payload.userId);
      })
      .addCase(requestListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = feedSlice.actions;
export default feedSlice.reducer;
