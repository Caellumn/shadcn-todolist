import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getTotalPages,
  setCurrentPage,
} from "@/store/paginationSlice";
import store from "@/store";

const Pagination = () => {
  const currentPage = useSelector(getCurrentPage);
  const totalPages = useSelector(getTotalPages);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      store.dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      store.dispatch(setCurrentPage(currentPage + 1));
    }
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => store.dispatch(setCurrentPage(1))}
      >
        First
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <div className="text-sm">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => store.dispatch(setCurrentPage(totalPages))}
      >
        Last
      </Button>
    </div>
  );
};

export default Pagination;
