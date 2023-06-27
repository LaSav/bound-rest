import axios from 'axios';

const API_URL = '/api/feed/';

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

const feedListingService = {
  requestListing,
};

export default feedListingService;
