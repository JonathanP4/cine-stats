import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";

type Props = {
	id: number;
	imagePath: string;
	title: string;
	media_type: MediaTypes;
	releaseDate?: string;
	known_for?: any[];
	character?: string;
	height?: number;
};

export function MediaCard({
	id,
	imagePath,
	title,
	releaseDate,
	media_type,
	known_for,
	character,
}: Props) {
	return (
		<Link
			href={`/${media_type}/${id}`}
			className="rounded-md min-w-[185px] animate-in fade-in duration-500"
		>
			<figure className="rounded-t-md overflow-hidden">
				<Image
					className="transition-all duration-300 rounded-t-md hover:scale-105 min-h-[277.5px] object-cover"
					src={
						imagePath
							? "https://image.tmdb.org/t/p/original" + imagePath
							: "/images/placeholder.png"
					}
					alt={title}
					width={185}
					height={225}
				/>
			</figure>

			<div className={`bg-secondary p-3 rounded-b-md h-[92px]`}>
				<h3 className="font-semibold line-clamp-2">{title}</h3>
				{releaseDate && (
					<p className="text-sm text-primary/60">
						{DateTime.fromISO(releaseDate).toLocaleString({
							dateStyle: "medium",
						})}
					</p>
				)}
				{known_for && (
					<span className="text-sm text-primary/60 line-clamp-2">
						{known_for
							.slice(0, 3)
							.map((m: any) => m?.name || m.title)
							.join(", ")}
					</span>
				)}
				{character && (
					<span className="text-xs text-primary/60 line-clamp-1">
						{character}
					</span>
				)}
			</div>
		</Link>
	);
}
