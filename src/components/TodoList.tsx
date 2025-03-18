import { RootState } from "@/store";
import {
  toggleTodo,
  removeTodo,
  fetchTodosSuccess,
  updateTodoDescription,
} from "@/store/todosSlice";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleX, Pencil, Save } from "lucide-react";
import store from "@/store";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { Todo } from "@/types/types";
import { getStatusFilter } from "@/store/statusSlice";
import { getCategoryFilter } from "@/store/categoryFilterSlice";
import {
  getCurrentPage,
  getItemsPerPage,
  setTotalFilteredItems,
} from "@/store/paginationSlice";

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
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState<string>("");
  const [openCollapsibleId, setOpenCollapsibleId] = useState<string | null>(
    null,
  );
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://shrub-ring-editor.glitch.me/todos");

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
        const response = await fetch(
          "https://shrub-ring-editor.glitch.me/categories",
        );

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

  const handleToggle = (id: string) => {
    store.dispatch(toggleTodo(id));
  };

  const handleDelete = (id: string) => {
    store.dispatch(removeTodo(id));
    toast.success("Todo removed successfully");
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditDescription(todo.description || "");
    setOpenCollapsibleId(todo.id);

    // Focus the input after it's rendered
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
      }
    }, 0);
  };

  const handleSaveDescription = (id: string) => {
    store.dispatch(updateTodoDescription(id, editDescription));
    setEditingTodoId(null);
    toast.success("Description updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
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
            <div className="flex items-center gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo.id)}
                id={`todo-${todo.id}`}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  todo.completed ? "text-gray-500 line-through" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
            <div className="flex items-center gap-2">
              {todo.category && (
                <Badge
                  className="ml-2"
                  style={{
                    backgroundColor: getCategoryColor(todo.category),
                    color: "white",
                  }}
                >
                  {todo.category}
                </Badge>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEditClick(todo)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(todo.id)}
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Collapsible
            open={openCollapsibleId === todo.id}
            onOpenChange={(open) => {
              if (open) {
                setOpenCollapsibleId(todo.id);
              } else if (openCollapsibleId === todo.id) {
                setOpenCollapsibleId(null);
              }
            }}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0">
                {openCollapsibleId === todo.id ? "Hide" : "Show"} Description{" "}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {editingTodoId === todo.id ? (
                <div className="space-y-2">
                  <textarea
                    ref={editInputRef}
                    className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    placeholder="Add a description..."
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleSaveDescription(todo.id)}
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm">
                  {todo.description ? todo.description : "No description."}
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
