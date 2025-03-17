import { RootState } from "@/store";
import { toggleTodo, removeTodo } from "@/store/todosSlice";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, CircleX } from "lucide-react";
import store from "@/store";
import { toast } from "sonner";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      // Find de todo met de gegeven id
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      // Update de todo op de db.json server
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update todo");
        return;
      }

      // If server update successful, update the Redux state
      store.dispatch(toggleTodo(id));
      toast.success("Todo status updated");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete the todo on the server
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete todo");
        return;
      }

      store.dispatch(removeTodo(id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

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
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo.id, todo.completed)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`cursor-pointer ${
                  todo.completed ? "text-gray-500 line-through" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
            <div className="flex items-center gap-2">
              {todo.category && (
                <Badge variant="secondary">{todo.category}</Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(todo.id)}
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {todo.description && (
            <Collapsible className="mt-2">
              <CollapsibleTrigger className="flex w-full items-center justify-start border-t pt-2 text-sm text-gray-500">
                Details <ChevronDown className="ml-1 h-3 w-3" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 text-sm">
                {todo.description}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
