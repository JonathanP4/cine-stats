import { tmdb } from "@/lib/axios";

export async function POST(req: Request) {
	const body = await req.json();

	const { page, language, query, media_type } = body;

	const { data } = await tmdb.get(`/search/${media_type}`, {
		params: {
			query,
			page,
			language,
		},
		headers: {
			Authorization: `Bearer  ${process.env.TMDB_TOKEN}`,
		},
	});
	return Response.json(data);
}
