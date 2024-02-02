import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { FilterType } from "@/app/page";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  filters: FilterType[] | null;
  setFilters: Dispatch<SetStateAction<FilterType[] | null>>;
}

interface Author {
  id: number;
  name: string;
  value?: string;
}

interface Type {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

const Filter: FC<FilterProps> = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, categoriesResponse, authorsResponse] =
          await Promise.all([
            axios.get<Type[]>("/api/getType"),
            axios.get<Category[]>("/api/getCategory"),
            axios.get<Author[]>("/api/getAuthors"),
          ]);

        setTypes(typesResponse.data);
        setCategories(categoriesResponse.data);
        // Tri des auteurs par ordre alphabétique
        const sortedAuthors = authorsResponse.data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setAuthors(sortedAuthors);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  const clearFilters = () => {
    setIsFavorite(false);
    setIsAvailable(false);
    setFilters(null);
  };

  const handleSelectFilter = (
    filterBy: "category" | "type" | "author" | "favorite" | "status",
    filterValue: number | boolean,
  ) => {
    setFilters((previousState) => {
      if (previousState === null) {
        return [
          {
            filterBy,
            filterValue,
          },
        ];
      } else {
        return [
          ...previousState.filter(
            (filter: FilterType) => filter.filterBy !== filterBy,
          ),
          { filterBy, filterValue },
        ];
      }
    });
  };

  return (
    <div className="mb-10">
      <div className="flex w-full flex-col flex-wrap justify-center gap-2 align-middle sm:flex-row sm:gap-4">
        <p className="text-2.5xl text-center font-serif text-mc-marrom sm:text-left sm:text-2xl">
          Filtres :
        </p>
        {/* <label> */}
        <select
          className="bg-mc-beige px-5 py-2 text-mc-white"
          onChange={(e) => handleSelectFilter("author", Number(e.target.value))}
        >
          <option value="">Auteurs</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select
          className="bg-mc-beige px-5 py-2 text-mc-white"
          onChange={(e) => handleSelectFilter("type", Number(e.target.value))}
        >
          <option value="">Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          className="bg-mc-beige px-5 py-2 text-mc-white"
          onChange={(e) =>
            handleSelectFilter("category", Number(e.target.value))
          }
        >
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* </label> */}

        <label className="flex justify-center gap-2 align-middle">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => {
              handleSelectFilter("favorite", e.target.checked);
              setIsFavorite(!isFavorite);
            }}
            className="my-auto h-4 w-4"
          />
          <p className="my-auto">Favorite</p>
        </label>
        <label className="flex justify-center gap-2 align-middle">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => {
              handleSelectFilter("status", e.target.checked);
              setIsAvailable(!isAvailable);
            }}
            className="my-auto h-4 w-4"
          />
          <p className="my-auto">Disponible</p>
        </label>
        <Button
          onClick={clearFilters}
          className={cn(
            buttonVariants({
              variant: "destructive",
            }),
            "mx-auto my-auto w-1/2 sm:mx-0 sm:w-fit",
          )}
        >
          Effacer filtres
        </Button>
      </div>
    </div>
  );
};

export default Filter;
