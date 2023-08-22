import axios from 'axios';

const API_URL = '/api/users/';

// Get logged in User
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'me', config);
  return response.data;
};

// Edit logged in User
const editUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(API_URL + 'me', data, config);
    console.log('editUser API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('editUser API error:', error); // Add this log
    throw error;
  }
};

// Get User by Id
const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const userService = {
  getUser,
  editUser,
  getUserById,
};

export default userService;
