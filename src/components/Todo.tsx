import { getTodos } from "@/store/todoSlice";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Pencil, CircleX } from "lucide-react";

const Todo = () => {
  const todos = useAppSelector(getTodos);
  const loading = useAppSelector((state) => state.todoSlice.loading);
  const error = useAppSelector((state) => state.todoSlice.error);

  if (loading) {
    return <div className="py-4 text-center">Loading todos...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="py-4 text-center">No todos found. Add some!</div>;
  }

  return (
    <div className="mt-6 space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox checked={todo.completed} />
              <h3 className="text-lg font-semibold">{todo.text}</h3>
            </div>
            <div className="flex items-center gap-2">
              {todo.category && (
                <Badge variant="outline" className={`destructive mr-2 ml-auto`}>
                  {todo.category}
                </Badge>
              )}
              <ChevronDown strokeWidth={0.75} />
              <Pencil strokeWidth={0.75} />
              <CircleX strokeWidth={0.75} />
            </div>
          </div>
          {todo.description && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground w-full justify-start"
                >
                  View details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-2 pl-6 text-sm">{todo.description}</div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
