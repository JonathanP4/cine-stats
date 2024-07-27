import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
export function Searchbar({ className }: { className?: string }) {
	return (
		<form className={cn("max-w-lg w-full", className)}>
			<div className="flex items-center">
				<Input
					placeholder="Search for a movie, tv series or person"
					className="py-4 rounded-r-none focus-visible:ring-0 focus-visible:border-primary"
				/>
				<Button type="submit" className="rounded-l-none">
					<MagnifyingGlassIcon width={20} height={20} />
				</Button>
			</div>
		</form>
	);
}
