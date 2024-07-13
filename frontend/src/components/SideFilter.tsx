import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import Link from "next/link";

type Props = {
    totalResults: {
        movie: number;
        tv: number;
        people: number;
    };
    onFilter: (type: MediaTypes) => void;
};

export function SideFilter({ onFilter, totalResults }: Props) {
    const filterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value as MediaTypes;
        onFilter(value);
    };

    return (
        <aside
            className={
                "min-w-[200px] w-full max-h-[210px] mb-6 md:max-w-[200px] md:mb-0"
            }
        >
            <div
                className={
                    "flex items-center px-4 py-2 md:p-4 gap-2 bg-primary text-background rounded-t-md"
                }
            >
                <h1 className={"text-xl"}>Filter</h1>
                <MixerHorizontalIcon />
            </div>
            <div className={"bg-secondary rounded-md"}>
                <RadioGroup
                    defaultValue="movie"
                    className={"py-4 px-6 grid grid-cols-2 md:grid-cols-1"}
                >
                    <div className={"flex items-center"}>
                        <RadioGroupItem
                            onClick={filterHandler}
                            value={"movie"}
                            id={"movie"}
                        />
                        <Label htmlFor={"movie"} className={"ml-2 text-md"}>
                            Movie
                        </Label>
                        <span className="text-primary/50 ml-1">
                            ({totalResults.movie})
                        </span>
                    </div>
                    <div className={"flex items-center"}>
                        <RadioGroupItem
                            onClick={filterHandler}
                            value={"tv"}
                            id={"tv"}
                        />
                        <Label htmlFor={"tv"} className={"ml-2 text-md"}>
                            TV Series
                        </Label>
                        <span className="text-primary/50 ml-1">
                            ({totalResults.tv})
                        </span>
                    </div>
                    <div className={"flex items-center"}>
                        <RadioGroupItem
                            onClick={filterHandler}
                            value={"people"}
                            id={"people"}
                        />
                        <Label htmlFor={"people"} className={"ml-2 text-md"}>
                            People
                        </Label>
                        <span className="text-primary/50 ml-1">
                            ({totalResults.people})
                        </span>
                    </div>
                </RadioGroup>
            </div>
            <div className={"text-slate-500 text-xs mt-1"}>
                Coded By{" "}
                <Link
                    className={
                        "text-slate-400 hover:tracking-widest transition-all"
                    }
                    href={"https://github.com/JohnP404"}
                >
                    Jonathan
                </Link>
            </div>
        </aside>
    );
}
