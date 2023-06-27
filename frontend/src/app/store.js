import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import listingReducer from '../features/listings/listingSlice';
import feedReducer from '../features/feed/feedSlice';
import feedListingReducer from '../features/feedListing/feedListingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    feed: feedReducer,
    feedListing: feedListingReducer,
  },
});
