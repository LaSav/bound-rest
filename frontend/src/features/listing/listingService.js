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

// Get a Requests of a Listing
const getRequests = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'requests/' + listingId, config);

  return response.data;
};

// Match a request of a Listing
const matchRequest = async (listingId, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + 'requests/' + listingId,
    { _id: data },
    config
  );
  return response.data;
};

// Edit a Listing
const updateListing = async (listingId, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + listingId, data, config);
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

const listingService = {
  getListing,
  getRequests,
  matchRequest,
  updateListing,
  deleteListing,
};

export default listingService;
