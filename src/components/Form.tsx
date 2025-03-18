import { Button } from "@/components/ui/button";
import CategoriesDropdown from "@/components/CategoriesDropdown";
import { useState } from "react";
import { addTodo } from "@/store/todosSlice";
import store from "@/store";
import { toast } from "sonner";

const Form = () => {
  const [todoText, setTodoText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoText.trim()) {
      toast.error("Please enter a todo text");
      return;
    }

    const newTodo = {
      text: todoText,
      category: category,
      description: description,
      completed: false,
    };

    try {
      // Save the todo to the server first
      const response = await fetch(
        "https://shrub-ring-editor.glitch.me/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save todo to the server");
      }

      // Get the saved todo with the server-generated ID
      const savedTodo = await response.json();

      // Now dispatch the action with the saved todo from the server
      store.dispatch(addTodo(savedTodo));

      toast.success("Todo added successfully");

      // Reset form
      setTodoText("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error saving todo:", error);
      toast.error("Failed to add todo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-lg p-4 shadow-md"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="text" className="text-sm font-medium">
            Task
          </label>
          <input
            id="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="What needs to be done?"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Category</label>
          <CategoriesDropdown
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
          <Button type="submit" className="">
            + Add
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          rows={3}
        />
      </div>
    </form>
  );
};

export default Form;
