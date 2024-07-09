"use client";

import ResultItem from "@/components/ResultItem";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { SidebarOptions } from "@/components/SidebarOptions";
import {
    IAnimeResult,
    IMovieResult,
    ISearch,
    TvType,
} from "@consumet/extensions";
import { ResultsPagination } from "@/components/ResultsPagination";
import { tmdb } from "@/lib/utils";
import { IPeopleResult } from "@consumet/extensions/dist/models/types";

type Params = { params: { title: string } };

export default function Home({ params }: Params) {
    const [currPage, setCurrPage] = useState(1);
    const [movieData, setMovieData] =
        useState<ISearch<IMovieResult | IAnimeResult | IPeopleResult>>();
    const [filteredData, setFilteredData] = useState<
        (IMovieResult | IAnimeResult | IPeopleResult)[]
    >([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (!movieData?.results) return;
        const filtered = movieData.results.filter(
            (d: any) => d.type === filter,
        );
        setFilteredData(filtered);
    }, [filter]);

    useEffect(() => {
        (async function fetchMovieData() {
            const data = await tmdb.search(params.title, currPage);
            setMovieData(data);
            setFilteredData(data.results);
        })();
    }, [currPage]);

    const filterType = (type: TvType) => setFilter(type.toString());
    const changePage = (page: number) => setCurrPage(page);

    return (
        <main className="p-6">
            <SearchBar movieTitle={params.title} />
            <div className={"pt-6 gap-6 md:flex md:pt-10"}>
                <SidebarOptions onFilter={filterType} />

                <ul className="gap-6 grid w-full">
                    {filteredData.length > 0 ? (
                        filteredData.map((d) => (
                            <li>
                                <ResultItem info={d} key={d.id} />
                            </li>
                        ))
                    ) : (
                        <p className={"text-md"}>No results found</p>
                    )}
                </ul>
            </div>
            {filteredData.length > 0 && movieData?.totalPages && (
                <ResultsPagination
                    currentPage={currPage}
                    setPage={changePage}
                    lastPage={
                        movieData.totalPages > 500 ? 500 : movieData.totalPages
                    }
                />
            )}
        </main>
    );
}
