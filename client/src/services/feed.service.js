import axios from 'axios';
import { API_URL } from '../baseUrl';



export const getFeed = async (token) => {
  const response = await axios.get(`${API_URL}/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveContent = async (itemId, token) => {
  const response = await axios.post(
    `${API_URL}/feed/save/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getSavedContent = async (token) => {
  const response = await axios.get(`${API_URL}/feed/saved`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const reportContent = async (itemId, reason, token) => {
  const response = await axios.post(
    `${API_URL}/feed/report/${itemId}`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};