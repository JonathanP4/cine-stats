"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { api } from "@/lib/axios";
import Image from "next/image";
import { IAnimeResult, IMovieResult } from "@consumet/extensions";
import ResultItem, { BASE_IMG_URL } from "@/components/ResultItem";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { getBookmark, updateUserBookmarks } from "@/lib/firedb";
import { Auth } from "@/store/Auth";

type Params = {
    params: { id: string };
};

export default function MovieInfo({ params }: Params) {
    const { user } = Auth();
    const [info, setInfo] = useState<SearchMovieData | null>();
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        (async function fetchInfo() {
            const { data } = await api.post("/info", {
                type: "movie",
                id: params.id,
                lang: navigator.language,
            });

            console.log(data);

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

    if (!info) return;

    const postBookmark = async () => {
        if (user) {
            if (!bookmark) {
                await updateUserBookmarks(user.uid, params.id, {
                    id: params.id,
                    title: info.title,
                    coverURL: info.poster_path,
                    type: "movie",
                });
                setBookmark(true);
            } else {
                await updateUserBookmarks(user.uid, params.id, null);
                setBookmark(false);
            }
        }
    };

    const releaseDate = new Date(info.release_date);
    const rating = +Math.round(info.vote_average * 10);
    let pathColor;

    if (rating >= 60) {
        pathColor = "#4ade80";
    } else if (rating < 50) {
        pathColor = "#f87171";
    } else {
        pathColor = "#facc15";
    }

    if (!info) return <LoadingSpinner />;

    return (
        <main className={"overflow-x-hidden"}>
            <section className={"relative text-center md:text-left "}>
                <div className={"w-full h-full fixed top-0 -z-10"}>
                    <Image
                        className="rounded-lg object-cover w-full h-full opacity-15"
                        src={BASE_IMG_URL + info.backdrop_path}
                        width={486}
                        height={729}
                        alt={info.title}
                    />
                </div>
                <div
                    className={
                        "p-6 flex flex-col justify-center items-center gap-6 md:gap-10 md:flex-row"
                    }
                >
                    <figure className={"md:max-w-[300px] relative"}>
                        <div
                            className={"absolute m-2 cursor-pointer"}
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
                                <h1 className={"text-3xl font-bold"}>
                                    {info.title}
                                </h1>

                                <span className={"text-slate-500"}>
                                    ({releaseDate.getFullYear()})
                                </span>
                                <div className={"mt-1 text-sm text-left"}>
                                    {info.genres.map((g) => g.name).join(", ")}
                                </div>
                                <div className={"mt-1 text-sm text-left"}>
                                    {`${(info.runtime / 60).toFixed(0)}h ${
                                        info.runtime % 60
                                    }m`}
                                </div>
                                <div className={"mt-1 text-sm text-left"}></div>
                            </div>
                        </div>
                        <div
                            className={
                                "-mr-[50px] flex items-center justify-center md:justify-start gap-4"
                            }
                        >
                            <div className={"w-20 mt-6"}>
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
                            <h2 className={"text-xl font-semibold mb-2"}>
                                Description
                            </h2>
                            <p className={"text-slate-300 text-justify"}>
                                {info.overview}
                            </p>
                        </div>

                        {/* <div className={"mt-6 grid grid-cols-2 text-left"}>
                           
                                <div>
                                    <h2 className={"font-semibold"}>
                                        Director(s)
                                    </h2>
                                   
                                        <p>{info.p.join(", ")}</p>
                                    
                                </div>
                            
                            {!!info?.writers.length && (
                                <div>
                                    <h2 className={"font-semibold"}>
                                        Writer(s)
                                    </h2>

                                    <p>
                                        {info.writers.join(", ") || "Unknown"}
                                    </p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </section>
            {/* <section className={"p-6 bg-background/60"}>
                <div className={"justify-evenly gap-6 mb-6 md:flex lg:gap-0"}>
                    <iframe
                        className={"max-w-[560px] w-full"}
                        width="560"
                        height="315"
                        src={`${info?.trailer?.url?.slice(0, 23)}/embed/${
                            info?.trailer?.id
                        }`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                    <div
                        className={
                            "flex justify-between items-baseline md:block md:space-y-6"
                        }
                    >
                        {info?.releaseDate && (
                            <div>
                                <h2 className={"text-lg font-semibold"}>
                                    Release Date
                                </h2>
                                <span>
                                    {releaseDate.toLocaleDateString(
                                        navigator.language
                                    )}
                                </span>
                            </div>
                        )}
                        {info?.duration && (
                            <div>
                                <h2 className={"text-lg font-semibold"}>
                                    Duration
                                </h2>
                                <span className={"text-slate-300"}>
                                    {Math.floor(info.duration / 60)}h{" "}
                                    {info.duration % 60}m
                                </span>
                            </div>
                        )}
                        {info?.logo && (
                            <div>
                                <h2 className={"text-lg font-semibold"}>
                                    Logo
                                </h2>
                                <Image
                                    className={"max-w-[200px] h-auto"}
                                    src={info.logos[0].url}
                                    alt={info.title + " logo"}
                                    width={info.logos[0].width}
                                    height={Math.round(
                                        info.logos[0].width /
                                            info.logos[0].aspectRatio
                                    )}
                                />
                                )
                            </div>
                        )}
                    </div>
                </div>
                <h2 className={"text-xl font-semibold mb-2"}>Cast</h2>
                {info?.actors && (
                    <dl
                        className={
                            "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 text-sm"
                        }
                    >
                        {info.actors.map((a: string) => (
                            <dd key={a}>{a}</dd>
                        ))}
                    </dl>
                )}
            </section>
            {info?.similar && (
                <section className={"bg-slate-900/80 p-6"}>
                    <h2 className={"text-2xl font-semibold mb-6"}>
                        You might also like
                    </h2>
                    <div
                        className={
                            "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        }
                    >
                        {info.similar.map((r: IMovieResult | IAnimeResult) => (
                            <ResultItem key={r.id} info={r} />
                        ))}
                    </div>
                </section>
            )} */}
        </main>
    );
}
