"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ResultCard } from "@/components/ResultCard";
import { ResultsPagiation } from "@/components/ResultsPagination";
import { SearchBar } from "@/components/SearchBar";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { MediaCard } from "@/components/MediaCard";

type Params = {
	params: { query: string; page: string };
};

export default function SerachPage({ params }: Params) {
	console.log(params);

	const searchParams = useSearchParams();
	console.log(searchParams.get("page"));

	const [page, setPage] = useState(+searchParams.get("page")!);
	const [data, setData] = useState<any>();
	const [mediaType, setMediaType] = useState("movie");

	const pathName = usePathname();
	const router = useRouter();

	const fetchSearchResults = async () => {
		const { data } = await api.post("/search", {
			query: params.query,
			language: navigator.language,
			page,
			media_type: mediaType,
		});
		setData(data);
	};

	useEffect(() => {
		fetchSearchResults();
		router.push(`${pathName}?page=${page}`);
	}, [page, mediaType, searchParams]);

	if (!data) return <LoadingSpinner />;

	const changePage = (page: number) => {
		setPage(page);
	};

	return (
		<main className="p-6">
			<SearchBar query={params.query} className="m-auto" />
			{data?.results && (
				<div className="flex gap-x-6 mt-12">
					<section>
						<h1 className="bg-slate-500 px-4 py-2 rounded-t-md text-xl flex justify-between items-center">
							Filter
							<IoFilter />
						</h1>
						<RadioGroup
							defaultValue="movies"
							className="bg-secondary p-6 rounded-b-md text-lg w-[200px]"
						>
							<div className="flex items-center">
								<RadioGroupItem
									onClick={(e) =>
										setMediaType(
											(e.target as HTMLElement).id
										)
									}
									value="movie"
									id="movie"
									checked={mediaType === "movie"}
								/>
								<Label
									className="text-base ml-2"
									htmlFor="movie"
								>
									Movies
								</Label>
							</div>
							<div className="flex items-center">
								<RadioGroupItem
									onClick={(e) =>
										setMediaType(
											(e.target as HTMLElement).id
										)
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
										setMediaType(
											(e.target as HTMLElement).id
										)
									}
									value="person"
									id="person"
									checked={mediaType === "person"}
								/>
								<Label
									className="text-base ml-2"
									htmlFor="person"
								>
									People
								</Label>
							</div>
						</RadioGroup>
					</section>
					<section>
						{mediaType !== "person" ? (
							<ul className="space-y-6">
								{data.results.map((r: any) => (
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
							<ul className="grid grid-cols-5 gap-4 justify-items-center">
								{data.results.map((r: any) => (
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
						<ResultsPagiation
							setPage={changePage}
							page={page}
							last={data.total_pages}
						/>
					</section>
				</div>
			)}
		</main>
	);
}
