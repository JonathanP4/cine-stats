"use client";

import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ResultItemSkeleton } from "@/components/ResultItemSkeleton";

type Props = {
    info: MovieData;
};

export const BASE_IMG_URL = process.env.NEXT_PUBLIC_BASE_IMG_URL;

export default function ResultItem({ info }: Props) {
    const [movieInfo, setMovieInfo] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await api.post("/info", {
                    id: info.id,
                    type: info.media_type,
                });
                setMovieInfo(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <ResultItemSkeleton />;

    return (
        <Link href={`/movie/${info.id}?type=${info.media_type}`}>
            <div
                style={{ boxShadow: "0 0 10px 0 hsla(100 100% 100% / 0.2)" }}
                className="flex bg-secondary rounded-r-lg shadow-lg"
            >
                <div className="w-[100px] h-[150px]">
                    {(!info.poster_path || imgLoading) && (
                        <Image
                            className="rounded-l-lg min-w-[100px] object-cover h-full"
                            src={"/images/placeholder.png"}
                            width={300}
                            height={450}
                            alt={info.title}
                        />
                    )}
                    <Image
                        className="rounded-l-lg min-w-[100px] object-cover h-full"
                        onLoad={() => setImgLoading(false)}
                        src={
                            !info.poster_path
                                ? "/images/placeholder.png"
                                : BASE_IMG_URL + info.poster_path
                        }
                        width={486}
                        height={729}
                        alt={info.title}
                    />
                </div>
                <div className="grid content-evenly px-4">
                    <div>
                        <h1 className="font-bold">{info.title}</h1>
                        <span className="text-sm text-gray-400 capitalize">
                            {info.media_type} -{" "}
                        </span>
                        <span className="text-sm text-gray-400">
                            {new Date(info.release_date).getFullYear()}
                        </span>
                    </div>
                    {movieInfo?.description && (
                        <p className="line-clamp-2">{movieInfo.description}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
