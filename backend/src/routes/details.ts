import { Router } from "express";
import { tmdb } from "../lib/axios.js";
const router = Router();

router.post("/movie/:id(\\d+)", async (req, res, next) => {
	const { id } = req.params;
	const { language, append_to_response } = req.body;
	try {
		const { data } = await tmdb.get(`/movie/${id}`, {
			params: { language, append_to_response },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/tv/:id(\\d+)", async (req, res, next) => {
	const { id } = req.params;
	const { language, append_to_response } = req.body;
	try {
		const { data } = await tmdb.get(`/tv/${id}`, {
			params: { language, append_to_response },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/person/:id(\\d+)", async (req, res, next) => {
	const { id } = req.params;
	const { language, append_to_response } = req.body;
	try {
		const { data } = await tmdb.get(`/person/${id}`, {
			params: { language, append_to_response },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
