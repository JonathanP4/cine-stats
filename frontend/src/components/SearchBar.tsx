import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchBar.css";

type Props = { movieTitle?: string };

export function SearchBar({ movieTitle }: Props) {
    const [searchInput, setSearchInput] = useState(
        movieTitle?.replaceAll("%20", " ")
    );
    const router = useRouter();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search/${searchInput}`);
    };

    return (
        <div className={`flex justify-center items-center`}>
            <form
                onSubmit={submitHandler}
                className="animate-in bg-secondary rounded-md p-1 flex items-center w-full max-w-[500px]"
            >
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="rounded-r-none"
                />
                <Button
                    type="submit"
                    className="rounded-l-none hidden bg-transparent hover:bg-transparent"
                ></Button>
                <MagnifyingGlassIcon
                    className="cursor-pointer mx-2"
                    width={30}
                    height={30}
                    color="white"
                />
            </form>
        </div>
    );
}
