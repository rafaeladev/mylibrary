import React, { useEffect, useState } from "react";
import axios from "axios";
import { SelectItem } from "@/components/ui/select";

interface Category {
  id?: number;
  name: string;
}

interface CategorySelectProps {}

const CategorySelect: React.FC<CategorySelectProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("/api/getCategory");
        // Tri des Categories par ordre alphabétique
        const sortedCat = response.data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setCategories(sortedCat);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((cat) => (
        <SelectItem key={cat.id} value={cat.name !== "" ? cat.name : "default"}>
          {cat.name}
        </SelectItem>
      ))}
    </>
  );
};

export default CategorySelect;
