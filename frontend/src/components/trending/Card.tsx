import Image from "next/image";
import { BASE_IMG_URL } from "../ResultItem";
import { MouseEvent } from "react";
import Link from "next/link";
import "./Card.css";

type Props = {
    title: string;
    releaseDate: string;
    backdropPath: string;
    posterPath: string;
    id: number;
};

export function Card({
    title,
    releaseDate,
    backdropPath,
    posterPath,
    id,
}: Props) {
    const localeDate = new Date(releaseDate).toLocaleString(
        navigator.language,
        {
            dateStyle: "medium",
        }
    );

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
            href={`/movie/${id}`}
            onMouseMove={handleMouseMove}
            className="card-container relative cursor-pointer select-none h-[350px] w-[206px]"
        >
            <Image
                className="absolute -z-10  h-[320px] max-w-full rounded-lg object-cover"
                src={BASE_IMG_URL + backdropPath}
                width={486}
                height={729}
                alt={`${title} backdrop`}
            />
            <div className="card bg-secondary/60 backdrop-blur-md grid justify-items-center p-4 rounded-lg z-10">
                <div className="rounded-md w-[150px] h-[290px] grid">
                    <figure draggable={false} className="pointer-events-none">
                        <Image
                            className="rounded-md mb-1"
                            src={BASE_IMG_URL + posterPath}
                            width={300}
                            height={450}
                            alt={`${title} poster`}
                        />
                    </figure>
                    <div>
                        <h2 className="font-semibold line-clamp-2">{title}</h2>
                        <p className="text-sm text-slate-400">{localeDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
