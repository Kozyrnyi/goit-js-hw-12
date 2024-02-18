// axios library
import axios from 'axios';

export async function pixabayAPI(searchQuery, perPage, currentPage) {
    const API_KEY = '42305957-2425bb18c357c2a7b9cbd48a2';
    const URL = 'https://pixabay.com/api/';

    const params = {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: currentPage,
    };

    const res = await axios.get(URL, { params });
    return res.data;
}
