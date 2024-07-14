import { Router } from "express";
import { tmdb } from "../lib/axios.js";

const router = Router();

router.post("/movie/:time_frame(week|day)", async (req, res, next) => {
	const { language } = req.body;
	const { time_frame } = req.params;
	try {
		const { data } = await tmdb.get(`/trending/movie/${time_frame}`, {
			params: { language },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/tv/:time_frame(week|day)", async (req, res, next) => {
	const { language } = req.body;
	const { time_frame } = req.params;
	try {
		const { data } = await tmdb.get(`/trending/tv/${time_frame}`, {
			params: { language },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/person/:time_frame(week|day)", async (req, res, next) => {
	const { language } = req.body;
	const { time_frame } = req.params;
	try {
		const { data } = await tmdb.get(`/trending/person/${time_frame}`, {
			params: { language },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
