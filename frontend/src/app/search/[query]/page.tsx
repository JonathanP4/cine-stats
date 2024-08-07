"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ResultCard } from "@/components/ResultCard";
import { SearchBar } from "@/components/SearchBar";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { MediaCard } from "@/components/MediaCard";
import { useInView } from "react-intersection-observer";
import { ScaleLoader } from "react-spinners";

type Params = {
	params: { query: string };
};

export default function SerachPage({ params }: Params) {
	const [page, setPage] = useState(1);
	const [tmdbData, setTmdbData] = useState<any[]>([]);
	const [mediaType, setMediaType] = useState("movie");

	const { ref, inView } = useInView({ threshold: 0.8 });

	const fetchSearchResults = async () => {
		if (page >= 500) return;

		const { data } = await api.post("/search", {
			query: params.query,
			language: navigator.language,
			page,
			media_type: mediaType,
		});

		setTmdbData((prev) => {
			if (page > 1) {
				return prev.concat(data.results);
			} else {
				return data.results;
			}
		});
	};

	useEffect(() => {
		fetchSearchResults();
	}, [page]);

	useEffect(() => {
		setPage(1);
		setTmdbData([]);
		fetchSearchResults();
	}, [mediaType]);

	if (!tmdbData) return <LoadingSpinner />;

	useEffect(() => {
		setPage((p) => p + 1);
	}, [inView]);

	return (
		<main className="p-6">
			<SearchBar query={params.query} className="m-auto" />

			<div className="flex flex-col gap-x-6 mt-12 md:flex-row">
				<section>
					<h1 className="bg-slate-500 px-4 py-2 rounded-t-md text-xl flex justify-between items-center">
						Filter
						<IoFilter />
					</h1>
					<RadioGroup
						defaultValue="movies"
						className="bg-secondary mb-8 p-6 rounded-b-md text-lg md:w-[200px]"
					>
						<div className="flex items-center">
							<RadioGroupItem
								onClick={(e) =>
									setMediaType((e.target as HTMLElement).id)
								}
								value="movie"
								id="movie"
								checked={mediaType === "movie"}
							/>
							<Label className="text-base ml-2" htmlFor="movie">
								Movies
							</Label>
						</div>
						<div className="flex items-center">
							<RadioGroupItem
								onClick={(e) =>
									setMediaType((e.target as HTMLElement).id)
								}
								value="tv"
								id="tv"
								checked={mediaType === "tv"}
							/>
							<Label className="text-base ml-2" htmlFor="tv">
								Tv Series
							</Label>
						</div>
						<div className="flex items-center ">
							<RadioGroupItem
								onClick={(e) =>
									setMediaType((e.target as HTMLElement).id)
								}
								value="person"
								id="person"
								checked={mediaType === "person"}
							/>
							<Label className="text-base ml-2" htmlFor="person">
								People
							</Label>
						</div>
					</RadioGroup>
				</section>
				{!!tmdbData.length && (
					<section>
						{mediaType !== "person" ? (
							<ul className="space-y-6">
								{tmdbData.map((r: any) => (
									<ResultCard
										key={r.id}
										id={r.id}
										imagePath={r.poster_path}
										mediaType={mediaType}
										overview={r.overview}
										title={r?.title || r.name}
										releaseDate={
											r?.release_date || r.first_air_date
										}
									/>
								))}
							</ul>
						) : (
							<ul className="grid grid-cols-2 gap-6 justify-items-center lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5">
								{tmdbData.map((r: any) => (
									<li>
										<MediaCard
											imagePath={r.profile_path}
											media_type="person"
											title={r.name}
											id={r.id}
										/>
									</li>
								))}
							</ul>
						)}

						{page < 500 && (
							<div ref={ref} className="flex justify-center mt-6">
								<ScaleLoader color="#424e61" />
							</div>
						)}
					</section>
				)}
			</div>
		</main>
	);
}
