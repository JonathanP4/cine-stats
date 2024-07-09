import { Puff } from "react-loader-spinner";

export function LoadingSpinner() {
    return (
        <div
            className={
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }
        >
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#1e2839"
                ariaLabel="puff-loading"
            />
        </div>
    );
}
