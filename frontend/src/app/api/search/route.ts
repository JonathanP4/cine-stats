import { TMDB } from "@/lib/axios";

export async function POST(request: Request) {
    const body = await request.json();
    const { type, query, page, lang } = body;

    const { data } = await TMDB.get(`/search/${type}`, {
        params: {
            language: lang,
            query,
            page,
        },
        headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
        },
    });

    return Response.json(data);
}
