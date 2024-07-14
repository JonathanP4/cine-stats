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
            const { data } = await api.post(
                `/trending/movie/${timeFrame.movie}`,
                {
                    language: navigator.language,
                }
            );

            setData((s: any) => ({ ...s, movies: data }));
        })();
    }, [timeFrame.movie]);

    useEffect(() => {
        (async function fetchPopularTvSeries() {
            const { data } = await api.post(`/trending/tv/${timeFrame.tv}`, {
                language: navigator.language,
            });

            setData((s: any) => ({ ...s, tv: data }));
        })();
    }, [timeFrame.tv]);

    const changeTimeFrame = (timeFrame: TimeFrames, type: MediaTypes) => {
        setTimeFrame((s: any) => ({ ...s, [type]: timeFrame }));
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
                            <Card data={m} key={m.id} />
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
                            <Card data={t} key={t.id} />
                        ))}
                    </MediaCarousel>
                </section>
            )}
        </main>
    );
}
