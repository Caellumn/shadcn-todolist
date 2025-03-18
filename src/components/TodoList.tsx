import { RootState } from "@/store";
import { toggleTodo, removeTodo, fetchTodosSuccess } from "@/store/todosSlice";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleX } from "lucide-react";
import store from "@/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Todo } from "@/types/types";
import { getStatusFilter } from "@/store/statusSlice";
import { getCategoryFilter } from "@/store/categoryFilterSlice";
import { getCurrentPage, getItemsPerPage, setTotalFilteredItems } from "@/store/paginationSlice";

interface Category {
  id: string;
  name: string;
  color: string;
}

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const statusFilter = useSelector(getStatusFilter);
  const categoryFilter = useSelector(getCategoryFilter);
  const currentPage = useSelector(getCurrentPage);
  const itemsPerPage = useSelector(getItemsPerPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/todos");

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        // Dispatch success action with the fetched data
        store.dispatch(fetchTodosSuccess(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos. Please try again later.");
        setLoading(false);
      }
    };
    // fetch the cateogires we need them to change the colours
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchTodos();
    fetchCategories();
  }, []);

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      // Find de todo met id
      const todo = todos.find((todo: Todo) => todo.id === id);
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

  // get color from category
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.color;
  };

  // Filter todos based on the selected status filter
  const filteredTodos = todos.filter((todo: Todo) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "completed") return todo.completed;
    if (statusFilter === "active") return !todo.completed;
    return true;
  });

  // Filter todos based on the selected category filter
  const filteredTodosByCategory = filteredTodos.filter((todo: Todo) => {
    if (!categoryFilter) return true;
    return todo.category === categoryFilter;
  });

  // Update the total filtered items count in Redux
  useEffect(() => {
    store.dispatch(setTotalFilteredItems(filteredTodosByCategory.length));
  }, [filteredTodosByCategory.length, statusFilter, categoryFilter]);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = filteredTodosByCategory.slice(startIndex, endIndex);

  if (loading) {
    return <div className="py-4 text-center">Loading todos...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="py-4 text-center">No todos found. Add some!</div>;
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="py-4 text-center">No todos match the current filter.</div>
    );
  }
  if (filteredTodosByCategory.length === 0) {
    return (
      <div className="py-4 text-center">No todos match the current filter.</div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {paginatedTodos.map((todo: Todo) => (
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
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: getCategoryColor(todo.category),
                    color: "#ffffff",
                  }}
                >
                  {todo.category}
                </Badge>
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
