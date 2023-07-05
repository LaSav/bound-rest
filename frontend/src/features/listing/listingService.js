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

// Get a Single Listing
const getRequests = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'requests/' + listingId, config);

  return response.data;
};

const listingService = {
  getListing,
  getRequests,
};

export default listingService;
