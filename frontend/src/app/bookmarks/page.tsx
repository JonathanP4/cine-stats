"use client";

import { useEffect, useState } from "react";
import { getUserBookmarks } from "@/lib/firedb";
import { Auth } from "@/store/Auth";
import Link from "next/link";
import { Card } from "@/components/trending/Card";

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
                    bookmarks.map((b: MovieData) => <Card data={b} />)}
            </div>
        </main>
    );
}
