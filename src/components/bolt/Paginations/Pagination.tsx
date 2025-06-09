"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { ChevronFirst, ChevronLast } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function PaginationComponent({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => handlePageChange(1)}>
            <ChevronFirst className="size-sm" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>
        <PaginationItem className="px-[1rem]">
          {currentPage}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>

        <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            <ChevronLast className="size-sm" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}