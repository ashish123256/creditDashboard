import axios from 'axios';
import { API_URL } from '../baseUrl';



export const getCredits = async (token) => {
  const response = await axios.get(`${API_URL}/credits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addDailyCredits = async (token) => {
  const response = await axios.post(
    `${API_URL}/credits/daily`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addProfileCredits = async (token) => {
  const response = await axios.post(
    `${API_URL}/credits/profile`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addInteractionCredits = async (token) => {
  const response = await axios.post(
    `${API_URL}/credits/interaction`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};