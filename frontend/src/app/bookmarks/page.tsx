"use client";

import { useEffect, useState } from "react";
import { getUserBookmarks } from "@/lib/firedb";
import { Auth } from "@/store/Auth";
import Link from "next/link";

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState<any>([]);
    const { user } = Auth();
    useEffect(() => {
        (async function () {
            if (!user) return;
            const data = await getUserBookmarks(user.uid);
            const keys = Object.keys(data);
            const bookmarksData = keys.map((k) => data[k]);
            setBookmarks(bookmarksData);
        })();
    }, []);

    return (
        <main>
            {!bookmarks.length && (
                <div className={"m-6 max-w-md"}>
                    <h1 className={"font-bold text-2xl"}>
                        You have no bookmarks :/
                    </h1>
                    <p className={"ml-4 text-white/60 mt-2"}>
                        find some good movies and bookmark them!
                    </p>
                </div>
            )}
            <div
                className={
                    "grid grid-cols-2 p-4 justify-items-center gap-4 md:grid-cols-4 md:p-6 lg:grid-cols-6"
                }
            >
                {!!bookmarks.length &&
                    bookmarks.map((b: MovieData) => (
                        <Link href={`/movie/${b.id}?type=${b.title}`}>
                            <div
                                className={
                                    "grid max-w-[200px] min-h-[322px] w-full bg-secondary rounded-md p-2 transition-all hover:shadow-[-10px_10px_15px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:-translate-y-1"
                                }
                            >
                                <figure>
                                    <img
                                        className={
                                            "rounded-t-md h-[250px] object-cover"
                                        }
                                        src={b.backdrop_path}
                                        alt={`${b.title} cover image`}
                                    />
                                </figure>

                                <p
                                    className={
                                        "line-clamp-2 font-semibold self-center text-center"
                                    }
                                >
                                    {b.title}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </main>
    );
}
