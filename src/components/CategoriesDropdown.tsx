import { useEffect, useState } from "react";
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

interface CategoriesDropdownProps {
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
}

const CategoriesDropdown = ({ onCategoryChange, selectedCategory }: CategoriesDropdownProps) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(selectedCategory || "");
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    setCategory(categoryName);
    if (onCategoryChange) {
      onCategoryChange(categoryName);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button> {category || "-- make a choice --"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
export default CategoriesDropdown;
