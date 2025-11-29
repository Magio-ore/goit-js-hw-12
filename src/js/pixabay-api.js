import axios from 'axios';

const API_KEY = '53464024-6a9f32a3179c04c5ef7872dae';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page = 1) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page.toString(),
    per_page: '15',
  };

  const response = await axios.get(BASE_URL, { params });
  
  return response.data;
};