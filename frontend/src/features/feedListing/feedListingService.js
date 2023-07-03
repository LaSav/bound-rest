import axios from 'axios';

const API_URL = '/api/feed/';

// Get a Single Listing
const getFeedListing = async (listingId) => {
  const response = await axios.get(API_URL + listingId);

  return response.data;
};

// Request Listing
const requestListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + listingId, {}, config);

  return response.data;
};

const feedListingService = {
  getFeedListing,
  requestListing,
};

export default feedListingService;
