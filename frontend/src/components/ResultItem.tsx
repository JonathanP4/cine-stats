"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export const BASE_IMG_URL = process.env.NEXT_PUBLIC_BASE_IMG_URL;

export default function ResultItem({ info }: { info: any }) {
    const [imgLoading, setImgLoading] = useState(true);

    const releaseDate = new Intl.DateTimeFormat(navigator.language, {
        dateStyle: "long",
    }).format(new Date());

    return (
        <Link href={`/movie/${info.id}`}>
            <div
                style={{ boxShadow: "0 0 10px 0 hsla(100 100% 100% / 0.2)" }}
                className="flex bg-secondary rounded-r-lg shadow-lg relative"
            >
                {imgLoading && (
                    <Skeleton className="absolute w-[100px] h-[150px] rounded-l-lg" />
                )}
                <div className="w-[100px] h-[150px]">
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
                        alt={info.title || info.original_name}
                    />
                </div>

                <div className="grid content-evenly px-4">
                    <div>
                        <h1 className="font-bold">
                            {info.title || info.original_name}
                        </h1>

                        <span className="text-sm text-gray-400">
                            {releaseDate}
                        </span>
                    </div>

                    <p className="line-clamp-2">{info.overview}</p>
                </div>
            </div>
        </Link>
    );
}
