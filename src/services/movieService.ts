import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN as string}`,
  },
});

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
}


export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];

  const params = { query, include_adult: false, language: 'en-US' };
  
 
  const response = await api.get<TMDBSearchResponse>('/search/movie', { params });
  
  return response.data.results;
}