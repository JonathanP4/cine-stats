"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { api } from "@/lib/axios";
import Image from "next/image";
import ResultItem, { BASE_IMG_URL } from "@/components/ResultItem";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { getBookmark, updateUserBookmarks } from "@/lib/firedb";
import { Auth } from "@/store/Auth";
import Link from "next/link";
import { CastCard } from "@/components/CastCard";

type Params = {
    params: { id: string };
};

export default function MovieInfo({ params }: Params) {
    const { user } = Auth();
    const [info, setInfo] = useState<SearchMovieData | null | any>();
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        (async function fetchInfo() {
            const { data } = await api.post(`/details/movie/${params.id}`, {
                language: navigator.language,
                append_to_response: "releases,credits,videos,recommendations",
            });
            setInfo(data);
        })();
    }, []);

    useEffect(() => {
        (async function fetchBookmark() {
            if (user) {
                const bookmarkExists = await getBookmark(user.uid, params.id);
                setBookmark(!!bookmarkExists);
            }
        })();
    }, [user]);

    if (!info) return <LoadingSpinner />;

    const postBookmark = async () => {
        if (user) {
            if (!bookmark) {
                await updateUserBookmarks(user.uid, params.id, {
                    id: params.id,
                    title: info.title,
                    poster_path: info.poster_path,
                    backdrop_path: info.backdrop_path,
                    type: "movie",
                });
                setBookmark(true);
            } else {
                await updateUserBookmarks(user.uid, params.id, null);
                setBookmark(false);
            }
        }
    };

    const intlDate = new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const intlNumber = new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "USD",
    });

    const intlNames = new Intl.DisplayNames([navigator.language], {
        type: "language",
    });

    const rating = +Math.round(info.vote_average * 10);
    const countryReleases = info.releases.countries.filter(
        (c: any) => c.iso_3166_1 === navigator.language.split("-")[1]
    );
    const crew = {
        director: info.credits.crew.filter((c: any) => c.job === "Director")[0],
        producer: info.credits.crew.filter((c: any) => c.job === "Producer")[0],
        writer: info.credits.crew.filter((c: any) => c.job === "Writer")[0],
        characters:
            info.credits.crew.filter((c: any) => c.job === "Characters")[0] ||
            "",
    };
    const trailers = info.videos.results.filter(
        (t: any) => t.type === "Trailer"
    );

    let pathColor;

    if (rating >= 70) {
        pathColor = "#4ade80";
    } else if (rating < 60) {
        pathColor = "#f87171";
    } else {
        pathColor = "#facc15";
    }

    return (
        <main>
            <section className={"relative text-center md:text-left "}>
                <div className={"w-full h-full fixed top-0 -z-10"}>
                    <Image
                        className="rounded-lg object-fill w-full h-full opacity-15"
                        src={BASE_IMG_URL + info.backdrop_path}
                        width={486}
                        height={729}
                        alt={info.title}
                    />
                </div>
                <div
                    className={
                        "p-6 flex flex-col justify-center items-center gap-6 md:gap-10 md:flex-row md:justify-normal"
                    }
                >
                    <figure className={"md:max-w-[300px] relative"}>
                        <div
                            className={
                                "absolute m-1 cursor-pointer bg-secondary/40 rounded-full p-1"
                            }
                            onClick={postBookmark}
                        >
                            {bookmark ? (
                                <HeartFilledIcon
                                    color={"red"}
                                    width={25}
                                    height={25}
                                />
                            ) : (
                                <HeartIcon width={25} height={25} />
                            )}
                        </div>

                        <Image
                            className="rounded-lg"
                            src={BASE_IMG_URL + info.poster_path}
                            width={486}
                            height={729}
                            alt={info.title}
                        />
                    </figure>
                    <div>
                        <div
                            className={
                                "flex justify-center items-center gap-12 md:justify-start"
                            }
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className={"text-3xl font-bold"}>
                                        {info.title}
                                    </h1>
                                    <span
                                        className={
                                            "text-3xl font-semibold text-slate-500"
                                        }
                                    >
                                        (
                                        {info?.release_date?.split("-")[0] ||
                                            "-"}
                                        )
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm mt-1">
                                    {countryReleases[0]?.certification && (
                                        <span className="border border-primary/50 p-1">
                                            {countryReleases[0].certification}
                                        </span>
                                    )}
                                    <p>
                                        {intlDate.format(
                                            new Date(info.release_date)
                                        )}
                                    </p>
                                    |
                                    <span>
                                        {info.genres
                                            .map((g: any) => g.name)
                                            .join(", ")}
                                    </span>
                                    |
                                    <span>
                                        {`${(info.runtime / 60).toFixed(0)}h ${
                                            info.runtime % 60
                                        }m`}
                                    </span>
                                </div>
                                <div className={"mt-1 text-sm text-left"}></div>
                            </div>
                        </div>
                        <div
                            className={
                                "-mr-[50px] flex items-center justify-center md:justify-start gap-2 mt-5"
                            }
                        >
                            <div className={"w-20"}>
                                <CircularProgressbar
                                    styles={{
                                        path: {
                                            stroke: pathColor,
                                        },
                                        text: {
                                            fill: "white",

                                            fontWeight: "bold",
                                        },
                                        trail: {
                                            stroke: "#1e293b",
                                        },
                                    }}
                                    value={rating}
                                    text={`${rating}%`}
                                />
                            </div>

                            <span className={"font-bold"}>Score</span>
                        </div>

                        <div className={"mt-6 max-w-4xl"}>
                            <p className="text-primary/50 italic">
                                {info.tagline}
                            </p>
                            <h2 className={"text-xl font-semibold mb-2"}>
                                Overview
                            </h2>
                            <p className={"text-slate-300 text-justify"}>
                                {info.overview}
                            </p>
                        </div>

                        <div
                            className={
                                "mt-6 grid grid-cols-3 gap-y-4 text-left transition-all"
                            }
                        >
                            {crew?.writer && (
                                <div>
                                    <h2 className={"font-semibold"}>Writer</h2>

                                    <Link
                                        href={"/"}
                                        className="transition-all hover:tracking-wide hover:opacity-60"
                                    >
                                        {crew.writer.original_name}
                                    </Link>
                                </div>
                            )}

                            {crew?.director && (
                                <div>
                                    <h2 className={"font-semibold"}>
                                        Director
                                    </h2>

                                    <Link
                                        href={"/"}
                                        className="transition-all hover:tracking-wide hover:opacity-60"
                                    >
                                        {crew.director.original_name}
                                    </Link>
                                </div>
                            )}

                            {crew?.producer && (
                                <div>
                                    <h2 className={"font-semibold"}>
                                        Producer
                                    </h2>

                                    <Link
                                        href={"/"}
                                        className="transition-all hover:tracking-wide hover:opacity-60"
                                    >
                                        {crew.producer.original_name}
                                    </Link>
                                </div>
                            )}
                            {crew?.characters && (
                                <div>
                                    <h2 className={"font-semibold"}>
                                        Characters
                                    </h2>

                                    <Link
                                        href={"/"}
                                        className="transition-all hover:tracking-wide hover:opacity-60"
                                    >
                                        {crew.characters.original_name}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {!!trailers.length && (
                <section className={"p-6 py-20 bg-background/60"}>
                    <div className="flex gap-4 justify-evenly">
                        <iframe
                            className="rounded-md"
                            src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
                            width="560"
                            height="315"
                        />

                        <dl className="space-y-4">
                            <dd>
                                <h3 className="font-bold">Status</h3>
                                <p>{info.status || "-"}</p>
                            </dd>
                            <dd>
                                <h3 className="font-bold">Original Language</h3>
                                <p>
                                    {intlNames.of(info.original_language) ||
                                        "-"}
                                </p>
                            </dd>
                            <dd>
                                <h3 className="font-bold">Budget</h3>
                                <p>{intlNumber.format(info.budget) || "-"}</p>
                            </dd>
                            <dd>
                                <h3 className="font-bold">Revenue</h3>
                                <p>{intlNumber.format(info.revenue) || "-"}</p>
                            </dd>
                        </dl>
                    </div>
                </section>
            )}
            <section className="p-6">
                <h2 className="font-bold text-3xl">Cast</h2>
                <ul className="overflow-x-scroll">
                    <li className="flex items-stretch gap-4 py-4">
                        {info.credits.cast.map((c: any) => (
                            <CastCard cast={c} />
                        ))}
                    </li>
                </ul>
            </section>

            {info.recommendations.results.length > 0 && (
                <section className="p-6 bg-secondary/80">
                    <h2 className="font-bold text-3xl">You might also like</h2>
                    <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        {info.recommendations.results.map((r: any) => (
                            <li>
                                <ResultItem
                                    className="bg-background rounded-lg"
                                    info={r}
                                    key={r.id}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
}
