import { TMDB } from "@/lib/axios";

type RequestBody = {
    type: MediaTypes;
    id: string;
    append_data?: string[];
    lang: string;
};

export async function POST(request: Request) {
    const body = (await request.json()) as RequestBody;

    const { data } = await TMDB.get(`/${body.type}/${body.id}`, {
        params: {
            append_to_response: body?.append_data?.join(",") || "",
            language: body.lang,
        },
        headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
        },
    });

    return Response.json(data);
}
