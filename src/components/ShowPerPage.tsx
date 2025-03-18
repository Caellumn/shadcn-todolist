import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { getItemsPerPage, setItemsPerPage } from "@/store/paginationSlice";
import store from "@/store";

const ShowPerPage = () => {
  const itemsPerPage = useSelector(getItemsPerPage);

  const handleItemsPerPageChange = (value: number) => {
    store.dispatch(setItemsPerPage(value));
  };

  return (
    <div className="flex items-center gap-2">
      <span>Showing: </span>
      <div className="flex items-center gap-2 border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {itemsPerPage}
            <ChevronDown className="ml-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleItemsPerPageChange(5)}>
              5
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemsPerPageChange(10)}>
              10
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemsPerPageChange(20)}>
              20
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span>per page</span>
      </div>
    </div>
  );
};
export default ShowPerPage;
