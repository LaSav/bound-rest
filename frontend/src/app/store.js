import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import listingsReducer from '../features/listings/listingSlice';
import listingReducer from '../features/listing/listingSlice';
import feedReducer from '../features/feed/feedSlice';
import feedListingReducer from '../features/feedListing/feedListingSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    listing: listingReducer,
    feed: feedReducer,
    feedListing: feedListingReducer,
    user: userReducer,
  },
});
