'use client';

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export function PaginationMod({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Функция для создания URL с параметрами
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Получаем видимые страницы для отображения
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      window.location.href = createPageURL(page);
    }
  };

  return (
    <Pagination className="pt-10">
      <PaginationContent className="flex-wrap">
        {/* Previous Button */ }
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={ (e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            } }
          />
        </PaginationItem>

        {/* First Page + Ellipsis (если текущая страница далеко от начала) */ }
        { visiblePages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={ (e) => {
                  e.preventDefault();
                  handlePageChange(1);
                } }
              >
                1
              </PaginationLink>
            </PaginationItem>
            { visiblePages[0] > 2 && <PaginationEllipsis /> }
          </>
        ) }

        {/* Visible Pages */ }
        { visiblePages.map((page) => (
          <PaginationItem key={ page }>
            <PaginationLink
              href="#"
              onClick={ (e) => {
                e.preventDefault();
                handlePageChange(page);
              } }
              isActive={ page === currentPage }
            >
              { page }
            </PaginationLink>
          </PaginationItem>
        )) }

        {/* Last Page + Ellipsis (если текущая страница далеко от конца) */ }
        { visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            { visiblePages[visiblePages.length - 1] < totalPages - 1 && <PaginationEllipsis /> }
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={ (e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                } }
              >
                { totalPages }
              </PaginationLink>
            </PaginationItem>
          </>
        ) }

        {/* Next Button */ }
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={ (e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            } }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
