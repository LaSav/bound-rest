import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));
