import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { FilterType } from "@/app/page";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { ChevronRight } from "lucide-react";

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

  const [isCollapsed, setIsCollapsed] = useState(true);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, categoriesResponse, authorsResponse] =
          await Promise.all([
            axios.get<Type[]>("/api/getType"),
            axios.get<Category[]>("/api/getCategory"),
            axios.get<Author[]>("/api/getAuthors"),
          ]);

        // Tri des types par ordre alphabétique
        const sortedTypes = typesResponse.data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setTypes(sortedTypes);

        // Tri des Categories par ordre alphabétique
        const sortedCat = categoriesResponse.data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setCategories(sortedCat);

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

    // Réinitialiser les valeurs des champs de sélection
    const authorSelect = document.getElementById(
      "authorSelect",
    ) as HTMLSelectElement;
    const typeSelect = document.getElementById(
      "typeSelect",
    ) as HTMLSelectElement;
    const categorySelect = document.getElementById(
      "categorySelect",
    ) as HTMLSelectElement;

    authorSelect.selectedIndex = 0;
    typeSelect.selectedIndex = 0;
    categorySelect.selectedIndex = 0;
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mb-4 sm:mb-10">
      <div className="flex w-full flex-col flex-wrap justify-center align-middle sm:flex-row sm:gap-4">
        <p className="filter-title text-center font-serif text-2xl leading-8 text-mc-marrom sm:text-left sm:text-2xl">
          Filtres :
        </p>
        {isMobile && (
          <button
            className={cn(
              buttonVariants({
                variant: "accordion",
                size: "s",
              }),
              `collapse-button ${isCollapsed ? "" : "active"}`,
            )}
            onClick={toggleCollapse}
          >
            {"Filtres"}
            <ChevronRight className="collapse-arrow" />
          </button>
        )}

        {/* {(!isMobile || !isCollapsed) && ( */}
        <div className={`filter-content ${isCollapsed ? "collapsed" : ""}`}>
          <select
            id="authorSelect"
            className="bg-mc-beige px-5 py-2 text-mc-white"
            onChange={(e) =>
              handleSelectFilter("author", Number(e.target.value))
            }
          >
            <option value="" hidden>
              Auteurs
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <select
            id="typeSelect"
            className="bg-mc-beige px-5 py-2 text-mc-white"
            onChange={(e) => handleSelectFilter("type", Number(e.target.value))}
          >
            <option value="" hidden>
              Types
            </option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            id="categorySelect"
            className="bg-mc-beige px-5 py-2 text-mc-white"
            onChange={(e) =>
              handleSelectFilter("category", Number(e.target.value))
            }
          >
            <option value="" hidden>
              Categories
            </option>
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
            <p className="my-auto">Favoris Uniquement</p>
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
            <p className="my-auto">Disponibles Uniquement</p>
          </label>
        </div>
        {/* )} */}

        {filters && (
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
        )}
      </div>
    </div>
  );
};

export default Filter;
