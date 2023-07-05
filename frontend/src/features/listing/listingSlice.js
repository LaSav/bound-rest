import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingService from './listingService';

const initialState = {
  listing: {},
  requests: [],
  matched: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get a Single Listing from Feed
export const getListing = createAsyncThunk(
  'listing/getOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.getListing(id, token);
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

// Get Requests from a single Listing
export const getRequests = createAsyncThunk(
  'listing/getRequests',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.getRequests(id, token);
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
      .addCase(getListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = action.payload;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listingSlice.actions;
export default listingSlice.reducer;
