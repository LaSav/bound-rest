import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingService from './listingService';

const initialState = {
  listings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a Listing
export const createListing = createAsyncThunk(
  'listings/create',
  async (listingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.createListing(listingData, token);
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

// Get User Listings
export const getListings = createAsyncThunk(
  'listings/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.getListings(token);
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
export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings.push(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listingSlice.actions;
export default listingSlice.reducer;
