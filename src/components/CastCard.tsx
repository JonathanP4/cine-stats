import { BASE_IMG_URL } from "./ResultItem";

export function CastCard({ cast }: { cast: any }) {
    return (
        <div className="rounded-md min-w-[150px]">
            <figure className="overflow-hidden rounded-md">
                <img
                    className="rounded-t-md transition-all duration-300 min-h-[225px] object-cover hover:scale-105"
                    src={
                        cast.profile_path
                            ? BASE_IMG_URL + cast.profile_path
                            : "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg"
                    }
                    alt={cast.original_name}
                />
            </figure>
            <div className="p-2 bg-secondary rounded-b-md">
                <h3
                    className="text font-semibold line-clamp-1"
                    title={
                        cast.original_name.length > 16 ? cast.original_name : ""
                    }
                >
                    {cast.original_name}
                </h3>
                <p
                    className="text-xs opacity-70 line-clamp-1"
                    title={cast.original_name.length > 19 ? cast.character : ""}
                >
                    {cast.character}
                </p>
            </div>
        </div>
    );
}
