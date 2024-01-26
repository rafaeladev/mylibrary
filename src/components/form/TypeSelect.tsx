import React, { useEffect, useState } from "react";
import axios from "axios";
import { SelectItem } from "@/components/ui/select";

interface Type {
  id?: number;
  name: string;
}

interface TypeSelectProps {}

const TypeSelect: React.FC<TypeSelectProps> = () => {
  const [types, setTypes] = useState<Type[]>([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get<Type[]>("/api/getType");
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <>
      {types.map((type) => (
        <SelectItem
          key={type.id}
          value={type.name !== "" ? type.name : "default"}
        >
          {type.name}
        </SelectItem>
      ))}
    </>
  );
};

export default TypeSelect;
