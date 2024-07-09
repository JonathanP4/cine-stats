import { TMDB } from "@/lib/axios";

export async function POST(request: Request) {
    const body = await request.json();

    const { data } = await TMDB.get(
        `/${body.type}/${body.id}?language=${body.lang}`,
        {
            headers: {
                Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            },
        }
    );

    return Response.json(data);
}
