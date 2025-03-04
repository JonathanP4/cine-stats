import { ScaleLoader } from "react-spinners";
export default function Loading() {
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<ScaleLoader color="#424e61" />
		</div>
	);
}
