import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  getCategoryFilter,
  setCategoryFilter,
} from "@/store/categoryFilterSlice";
import Store from "@/store";

interface Category {
  id: string;
  name: string;
  color: string;
}

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const selectedCategory = useSelector(getCategoryFilter);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://shrub-ring-editor.glitch.me/categories",
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    Store.dispatch(setCategoryFilter(categoryName));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button> {selectedCategory || "All Categories"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleCategorySelect("")}>
          All Categories
        </DropdownMenuItem>
        {categories.map((category: Category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => handleCategorySelect(category.name)}
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

export default CategoryFilter;
