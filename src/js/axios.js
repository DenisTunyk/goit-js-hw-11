import axios from 'axios';

const BASE_URL = `https://pixabay.com/api`;
const API_KEY = `31824211-7ef4149e7674ea42a1856045np8`;

export const fetchPics = async (input, page = "1") => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
  return response.data
};

//https://pixabay.com/api?key=31824211-7ef4149e7674ea42a1856045np8&q=cat&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=1