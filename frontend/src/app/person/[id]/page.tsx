"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { MediaCarousel } from "@/components/MediaCarousel";
import { MediaCard } from "@/components/MediaCard";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { DateTime } from "luxon";

type Params = {
	params: {
		id: string;
	};
};

export default function PersonDetailsPage({ params }: Params) {
	const [person, setPerson] = useState<any>();
	const [showFullBiography, setShowFullBiohraphy] = useState(false);

	const fetchPersonData = async () => {
		const { data } = await api.post("/details", {
			media_type: "person",
			id: params.id,
			language: navigator.language,
			append_to_response: "external_ids,images,combined_credits",
		});
		console.log(data);

		setPerson(data);
	};

	useEffect(() => {
		fetchPersonData();
	}, []);

	if (!person) return <LoadingSpinner />;

	let gender = "--";

	if (person?.gender) {
		if (person.gender === 1) gender = "Female";
		else if (person.gender === 2) gender = "Male";
		else gender = "Non Binary";
	}

	const age =
		Math.floor(
			DateTime.now()
				.diff(DateTime.fromISO(person.birthday), "years")
				.toObject().years || NaN
		) || "--";

	return (
		<main className="p-6">
			<div className="flex gap-x-6">
				<section>
					<figure className="min-w-[300px] rounded-md">
						<Image
							className="object-cover rounded-md"
							src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
							width={300}
							height={450}
							alt={person.name + " picture"}
						/>
					</figure>
					<div>
						{person?.external_ids && (
							<ul className="flex items-center gap-x-4 mt-4 mb-8">
								{person.external_ids?.facebook_id && (
									<li>
										<Link
											href={`https://www.facebook.com/${person.external_ids.facebook_id}`}
										>
											<FaFacebook size={30} />
										</Link>
									</li>
								)}
								{person.external_ids?.twitter_id && (
									<li>
										<Link
											href={`https://x.com/${person.external_ids.twitter_id}`}
										>
											<FaTwitter size={30} />
										</Link>
									</li>
								)}
								{person.external_ids.instagram_id && (
									<li>
										<Link
											href={`https://www.instagram.com/${person.external_ids.instagram_id}`}
										>
											<FaInstagram size={30} />
										</Link>
									</li>
								)}
							</ul>
						)}
						<h2 className="text-xl font-semibold mb-2">
							Personal Info
						</h2>
						<dl className="space-y-4">
							<dd>
								<dt className="font-semibold mb-1">
									Known For
								</dt>
								<p className="text-sm">
									{person.known_for_department}
								</p>
							</dd>
							<dd>
								<dt className="font-semibold mb-1">
									Known Credits
								</dt>
								<p className="text-sm">
									{person.known_for_department === "Acting"
										? person.combined_credits.cast.length
										: person.combined_credits.crew.length}
								</p>
							</dd>
							<dd>
								<dt className="font-semibold mb-1">Gender</dt>
								<p className="text-sm">{gender}</p>
							</dd>
							<dd>
								<dt className="font-semibold mb-1">Birthday</dt>
								<p className="text-sm">
									{DateTime.fromISO(
										person.birthday
									).toLocaleString({ dateStyle: "long" })}
									{` (${age} years old)`}
								</p>
							</dd>
							<dd>
								<dt className="font-semibold mb-1">
									Place of Birth
								</dt>
								<p className="text-sm">
									{person.place_of_birth}
								</p>
							</dd>
							<dd>
								<dt className="font-semibold mb-1">
									Alson Known As
								</dt>
								<ul className="space-y-3">
									{person.also_known_as.map((k: any) => (
										<li key={k} className="text-sm">
											{k}
										</li>
									))}
								</ul>
							</dd>
						</dl>
					</div>
				</section>
				<section className="max-w-[1000px] min-w-[400px] w-full">
					<h1 className="text-3xl font-bold mb-6">{person.name}</h1>
					<h2 className="text-lg font-semibold mb-2">Biography</h2>
					<p className={showFullBiography ? "" : "line-clamp-6"}>
						{person.biography || "No biohraphy avaliable"}
					</p>
					{person?.biography?.length > 719 && (
						<Button
							onClick={() => setShowFullBiohraphy((s) => !s)}
							className="bg-transparent hover:bg-transparent hover:text-blue-400 text-primary p-0"
						>
							{!showFullBiography ? "Read More" : "Show Less"}
							{!showFullBiography ? (
								<CaretDownIcon />
							) : (
								<CaretUpIcon />
							)}
						</Button>
					)}
					{person?.combined_credits?.cast && (
						<div className="max-w-full relative">
							<h2 className="text-lg font-semibold mb-1 mt-4">
								Appears on
							</h2>
							<MediaCarousel>
								{person?.known_for_department === "Acting"
									? person.combined_credits.cast
											.slice(0, 20)
											.map((c: any) => (
												<MediaCard
													key={c.id}
													id={c.id}
													media_type={c.media_type}
													imagePath={c.poster_path}
													title={c?.title || c.name}
													character={c.character}
												/>
											))
									: ""}
							</MediaCarousel>
						</div>
					)}
					{person?.images?.profiles && (
						<div className="max-w-full relative">
							<h2 className="text-lg font-semibold mt-8">
								Pictures
							</h2>

							<MediaCarousel>
								{person.images.profiles.map(
									(p: any, i: number) => (
										<Link
											key={p.file_path}
											href={`https://image.tmdb.org/t/p/original${p.file_path}`}
											target="_blank"
										>
											<figure className="overflow-hidden min-w-[200px] p-2 border-[2px] border-secondary rounded-md">
												<Image
													className="rounded-md hover:scale-105 transition-all"
													src={`https://image.tmdb.org/t/p/original${p.file_path}`}
													alt={"image " + i}
													width={200}
													height={265}
												/>
											</figure>
										</Link>
									)
								)}
							</MediaCarousel>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
