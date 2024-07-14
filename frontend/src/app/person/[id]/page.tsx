"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BASE_IMG_URL } from "@/components/ResultItem";
import { Card } from "@/components/trending/Card";
import { MediaCarousel } from "@/components/trending/MediaCarousel";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

type Params = {
    params: {
        id: string;
    };
};

export default function PersonPage({ params }: Params) {
    const [data, setData] = useState<any>();
    useEffect(() => {
        (async function fetchPersonDetails() {
            const { data } = await api.post(`/details/person/${params.id}`, {
                language: navigator.language,
                append_to_response: "combined_credits",
            });
            console.log(data);
            setData(data);
        })();
    }, []);

    if (!data) return <LoadingSpinner />;

    let gender;
    switch (data.gender) {
        case 1:
            gender = "Female";
            break;
        case 2:
            gender = "Male";
            break;
        default:
            gender = "Non-binary";
    }

    const now = DateTime.now();
    const birthDate = DateTime.fromISO(data.birthday);

    const birthday = DateTime.fromISO(data.birthday).toLocaleString({
        dateStyle: "long",
    });

    const age = Math.round(now.diff(birthDate, "years").years);

    return (
        <main className="p-6">
            <div className="flex items-start gap-x-6">
                <section>
                    <figure className="rounded-md">
                        <Image
                            className="rounded-md min-w-[300px]"
                            width={300}
                            height={450}
                            src={BASE_IMG_URL + data.profile_path}
                            alt={data.name + " profile"}
                        />
                    </figure>
                    <h2 className="text-xl font-bold my-2">Personal Info</h2>
                    <dl className="space-y-4">
                        <dd>
                            <h2 className="font-semibold">Known for</h2>
                            <p>{data.known_for_department}</p>
                        </dd>
                        <dd>
                            <h2 className="font-semibold">Known Credits</h2>
                            <p>{data.combined_credits.cast.length - 1}</p>
                        </dd>
                        <dd>
                            <h2 className="font-semibold">Gender</h2>
                            <p>{gender}</p>
                        </dd>
                        <dd>
                            <h2 className="font-semibold">Birthday</h2>
                            <p>
                                {birthday}
                                <span className="text-white/50">{` (${age} years old)`}</span>
                            </p>
                        </dd>
                    </dl>
                </section>
                <section className="max-w-[1024px] min-w-96">
                    <h1 className="font-bold text-3xl mb-6">{data.name}</h1>
                    <h2 className="text-lg font-semibold mb-2">Biography</h2>
                    <p className="mb-6">{data.biography}</p>
                    <h2 className="text-lg font-semibold mb-2">Known for</h2>

                    <MediaCarousel containerWidth={window.innerWidth - 400}>
                        {data.combined_credits.cast.map((c: any) => (
                            <Card data={c} />
                        ))}
                    </MediaCarousel>
                </section>
            </div>
        </main>
    );
}
