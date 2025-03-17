import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  color: string;
}

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // get data from json server the color and name
  fetch("http://localhost:3000/categories").then((res) =>
    res.json().then((data) => setCategories(data)),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button> {category || "all categories"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((category: Category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => setCategory(category.name)}
          >
            <span
              className="mr-2 h-4 w-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CategoriesDropdown;
