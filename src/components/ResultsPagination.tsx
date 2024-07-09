import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useRef, useState } from "react";

type Props = {
    lastPage: number;
    currentPage: number;
    setPage: (p: number) => void;
};

export function ResultsPagination({ lastPage, setPage, currentPage }: Props) {
    const [pages, setPages] = useState([1, 2, 3]);
    const [showInput, setShowInput] = useState(false);
    const [count, setCount] = useState(1);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showInput && inputRef.current) inputRef.current.focus();
    }, [showInput]);

    useEffect(() => {
        setCount(currentPage % 3);
    }, [currentPage]);

    useEffect(() => {
        console.log(count);
    }, [count]);

    const clickHandler = (action: "PREV" | "NEXT") => {
        if (action === "PREV" && currentPage > 1) {
            if (count === 1) {
                setPages([currentPage - 3, currentPage - 2, currentPage - 1]);
            }
            setPage(currentPage - 1);
        }
        if (action === "NEXT" && currentPage < lastPage) {
            if (count === 0) {
                setPages([currentPage + 1, currentPage + 2, currentPage + 3]);
            }
            setPage(currentPage + 1);
        }
    };

    const changePage = (p: number) => {
        setPage(p);
    };

    const jumpToLast = () => {
        setPage(lastPage);
        setPages([lastPage - 2, lastPage - 1, lastPage]);
    };

    const jumpToFirst = () => {
        setPage(1);
        setPages([1, 2, 3]);
    };

    return (
        <Pagination className={"mt-6"}>
            <PaginationContent className={"cursor-pointer"}>
                <PaginationItem>
                    <PaginationPrevious onClick={() => clickHandler("PREV")} />
                </PaginationItem>
                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            onClick={() =>
                                p > 1 ? changePage(p) : jumpToFirst()
                            }
                            isActive={+currentPage === +p}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem className={"cursor-default"}>
                    {currentPage < lastPage - 1 && <PaginationEllipsis />}
                </PaginationItem>

                {currentPage <= lastPage - 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={jumpToLast}
                                isActive={currentPage === lastPage}
                            >
                                {lastPage}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem onClick={() => clickHandler("NEXT")}>
                            <PaginationNext />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </Pagination>
    );
}
