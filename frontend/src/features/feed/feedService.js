import axios from 'axios';

const API_URL = '/api/feed/';

// Get feed
const getFeed = async (queryParams) => {
  const response = await axios.get(API_URL, { params: queryParams });
  return response.data;
};

const searchFeed = async (queryParams) => {
  const response = await axios.get(API_URL + 'search', { params: queryParams });
  return response.data;
};

const sortFeed = async (queryParams) => {
  const response = await axios.get(API_URL + 'sort', { params: queryParams });
  return response.data;
};

const feedService = {
  getFeed,
  searchFeed,
  sortFeed,
};

export default feedService;
