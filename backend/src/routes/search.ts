import { Router } from "express";
import { tmdb } from "../lib/axios";

const router = Router();

router.post("/movie", async (req, res, next) => {
	const { language, page, query } = req.body;
	try {
		const { data } = await tmdb.get("/search/movie", {
			params: { language, page, query },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/tv", async (req, res, next) => {
	const { language, page, query } = req.body;
	try {
		const { data } = await tmdb.get("/search/tv", {
			params: { language, page, query },
		});
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/person", async (req, res, next) => {
	const { language, page, query } = req.body;
	try {
		const { data } = await tmdb.get("/search/person", {
			params: { language, page, query },
		});

		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
