import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { setStatusFilter, StatusFilter } from "@/store/statusSlice";
import store from "@/store";
import CategoryFilter from "@/components/CategoryFilter";

const FiltertButtons = () => {
  const handleStatusFilter = (status: StatusFilter) => {
    store.dispatch(setStatusFilter(status));
  };

  return (
    <div className="flex gap-2">
      <CategoryFilter />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button> all status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuItem onSelect={() => handleStatusFilter("all")}>
            <button>all</button>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleStatusFilter("completed")}>
            <button>completed</button>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleStatusFilter("active")}>
            <button>not completed</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default FiltertButtons;
