import axios from 'axios';

const API_URL = '/api/feed/';

// Get feed
const getFeed = async (queryParams) => {
  const response = await axios.get(API_URL, { params: queryParams });
  return response.data;
};

const feedService = {
  getFeed,
};

export default feedService;
