import Image from "next/image";
import { BASE_IMG_URL } from "./ResultItem";

type Props = {
    data: any;
};
export function PersonItem({ data }: Props) {
    return (
        <div className="w-[185px]">
            <figure className="rounded-t-md h-[250px] overflow-hidden">
                <Image
                    className="rounded-t-md "
                    src={BASE_IMG_URL + data.profile_path}
                    width={185}
                    height={277}
                    alt={data.name + " picture"}
                />
            </figure>
            <div className="p-2 bg-secondary rounded-b-md h-[112px]">
                <h2 className="font-semibold text-lg leading-none mb-1">
                    {data.name}
                </h2>
                {data.known_for.length > 0 && (
                    <>
                        <p className="text-sm">Known for:</p>

                        <span className="text-xs line-clamp-3 text-primary/70">
                            {data.known_for
                                .slice(0, 3)
                                .map((m: any) => m.title)
                                .join(", ")}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
