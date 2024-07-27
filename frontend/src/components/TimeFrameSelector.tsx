import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";

type Props = {
	mediaType: MediaTypes;
	timeFrame: TimeFrames;
	changeTimeFrame: (timeFrame: TimeFrames, mediaType: MediaTypes) => void;
};

export function TimeFrameSelector({
	changeTimeFrame,
	timeFrame,
	mediaType,
}: Props) {
	const clickHanlder = (e: MouseEvent) => {
		const target = e.target as HTMLButtonElement;
		const name = target.name as TimeFrames;

		changeTimeFrame(name, mediaType);
	};

	return (
		<div className={"flex items-center max-w-[150px]"}>
			<Button
				onClick={clickHanlder}
				name="day"
				className={`h-8 flex-1 border border-primary/30 rounded-r-none  ${
					timeFrame !== "day"
						? "bg-transparent text-white hover:bg-primary/20"
						: ""
				}`}
			>
				Day
			</Button>
			<Button
				onClick={clickHanlder}
				name="week"
				className={`h-8 flex-1 border border-primary/30 rounded-l-none  ${
					timeFrame !== "week"
						? "bg-transparent text-white hover:bg-primary/20"
						: ""
				}`}
			>
				Week
			</Button>
		</div>
	);
}
