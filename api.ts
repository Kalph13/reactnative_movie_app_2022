const API_KEY = "53003f8485665501746ef9cdb21e5b20";
const BASE_URL = "https://api.themoviedb.org/3";

const getNowPlaying = () => 
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => res.json()
    );

const getUpcoming = () => 
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => res.json()
    );

const getTrending = () => 
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
        .then(res => res.json()
    );

export const moviesAPI = { getNowPlaying, getUpcoming, getTrending };