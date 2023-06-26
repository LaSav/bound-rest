import axios from 'axios';

const API_URL = '/api/feed/';

// Get feed
const getFeed = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Request Listing
const requestListing = async (listingId, token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + listingId, { userId }, config);

  return response.data;
};

const feedService = {
  getFeed,
  requestListing,
};

export default feedService;
