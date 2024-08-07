"use client";

import { MediaCard } from "@/components/MediaCard";
import { Auth } from "@/store/Auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

const db = getDatabase();

export default function BookmarksPage() {
	const [bookmarks, setBookmarks] = useState<any>();

	const { user } = Auth();

	useEffect(() => {
		(async function fetchBookmarks() {
			onValue(
				ref(db, `users/${user?.uid}/bookmarks`),
				(snapshot) => {
					if (!snapshot.exists()) return;

					const keys = Object.keys(snapshot.val());
					const bookmarks = keys.map((k) => snapshot.val()[k]);

					setBookmarks(bookmarks);
				},
				{ onlyOnce: true }
			);
		})();
	}, [user]);

	return (
		<main className="p-6">
			{bookmarks && (
				<ul className="grid grid-cols-2 gap-6 justify-items-center lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5">
					{bookmarks.map((b: any) => (
						<li className="max-w-[185px]">
							<MediaCard
								title={b?.title || b.name}
								id={b.id}
								imagePath={b.poster_path}
								media_type={b.media_type}
							/>
						</li>
					))}
				</ul>
			)}
			{!bookmarks && <h1 className="text-xl">You have no bookmarks</h1>}
		</main>
	);
}
