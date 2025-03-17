import { Button } from "@/components/ui/button";
import CategoriesDropdown from "@/components/CategoriesDropdown";
import { useState } from "react";
import { nanoid } from "nanoid";
const Form = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      id: nanoid(),
      text,
      status,
      description,
      category,
    };
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then(() => {
        setText("");
        setStatus(false);
        setDescription("");
        setCategory(category);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Add a new todo"
        className="border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <CategoriesDropdown />
      <Button>+ Add</Button>
    </form>
  );
};
export default Form;
