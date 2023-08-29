import axios from 'axios';

const API_URL = '/api/feed/';

const queryParams = {
  requiredSkills: ['frontend developer', 'backend developer'],
};

// Get feed
const getFeed = async () => {
  const response = await axios.get(API_URL, { params: queryParams });
  console.log(queryParams);
  return response.data;
};

const feedService = {
  getFeed,
};

export default feedService;
