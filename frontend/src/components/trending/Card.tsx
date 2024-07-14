import Image from "next/image";
import { BASE_IMG_URL } from "../ResultItem";
import { MouseEvent } from "react";
import Link from "next/link";
import "./Card.css";

type Props = {
    data: any;
};

export function Card({ data }: Props) {
    const localeDate = new Date(
        data?.release_date || data?.first_air_date
    ).toLocaleString(navigator.language, {
        dateStyle: "medium",
    });

    const handleMouseMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <Link
            href={`/${data.media_type}/${data.id}`}
            onMouseMove={handleMouseMove}
            className="card-container relative cursor-pointer select-none h-[350px] w-[206px]"
        >
            <Image
                className="absolute -z-10  h-[314px] max-w-full rounded-lg object-cover"
                src={BASE_IMG_URL + data.backdrop_path}
                width={486}
                height={729}
                alt={`${data?.title || data?.original_name} backdrop`}
            />
            <div className="card bg-secondary/60 backdrop-blur-md grid justify-items-center p-2 rounded-lg z-10">
                <div className="rounded-md w-[150px] h-[298px] grid content-start">
                    <figure
                        draggable={false}
                        className="pointer-events-none h-[225px] mb-1"
                    >
                        <Image
                            className="rounded-md min-h-[225px] object-cover"
                            src={
                                data.poster_path
                                    ? BASE_IMG_URL + data.poster_path
                                    : "/images/placeholder.png"
                            }
                            width={300}
                            height={450}
                            alt={`${data?.title || data?.original_name} poster`}
                        />
                    </figure>
                    <div className="">
                        <h2 className="font-semibold line-clamp-2">
                            {data?.title || data?.original_name}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {localeDate !== "Invalid Date"
                                ? localeDate
                                : "Date Uknown"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
