import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54359388-9cf15bfeabb0906e8f4ff86d6';

export async function fetchImages(query, page = 1, perPage = 40) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });

  
  return data;
}
