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

// Get User Listings
const getListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete a Listing
const deleteListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + listingId, config);

  return response.data;
};

// Get the listings the signed in user is requested to
const getRequested = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'requested', config);

  return response.data;
};

const listingService = {
  createListing,
  getListings,
  deleteListing,
  getRequested,
};

export default listingService;
