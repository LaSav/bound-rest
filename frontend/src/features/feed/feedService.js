import axios from 'axios';

const API_URL = '/api/feed/';

const queryParams = {
  requiredSkill: 'frontend developer',
};

// Get feed
const getFeed = async () => {
  const response = await axios.get(API_URL, { params: queryParams });

  return response.data;
};

const feedService = {
  getFeed,
};

export default feedService;
