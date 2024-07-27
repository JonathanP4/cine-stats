import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
	page: number;
	last: number;
	setPage: (page: number) => void;
};

export function ResultsPagiation({ page, last, setPage }: Props) {
	let pageArr;

	if (page !== last) pageArr = [page, page + 1, page + 2];
	else pageArr = [page - 2, page - 1, page];

	return (
		<Pagination className="mt-6 select-none">
			<PaginationContent>
				{page > 1 && (
					<PaginationItem>
						<PaginationPrevious onClick={() => setPage(page - 1)} />
					</PaginationItem>
				)}

				{pageArr.map((p) => (
					<PaginationItem className="cursor-pointer" key={p}>
						<PaginationLink
							onClick={() => setPage(p)}
							isActive={p === page}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}

				{page < last - 2 && (
					<>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem className="cursor-pointer" key={last}>
							<PaginationLink
								onClick={() => setPage(last)}
								isActive={page === last}
							>
								{last}
							</PaginationLink>
						</PaginationItem>

						<PaginationItem className="cursor-pointer">
							<PaginationNext onClick={() => setPage(page + 1)} />
						</PaginationItem>
					</>
				)}
			</PaginationContent>
		</Pagination>
	);
}
