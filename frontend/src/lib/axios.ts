import axios from "axios";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const tmdb = axios.create({
	baseURL: "https://api.themoviedb.org/3",
});
