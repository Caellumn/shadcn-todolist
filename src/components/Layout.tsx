import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Pencil, CircleX } from "lucide-react";

const Layout = () => {
  return (
    <>
      <div className="px-auto max-w-5xl space-y-8">
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
        <div className="flex justify-between gap-2 border">
          <div>
            <Checkbox />
            <Collapsible>
              <CollapsibleTrigger>
                <p>Collapsible</p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p>Content</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex gap-2">
            <Badge variant="destructive">test</Badge>
            <ChevronDown strokeWidth={1.5} absoluteStrokeWidth />
            <Pencil strokeWidth={0.75} />
            <CircleX strokeWidth={0.75} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
