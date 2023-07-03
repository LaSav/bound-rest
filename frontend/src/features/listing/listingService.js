import axios from 'axios';

const API_URL = '/api/listings/';

// Get a Single Listing
const getListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + listingId, config);

  return response.data;
};

const listingService = {
  getListing,
};

export default listingService;
