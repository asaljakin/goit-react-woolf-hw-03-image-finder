import axios from 'axios';
import { KEY } from 'consts';

export const getImages = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=12&page=${page}`
  );
};

export default getImages;
