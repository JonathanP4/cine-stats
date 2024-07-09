"use client";

import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/trending/Card";
import { MediaCarousel } from "@/components/trending/MediaCarousel";

type MediaData = {
    movies: ResultsData;
    tv: ResultsData;
};

export default function Home() {
    const [data, setData] = useState<MediaData | null>();
    const [timeFrame, setTimeFrame] = useState<TimeFrameState>({
        movie: "day",
        tv: "day",
    });

    useEffect(() => {
        (async function fetchPopularMovies() {
            const { data } = await api.post("/trending", {
                lang: navigator.language,
                time: timeFrame.movie,
                type: "movie",
            });

            setData((s: any) => {
                const newState = { ...s };
                newState.movies = data;
                return newState;
            });
        })();
    }, [timeFrame.movie]);

    useEffect(() => {
        (async function fetchPopularMovies() {
            const { data } = await api.post("/trending", {
                lang: navigator.language,
                time: timeFrame.tv,
                type: "tv",
            });

            setData((s: any) => {
                const newState = { ...s };
                newState.tv = data;
                return newState;
            });
        })();
    }, [timeFrame.tv]);

    const changeTimeFrame = (timeFrame: TimeFrames, type: MediaTypes) => {
        setTimeFrame((s: any) => {
            const newState = { ...s };
            newState[type] = timeFrame;
            return newState;
        });
    };

    return (
        <main className="p-6">
            <SearchBar />
            {data?.movies && (
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-2">
                        Trending Movies
                    </h2>

                    <MediaCarousel
                        type={"movie"}
                        changeTimeFrame={changeTimeFrame}
                        timeFrame={timeFrame.movie}
                        className="mt-4"
                    >
                        {data.movies.results.map((m: MovieData) => (
                            <Card
                                key={m.id}
                                id={m.id}
                                posterPath={m.poster_path}
                                title={m.title}
                                releaseDate={m.release_date}
                                backdropPath={m.backdrop_path}
                            />
                        ))}
                    </MediaCarousel>
                </section>
            )}
            {data?.tv && (
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-2">
                        Trending Tv Series
                    </h2>

                    <MediaCarousel
                        type={"tv"}
                        changeTimeFrame={changeTimeFrame}
                        timeFrame={timeFrame.tv}
                        className="mt-4"
                    >
                        {data.tv.results.map((t: TvData) => (
                            <Card
                                key={t.id}
                                id={t.id}
                                posterPath={t.poster_path}
                                title={t.name}
                                releaseDate={t.first_air_date}
                                backdropPath={t.backdrop_path}
                            />
                        ))}
                    </MediaCarousel>
                </section>
            )}
        </main>
    );
}
