import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import Todo from "@/components/Todo";
const Layout = () => {
  return (
    <>
      <div className="px-auto max-w-5xl space-y-8">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        <h1>Todo App</h1>
        <form action="" className="flex gap-2">
          <input type="text" placeholder="Add a new todo" className="border" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <button>work</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>personal</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>shopping</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>health</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>learning</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>+ Add</Button>
        </form>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button> all categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <DropdownMenuItem>
                <button>work</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>personal</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>shopping</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>health</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>learning</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
