import { tmdb } from "@/lib/axios";

export async function POST(req: Request) {
	const body = await req.json();

	const { media_type, id, language, append_to_response } = body;

	const { data } = await tmdb.get(`/${media_type}/${id}`, {
		params: {
			language,
			append_to_response,
		},
		headers: {
			Authorization: `Bearer  ${process.env.TMDB_TOKEN}`,
		},
	});
	return Response.json(data);
}
