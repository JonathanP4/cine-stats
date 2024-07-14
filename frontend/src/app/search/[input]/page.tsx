"use client";

import ResultItem from "@/components/ResultItem";
import { SearchBar } from "@/components/SearchBar";
import { ResultsPagination } from "@/components/ResultsPagination";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { SideFilter } from "@/components/SideFilter";
import { PersonItem } from "@/components/PersonItem";

type Params = { params: { input: string } };

export default function SearchPage({ params }: Params) {
    const [results, setResults] = useState({
        movie: [],
        tv: [],
        person: [],
    });
    const [pages, setPages] = useState({
        current: 1,
        total: {
            movie: 0,
            tv: 0,
            person: 0,
        },
    });
    const [totalResults, setTotalResults] = useState({
        movie: 0,
        tv: 0,
        person: 0,
    });
    const [type, setType] = useState<MediaTypes>("movie");

    useEffect(() => {
        (async function searchByTitle(types: MediaTypes[]) {
            types.forEach(async (type) => {
                const { data } = await api.post(`/search/${type}`, {
                    query: params.input,
                    language: navigator.language,
                    page: pages.current,
                });

                setResults((s) => ({ ...s, [type]: data.results }));
                setPages((s) => ({
                    current: data.page,
                    total: {
                        ...s.total,
                        [type]: data.total_pages,
                    },
                }));
                setTotalResults((s) => ({
                    ...s,
                    [type]: data.total_results,
                }));
            });
        })(["movie", "tv", "person"]);
    }, []);

    useEffect(() => {
        (async function searchByTitle() {
            const { data } = await api.post(`/search/${type}`, {
                query: params.input,
                language: navigator.language,
                page: pages.current,
            });
            setResults((s) => ({ ...s, [type]: data.results }));
        })();
    }, [pages]);

    const changeType = (type: MediaTypes) => {
        setType(type);
        setPages((s) => ({ ...s, current: 1 }));
    };

    const changePage = (page: number) => {
        setPages((s) => ({
            ...s,
            current: page,
        }));
    };

    return (
        <main className="p-6">
            <SearchBar movieTitle={params.input} />
            <div className="flex gap-6 mt-12">
                <SideFilter totalResults={totalResults} onFilter={changeType} />
                {!!results[type]?.length ? (
                    <ul
                        className={`${
                            type === "person"
                                ? "grid gap-6 grid-cols-4"
                                : "space-y-5"
                        }`}
                    >
                        {results[type].map((r: any) =>
                            type !== "person" ? (
                                <li>
                                    <ResultItem info={r} key={r.id} />
                                </li>
                            ) : (
                                <li>
                                    <PersonItem data={r} key={r.id} />
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <p className="text-lg font-semibold">
                        No results matching query
                    </p>
                )}
            </div>
            {results[type].length >= 20 && (
                <ResultsPagination
                    currentPage={pages.current}
                    lastPage={pages.total[type]}
                    setPage={changePage}
                />
            )}
        </main>
    );
}
