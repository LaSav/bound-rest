import axios from 'axios';

const API_URL = '/api/users/me';

// Get logged in User
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log('Response Data:', response.data);
  return response.data;
};

// Edit logged in User
const editUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, data, config);
  console.log('Response Data:', response.data);
  return response.data;
};

const userService = {
  getUser,
  editUser,
};

export default userService;
