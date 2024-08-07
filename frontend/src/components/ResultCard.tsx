import Image from "next/image";
import { DateTime } from "luxon";
import Link from "next/link";

type Props = {
	title: string;
	imagePath: string;
	overview: string;
	releaseDate: string;
	mediaType: string;
	id: number;
};

export function ResultCard({
	title,
	imagePath,
	overview,
	releaseDate,
	mediaType,
	id,
}: Props) {
	return (
		<li className="text-sm rounded-md bg-secondary shadow-lg shadow-white/15 md:text-base">
			<Link
				className="flex items-center gap-x-4"
				href={`/${mediaType}/${id}`}
			>
				<figure className="rounded-l-md w-[94px] h-[141px]">
					<img
						src={`${
							imagePath
								? `https://image.tmdb.org/t/p/original/${imagePath}`
								: "/images/placeholder.png"
						}`}
						className="rounded-l-md min-w-[94px] min-h-[141px] object-cover"
						width={94}
						height={141}
						alt={title}
					/>
				</figure>
				<div className="pr-4">
					<h1 className="text-lg font-semibold line-clamp-2">
						{title}
					</h1>
					<p className="line-clamp-2">
						{overview || "No overview avaliable"}
					</p>
					<p className="text-sm text-primary/70">
						{DateTime.fromISO(releaseDate).toLocaleString({
							dateStyle: "medium",
						})}
					</p>
				</div>
			</Link>
		</li>
	);
}
