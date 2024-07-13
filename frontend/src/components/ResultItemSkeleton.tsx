import { Skeleton } from "@/components/ui/skeleton";

export function ResultItemSkeleton() {
    return (
        <div className={"flex w-full"}>
            <div className={"w-[100px]"}>
                <Skeleton className="w-[100px] h-[150px]" />
            </div>
            <div className="grid content-evenly px-4 w-full">
                <div>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className={"h-5 w-24 mt-2"} />
                </div>
                <div>
                    <Skeleton className="h-10" />
                </div>
            </div>
        </div>
    );
}
