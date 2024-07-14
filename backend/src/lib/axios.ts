import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TMDB_TOKEN;

export const tmdb = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
});
