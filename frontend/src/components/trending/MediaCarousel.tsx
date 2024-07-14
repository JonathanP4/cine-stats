import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { MouseEvent, ReactNode, useRef } from "react";

type Props = {
    children: ReactNode;
    type?: MediaTypes;
    containerWidth?: number;
    timeFrame?: TimeFrames;
    changeTimeFrame?: (timeFrame: TimeFrames, type: MediaTypes) => void;
    className?: string;
};

export function MediaCarousel({
    children,
    className,
    timeFrame,
    containerWidth,
    type,
    changeTimeFrame,
}: Props) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const slideHandler = (e: MouseEvent) => {
        if (!carouselRef.current) return;
        const innerWidth = containerWidth || window.innerWidth;
        const name = (e.target as HTMLButtonElement).name as "left" | "right";

        carouselRef.current.scrollBy({
            left: name === "right" ? innerWidth : -innerWidth,
            behavior: "smooth",
        });
    };

    const clickHandler = (e: MouseEvent) => {
        const name = (e.target as HTMLButtonElement).name as TimeFrames;
        if (changeTimeFrame && type) changeTimeFrame(name, type);
    };

    return (
        <>
            {timeFrame && (
                <div className="flex items-center p-1 w-fit rounded-lg bg-secondary">
                    <button
                        name="day"
                        onClick={clickHandler}
                        className={`${
                            timeFrame === "day" &&
                            "bg-gradient-to-br from-sky-400 to-secondary/40"
                        } px-2 rounded-l-md`}
                    >
                        Today
                    </button>
                    <button
                        name="week"
                        onClick={clickHandler}
                        className={`${
                            timeFrame === "week" &&
                            "bg-gradient-to-br from-sky-400 to-secondary/40"
                        } px-2 rounded-r-md`}
                    >
                        Week
                    </button>
                </div>
            )}

            <div className={`relative ${className || ""}`}>
                <div
                    ref={carouselRef}
                    className="media-carousel overflow-x-scroll relative transition-all"
                >
                    <div className="flex items-center gap-4">{children}</div>
                </div>
                <div className="text-2xl flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4">
                    <button
                        name="left"
                        onClick={slideHandler}
                        className={`bg-secondary/40 p-1 rounded-full backdrop-blur-sm`}
                    >
                        <CaretLeftIcon
                            width={30}
                            height={30}
                            className="pointer-events-none"
                        />
                    </button>
                    <button
                        name="right"
                        onClick={slideHandler}
                        className={`bg-secondary/40 p-1 rounded-full backdrop-blur-sm`}
                    >
                        <CaretRightIcon
                            width={30}
                            height={30}
                            className="pointer-events-none"
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
