import axios from 'axios';
import { KEY, PER_PAGE } from 'consts';

export const getImages = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&${PER_PAGE}=12&page=${page}`
  );
};

export default getImages;
