import axios from 'axios';

const API_URL = '/api/feed/';

// Get feed
const getFeed = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const feedService = {
  getFeed,
};

export default feedService;
