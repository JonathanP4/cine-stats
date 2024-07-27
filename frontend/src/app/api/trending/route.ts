import { tmdb } from "@/lib/axios";

export async function POST(req: Request) {
	const body = await req.json();

	const { media_type, time_frame, language } = body;

	const { data } = await tmdb.get(`/trending/${media_type}/${time_frame}`, {
		params: {
			language,
		},
		headers: {
			Authorization: `Bearer  ${process.env.TMDB_TOKEN}`,
		},
	});
	return Response.json(data);
}
