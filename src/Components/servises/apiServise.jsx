import axios from 'axios';

const API_KEY = '22450906-3e002c9d2b529a68e38cedb68';
const URL = 'https://pixabay.com/api/?q=';

function apiService(query, page) {
  return axios.get(
    `${URL}${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
}

export  {apiService};