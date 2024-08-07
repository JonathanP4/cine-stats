"use client";

import { MediaCard } from "@/components/MediaCard";
import { MediaCarousel } from "@/components/MediaCarousel";
import { SearchBar } from "@/components/SearchBar";
import { TimeFrameSelector } from "@/components/TimeFrameSelector";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

type TimeFrameState = {
	movie: TimeFrames;
	tv: TimeFrames;
	person: TimeFrames;
};

export default function Home() {
	const [movieData, setMovieData] = useState<any>([]);
	const [tvData, setTvData] = useState<any>([]);
	const [personData, setPersonData] = useState<any>([]);

	const [currentMediaType, setCurrentMediaType] =
		useState<MediaTypes>("movie");
	const [timeFrame, setTimeFrame] = useState<TimeFrameState>({
		movie: "day",
		tv: "day",
		person: "day",
	});

	const fetchTrending = async (type: MediaTypes) => {
		try {
			const { data } = await api.post("/trending", {
				media_type: type,
				time_frame: timeFrame[type],
				language: navigator.language,
			});

			switch (type) {
				case "movie":
					setMovieData(data);
					break;
				case "tv":
					setTvData(data);
					break;
				default:
					setPersonData(data);
					break;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const changeTimeFrame = (timeFrame: TimeFrames, mediaType: MediaTypes) => {
		setTimeFrame((s) => ({ ...s, [mediaType]: timeFrame }));
		setCurrentMediaType(mediaType);
	};

	useEffect(() => {
		["movie", "tv", "person"].forEach((t: any) => fetchTrending(t));
	}, []);

	useEffect(() => {
		fetchTrending(currentMediaType);
	}, [timeFrame, currentMediaType]);

	return (
		<main className="p-6 space-y-10">
			<SearchBar className="m-auto" />
			{movieData?.results && (
				<section>
					<h1 className="text-2xl font-semibold mb-4 md:text-3xl">
						Trending Movies
					</h1>
					<TimeFrameSelector
						timeFrame={timeFrame.movie}
						mediaType="movie"
						changeTimeFrame={changeTimeFrame}
					/>
					<MediaCarousel>
						{movieData.results.map((r: any) => (
							<MediaCard
								key={r.id}
								id={r.id}
								media_type={r.media_type}
								title={r.title}
								releaseDate={r.release_date}
								imagePath={r.poster_path}
							/>
						))}
					</MediaCarousel>
				</section>
			)}
			{tvData?.results && (
				<section>
					<h1 className="text-2xl font-semibold mb-4 md:text-3xl">
						Trending Tv Series
					</h1>
					<TimeFrameSelector
						timeFrame={timeFrame.tv}
						mediaType="tv"
						changeTimeFrame={changeTimeFrame}
					/>
					<MediaCarousel>
						{tvData.results.map((r: any) => (
							<MediaCard
								key={r.id}
								id={r.id}
								media_type={r.media_type}
								title={r.name}
								releaseDate={r.first_air_date}
								imagePath={r.poster_path}
							/>
						))}
					</MediaCarousel>
				</section>
			)}
			{personData?.results && (
				<section>
					<h1 className="text-2xl font-semibold mb-4 md:text-3xl">
						Popular People
					</h1>
					<TimeFrameSelector
						timeFrame={timeFrame.person}
						mediaType="person"
						changeTimeFrame={changeTimeFrame}
					/>
					<MediaCarousel>
						{personData.results.map((r: any) => (
							<MediaCard
								key={r.id}
								id={r.id}
								media_type={r.media_type}
								title={r.name}
								known_for={r.known_for}
								imagePath={r.profile_path}
							/>
						))}
					</MediaCarousel>
				</section>
			)}
		</main>
	);
}
