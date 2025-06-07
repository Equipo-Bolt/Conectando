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

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if current page is greater than 2
    if (currentPage > 2) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page if it's not 1 or the last page
    if (currentPage > 1 && currentPage < totalPages) {
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink
            isActive={true}
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis before last page if there's a gap
    if (currentPage < totalPages - 1 && totalPages > 2) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there are more than 1 page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}