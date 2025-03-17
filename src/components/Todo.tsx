import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Pencil, CircleX } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  category: string;
  status: string;
}
const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>no todos found </div>;
  }

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <ul className="flex flex-col justify-between gap-2 border">
      {todos.map((todo: Todo) => (
        <li key={todo.id} className="p-auto flex justify-between gap-2 border">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Collapsible>
              <CollapsibleTrigger>
                <p>{todo.text}</p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p>dummydata</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex gap-2">
            <Badge variant="destructive">{todo.category}</Badge>
            <ChevronDown strokeWidth={1.5} absoluteStrokeWidth />
            <Pencil strokeWidth={0.75} />
            <CircleX strokeWidth={0.75} onClick={() => handleDelete(todo.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default Todo;

<ul></ul>;
