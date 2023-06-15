import axios from 'axios';

const API_URL = '/api/listings/';

// Create new Listing

const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, listingData, config);

  return response.data;
};

const listingService = {
  createListing,
};

export default listingService;
