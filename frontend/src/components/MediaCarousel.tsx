import { ReactNode, useRef } from "react";
import { Button } from "./ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	className?: string;
};
export function MediaCarousel({ children, className }: Props) {
	const carouselContainer = useRef<HTMLDivElement>(null);
	const carousel = useRef<HTMLDivElement>(null);

	const scrollHandler = (direction: "LEFT" | "RIGHT") => {
		if (!carouselContainer.current || !carousel.current) return;
		const width = carouselContainer.current.getBoundingClientRect().width;
		carousel.current.scrollBy({
			left: direction === "RIGHT" ? width : -width,
		});
	};

	return (
		<div
			ref={carouselContainer}
			className={cn("max-w-full relative", className)}
		>
			<div
				ref={carousel}
				className="flex items-center gap-x-4 py-4 overflow-x-scroll"
			>
				{children}
			</div>
			<div className="flex justify-between absolute left-2 right-2 top-1/2 -translate-y-1/2">
				<Button
					onClick={() => scrollHandler("LEFT")}
					className="bg-primary/50 rounded-full p-2 aspect-square backdrop-blur-md"
				>
					<CaretLeftIcon width={25} height={25} />
				</Button>
				<Button
					onClick={() => scrollHandler("RIGHT")}
					className="bg-primary/50 rounded-full p-2 aspect-square backdrop-blur-md"
				>
					<CaretRightIcon width={25} height={25} />
				</Button>
			</div>
		</div>
	);
}
