import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
	query?: string;
	className?: string;
};

export function SearchBar({ query, className }: Props) {
	const [input, setInput] = useState(query?.replaceAll("%20", " ") || "");
	const router = useRouter();

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/search/${input}`);
	};

	return (
		<form
			onSubmit={submitHandler}
			className={cn("max-w-lg w-full", className)}
		>
			<div className="flex items-center">
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Search for a movie, tv series or person"
					className="placeholder:text-xs md:placeholder:text-base py-4 rounded-r-none focus-visible:ring-0 focus-visible:border-primary"
				/>
				<Button type="submit" className="rounded-l-none">
					<MagnifyingGlassIcon width={20} height={20} />
				</Button>
			</div>
		</form>
	);
}
