import { Button } from "@/components/ui/button";
import CategoriesDropdown from "@/components/CategoriesDropdown";
import { useState } from "react";
import { addTodo, TodoInput } from "@/store/todoSlice";
import { useAppDispatch } from "@/store/hooks";

const Form = () => {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Create todo object with all fields
    const todoData: TodoInput = {
      text,
      completed,
      description,
      category,
    };

    // Dispatch the action to Redux
    dispatch(addTodo(todoData));

    // Reset form fields
    setText("");
    setCompleted(false);
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new todo"
          className="flex-grow border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <CategoriesDropdown
          selectedCategory={category}
          onCategoryChange={setCategory}
        />
        <Button type="submit">+ Add</Button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Description (optional)"
          className="flex-grow border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
};
export default Form;
