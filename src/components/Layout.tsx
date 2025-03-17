import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import Todo from "@/components/Todo";
import Form from "@/components/Form";
import CategoriesDropdown from "@/components/CategoriesDropdown";
const Layout = () => {
  return (
    <>
      <div className="px-auto mx-auto max-w-5xl space-y-8">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        <h1>Todo App</h1>
        <Form />
        <div className="flex gap-2">
          <CategoriesDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button> all status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <DropdownMenuItem>
                <button>all</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>open</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>finished</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Todo />
      </div>
    </>
  );
};
export default Layout;
