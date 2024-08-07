"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MediaCard } from "@/components/MediaCard";
import { MediaCarousel } from "@/components/MediaCarousel";
import { ResultCard } from "@/components/ResultCard";
import { getBookmark, updateUserBookmarks } from "@/firebase/db";
import { api } from "@/lib/axios";
import { Auth } from "@/store/Auth";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
	params: { id: string };
};

export default function DetailsPage({ params }: Props) {
	const [data, setData] = useState<any>();
	const [bookmark, setBookmark] = useState(false);

	const { user } = Auth();

	const fetchMediaInfo = async () => {
		const { data } = await api.post("/details", {
			media_type: "tv",
			id: params.id,
			language: navigator.language,
			append_to_response:
				"credits,recommendations,images,keywords,videos,release_dates",
		});
		setData(data);
	};

	useEffect(() => {
		fetchMediaInfo();
	}, []);

	useEffect(() => {
		async function bookmarkExists() {
			if (!user || !data) return;
			const exists = await getBookmark(user.uid, data.id);
			console.log(exists);

			setBookmark(!!exists);
		}
		bookmarkExists();
	}, [user, data]);

	useEffect(() => {
		if (!user || !data) return;
		const fullData = { ...data, media_type: "movie" };
		updateUserBookmarks(user.uid, data.id, bookmark ? fullData : null);
	}, [bookmark, data]);

	if (!data) return <LoadingSpinner />;

	const voteAvg = Math.round((data?.vote_average || 0) * 10);
	const ageRating = data?.release_dates?.results
		?.filter(
			(r: any) =>
				r.iso_3166_1 ===
				(navigator.language.split("-")[1] ||
					navigator.language.toUpperCase())
		)[0]
		?.release_dates.filter((rd: any) => rd.certification !== "")[0];

	const intlCurrency = new Intl.NumberFormat(navigator.language, {
		currency: "usd",
		style: "currency",
	});
	const getDisplayName = new Intl.DisplayNames(navigator.language, {
		style: "long",
		type: "language",
	});

	let strokeColor = "";

	if (voteAvg >= 60) {
		strokeColor = "rgba(0,255,0,0.8)";
	} else if (voteAvg < 60 && voteAvg >= 50) {
		strokeColor = "rgba(255,255,0,0.8)";
	} else {
		strokeColor = "rgba(255,0,0,0.8)";
	}

	const crew = {
		director: data.credits.crew.filter((c: any) => c.job === "Director")[0]
			?.name,
		producer: data.credits.crew.filter((c: any) => c.job === "Producer")[0]
			?.name,
		characters: data.credits.crew.filter(
			(c: any) => c.job === "Characters"
		)[0]?.name,
		writer: data.credits.crew.filter((c: any) => c.job === "Writer")[0]
			?.name,
	};

	return (
		<main className="relative text-sm md:text-base">
			<img
				className="fixed -z-10 opacity-20 top-0 left-0"
				src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
				alt="a"
				width={1376}
				height={500}
			/>
			<section className="flex flex-col md:flex-row gap-8 p-8">
				<figure className="rounded-md">
					{user && (
						<div
							onClick={() => setBookmark((s) => !s)}
							className="absolute m-2 bg-secondary/50 rounded-full p-2 cursor-pointer"
						>
							{bookmark ? (
								<HeartFilledIcon
									color="#ff0000"
									width={25}
									height={25}
								/>
							) : (
								<HeartIcon width={25} height={25} />
							)}
						</div>
					)}
					<img
						className="rounded-md m-auto"
						src={
							data?.poster_path
								? "https://image.tmdb.org/t/p/w342" +
								  data.poster_path
								: "/images/placeholder.png"
						}
						width={300}
						height={450}
						alt={data.title + " poster"}
					/>
				</figure>
				<div className="basis-[70%]">
					<div>
						{data.name && (
							<h1 className="text-3xl font-bold mb-1">
								{data.name}
								<span className="text-primary/40 font-normal ml-2">
									(
									{DateTime.fromISO(data.first_air_date).get(
										"year"
									)}
									)
								</span>
							</h1>
						)}
						<dl className="flex items-center text-sm flex-wrap">
							{ageRating?.certification && (
								<dd className="border border-primary/30 px-2 rounded-sm">
									{ageRating.certification}
								</dd>
							)}
							{data?.first_air_date && (
								<dd className="ml-2">
									{DateTime.fromISO(
										data.first_air_date
									).toLocaleString({
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									})}
								</dd>
							)}
							{!!data?.genres?.length && (
								<>
									<span className="mx-2">|</span>
									<dd>
										{data.genres
											.map((g: any) => g.name)
											.join(",")}
									</dd>
									<span className="mx-2">|</span>
								</>
							)}
							{data?.runtime && (
								<dd>
									{Math.round(data.runtime / 60)}h{" "}
									{data.runtime % 60}m
								</dd>
							)}
						</dl>
					</div>
					<div className="m-auto w-[140px] flex items-center gap-2 my-6 md:mx-0">
						<CircularProgressbar
							background
							value={voteAvg}
							text={`${voteAvg}%`}
							styles={{
								path: {
									stroke: strokeColor,
									strokeLinecap: "round",
								},
								trail: {
									stroke: "rgba(0,0,0,0)",
								},
								text: {
									fill: strokeColor,
								},

								background: {
									fill: "rgba(25,25,25)",
								},
							}}
						/>
						<span className="font-bold">Score</span>
					</div>
					{data?.tagline && (
						<p className="text-sm text-primary/60 italic">
							{data.tagline}
						</p>
					)}
					<h3 className="font-bold mt-2">Overview</h3>
					<p className="max-w-4xl text-justify">
						{data.overview || "No overview avaliable"}
					</p>
					{!!data?.credits?.crew?.length && (
						<dl className="grid grid-cols-3 gap-5 mt-8 text-sm">
							{crew?.director && (
								<dd>
									<h3 className="font-semibold">Director</h3>
									{crew.director}
								</dd>
							)}
							{crew?.producer && (
								<dd>
									<h3 className="font-semibold">Producer</h3>
									{crew.producer}
								</dd>
							)}
							{crew?.writer && (
								<dd>
									<h3 className="font-semibold">Writer</h3>
									{crew.writer}
								</dd>
							)}
							{crew?.characters && (
								<dd>
									<h3 className="font-semibold">
										Characters
									</h3>
									{crew.characters}
								</dd>
							)}
						</dl>
					)}
				</div>
			</section>
			<div className="bg-background/65 p-6 mt-12">
				{!!data?.credits?.cast?.length && (
					<section className="my-12">
						<h2 className="text-2xl font-bold">Cast</h2>
						<MediaCarousel>
							{data.credits.cast.map((c: any) => (
								<MediaCard
									id={c.id}
									media_type="person"
									imagePath={c.profile_path}
									title={c.name}
									character={c.character}
									key={c.id}
								/>
							))}
						</MediaCarousel>
					</section>
				)}
				{!!data?.videos?.results?.length && (
					<section className="flex flex-col my-20 justify-evenly lg:flex-row">
						<div className="flex flex-col justify-self-center md:space-x-8 md:flex-row">
							<div>
								<h2 className="text-2xl font-bold mb-4">
									Latest Video
								</h2>
								<iframe
									className="rounded-lg max-w-[300px] max-h-[260px] sm:max-w-[560px] sm:max-h-[315px]"
									width="560"
									height="315"
									src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								></iframe>
							</div>
							<dl className="grid grid-cols-2 items-baseline gap-y-4 my-6 md:block md:space-y-6 md:mt-12">
								<dd>
									<h3 className="font-semibold">Status</h3>
									<p>{data.status}</p>
								</dd>
								<dd>
									<h3 className="font-semibold">
										Original Language
									</h3>
									<p>
										{getDisplayName.of(
											data.original_language
										)}
									</p>
								</dd>
								<dd>
									<h3 className="font-semibold">Budget</h3>
									<p>{intlCurrency.format(data.budget)}</p>
								</dd>
								<dd>
									<h3 className="font-semibold">Revenue</h3>
									<p>{intlCurrency.format(data.revenue)}</p>
								</dd>
							</dl>
						</div>
						{!!data?.keywords?.results?.length && (
							<div className="bg-secondary p-4 rounded-md max-w-[300px]">
								<h2 className="text-2xl font-bold mb-4">
									Keywords
								</h2>
								<ul className="flex flex-wrap gap-2 ">
									{data.keywords.results.map((k: any) => (
										<li
											key={k.id}
											className="bg-primary/40 rounded-md w-fit px-2"
										>
											<Link
												href={`/search/keyword/${k.id}`}
											>
												{k.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</section>
				)}
				{!!data.recommendations.results.length && (
					<section>
						<h1 className="text-2xl font-semibold mb-4">
							You might also like
						</h1>
						<ul className="grid md:grid-cols-3 gap-6">
							{data.recommendations.results.map((r: any) => (
								<ResultCard
									id={r.id}
									imagePath={r.poster_path}
									title={r?.title || r.name}
									overview={r.overview}
									releaseDate={
										r?.release_date || r.first_air_date
									}
									mediaType={r.media_type}
								/>
							))}
						</ul>
					</section>
				)}
			</div>
		</main>
	);
}
