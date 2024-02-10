"use client";

// Importe les modules nécessaires
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

// Importe Zod
import { z, object, string, boolean, array } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Progress } from "@/components/ui/progress";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import AuthorsSelect from "./AuthorsSelect";

import Image from "next/image";

// Déclare l'interface pour les données du formulaire
interface FormData {
  title: string;
  imgUrl: string;
  description: string;
  type: string;
  category: string;
  status: boolean;
  favorite: boolean;
  authors: Author[];
  rate: number;
}

// Image par défaut
const defaultCoverUrl = "/default-placeholder.png";

interface Author {
  id?: number;
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

// Définis le schéma de validation avec Zod
const bookSchema = object({
  title: string(),
  imgUrl: string(),
  description: string(),
  type: string(),
  category: string(),
  status: boolean(),
  favorite: boolean(),
  authors: array(string()), // Adapté à ta structure d'auteurs
  rate: z.number().min(0).max(5),
});

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
}

// ===== Gestion rating ======
// Icons images
const starImg = "/images/star.png";
const fullStarImg = "/images/star-full.png";

// Component for a single star
const StarIcon: React.FC<StarIconProps> = ({ filled, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    <Image
      src={filled ? fullStarImg : starImg}
      alt="Star Icon"
      width={25}
      height={25}
    />
  </div>
);

// Component for the star rating input
interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  onChange,
}) => {
  const handleClick = (index: number) => {
    const newValue = index + 1;

    // Si la note est déjà celle-ci, on la réduit à zéro
    const updatedValue = newValue === value ? 0 : newValue;

    onChange(updatedValue);
  };

  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        filled={index < value}
        onClick={() => {
          handleClick(index);
        }}
      />
    ));

  return <div className="flex gap-1">{stars}</div>;
};

// ===== FIN Gestion rating ======

// Crée le composant du formulaire
function BookForm() {
  const methods = useForm();
  const [loading, setLoading] = useState(false);

  // Initialise le hook useForm
  const { setValue } = useForm<FormData>();

  type BookFormValues = z.infer<typeof bookSchema>;
  // Notation
  const [rate, setRate] = useState(0);

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      imgUrl: "",
      description: "",
      type: "",
      category: "",
      status: true,
      favorite: true,
      authors: [],
      rate: rate,
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  // initialise la recherche de la couverture
  const [bookTitle, setBookTitle] = useState<string>("");
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // Nouvel état pour l'URL de l'image

  // Fonction de soumission du formulaire
  async function onSubmit(data: BookFormValues) {
    const text = JSON.stringify(data, null, 2);
    // console.log("Données soumises :", text);

    // Utilisez selectedAuthors pour soumettre la liste d'auteurs
    // console.log("Auteurs sélectionnés à soumettre:", selectedAuthors);

    // console.log("Auteurs sélectionnés à soumettre2:", authors);

    // Utilise Prisma pour créer une nouvelle entrée dans la table Book
    try {
      // console.log(
      //   "authors envoyés",
      //   selectedAuthors.map((value) => value.value),
      // );
      const response = await fetch("/api/createBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          imgUrl: coverUrl,
          authors: selectedAuthors.map((value) => value.value),
          rate: rate,
          // authors: selectedAuthors,
        }),
      });

      if (response.ok) {
        // console.log("Le livre a été enregistré avec succès.");
        // Tu peux également récupérer la réponse de l'API si elle renvoie des données supplémentaires.
        const responseData = await response.json();
        // console.log("Réponse de l'API :", responseData);
        return "Le livre a été enregistré avec succès.";
      } else {
        console.error(
          "Erreur lors de la création du livre :",
          response.statusText,
        );
        // Gère l'erreur comme tu le souhaites, par exemple, en lançant une nouvelle erreur.
      }
    } catch (error) {
      console.error("Erreur lors de la création du livre :", error);
    }
  }

  // Fonction pour chercher couverture
  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      // Appel à l'API Google pour récupérer la couverture
      const response = await axios.get<string>("/api/getBookCover", {
        params: { bookTitle },
      });

      if (response.data.length > 0) {
        setCoverUrl(response.data);
        setError(null);
        setValue("imgUrl", response.data);
      } else {
        setCoverUrl("");
        setError(
          `Aucun résultat trouvé pour la recherche actuelle depuis l'API.`,
        );
        setValue("imgUrl", defaultCoverUrl);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la recherche de la couverture du livre",
        error,
      );
      setCoverUrl("");
      setError(
        `Aucun résultat trouvé pour la recherche actuelle depuis l'API.`,
      );
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour valider l'ajout par lien externe
  const handleExternalImageSubmit = () => {
    // Vérifie si l'URL de l'image est une URL valide
    const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(imageUrl);

    if (isValidUrl) {
      // Met à jour l'état coverUrl avec l'URL validée
      setCoverUrl(imageUrl);
      setError(null); // Efface les erreurs précédentes
    } else {
      // Affiche une erreur si l'URL n'est pas valide
      setError(
        "L'URL de l'image n'est pas valide. Veuillez saisir une URL correcte.",
      );
    }
  };

  // Book data add

  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);

  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  // Fonction pour chercher les données dans la BD prisma et afficher
  useEffect(() => {
    // console.log('Fetching data...');
    const fetchData = async () => {
      try {
        const [typesResponse, categoriesResponse] = await Promise.all([
          axios.get<Type[]>("/api/getType"),
          axios.get<Category[]>("/api/getCategory"),
        ]);

        // console.log('Fetched data:', typesResponse.data, categoriesResponse.data);

        // setTypes et setCategories sont sûrs à appeler même si le composant est démonté
        setTypes(typesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();

    // Nettoyage de l'effet
    return () => {
      // console.log('BookForm fetchData cleanup');
    };
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // setLoadingAuthors(true);
        const response = await axios.get<Author[]>("/api/getAuthors");

        setAuthors(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des auteurs :", error);
      } finally {
        // setLoadingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  // Gestion autheurs
  const addAuthors = async (inputValue: any) => {
    try {
      // console.log("Input Value:", inputValue);
      // Vérifiez si le nom de l'auteur n'est pas vide
      if (inputValue !== "") {
        // console.log("Creating author:", inputValue);

        // Appelez votre API pour ajouter un nouvel auteur
        const response = await axios.post("/api/addAuthors", {
          name: inputValue,
        });

        if (
          response.data.error &&
          response.data.error.includes("unique constraint failed")
        ) {
          // L'auteur avec ce nom existe déjà, vous pouvez gérer cela ici
          console.error("L'auteur avec ce nom existe déjà.");
        } else {
          setAuthors((prevAuthors) => {
            const newAuthors = [...prevAuthors, response.data];
            // console.log("New Authors:", newAuthors);
            return newAuthors;
          });
          // console.log("Auteur ajouté avec succès :", response.data);
        }
      } else {
        console.error("Le nom de l'auteur ne peut pas être vide.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'auteurs :", error);
    }
  };

  const handleAuthorChange = useCallback(
    (newAuthors: Author[]) => {
      // console.log("New Authors:", newAuthors);
      setSelectedAuthors(newAuthors);
    },
    [setSelectedAuthors],
  );

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-24 grid grid-cols-3 text-left"
          >
            <div className="mx-auto">
              {/* Champ de la couverture */}
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>Couverture</FormLabel>
                    </div>

                    {loading && <Progress value={70} />}

                    {/* Couverture par défaut */}
                    {!loading && !coverUrl && (
                      <img
                        className="book-cover"
                        src={defaultCoverUrl}
                        alt="Couverture du livre par défaut"
                      />
                    )}

                    {!loading && !coverUrl && imageUrl && (
                      <img
                        className="book-cover"
                        src={imageUrl}
                        alt="Couverture du livre"
                      />
                    )}

                    {/* On affiche la couverture de l'API */}
                    {loading && <p>Chargement en cours...</p>}
                    {coverUrl && !loading && (
                      <img
                        className="book-cover"
                        src={coverUrl}
                        alt="Couverture du livre"
                      />
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 mt-0">
              {/* Champ de titre */}
              <FormField
                // control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>Titre du livre</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className="my-auto pb-6 pt-10 text-left font-serif text-3xl"
                        placeholder="Titre du livre"
                        // onChange={(e) => {
                        //     setValue('title', e.target.value);
                        // }}
                        {...field}
                        onChange={(e) => {
                          setBookTitle(e.target.value); // Met à jour le state bookTitle
                          field.onChange(e); // Appelle la fonction onChange du champ title du formulaire
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Champ de la couverture */}
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>Couverture</FormLabel>
                    </div>

                    <FormDescription>
                      Rentrez le titre du livre et puis cliquez ici sur
                      rechercher la couverture
                    </FormDescription>
                    <Button
                      className={buttonVariants({
                        size: "sm",
                      })}
                      onClick={handleSearch}
                    >
                      Rechercher Couverture
                    </Button>
                    <FormMessage />
                    <FormControl> </FormControl>
                    {loading && <Progress value={70} />}
                    {error && (
                      <>
                        <FormDescription>
                          <p className="pb-4 text-mc-rose">{error}</p>
                        </FormDescription>
                        <Input
                          type="text"
                          placeholder="URL de l'image"
                          {...field}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                        {/* Bouton pour valider l'ajout par lien externe */}
                        <Button
                          className={buttonVariants({
                            size: "sm",
                          })}
                          onClick={handleExternalImageSubmit}
                        >
                          {"Valider l'ajout par lien externe"}
                        </Button>
                      </>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ d'auteurs avec sélection multiple */}
              <FormField
                // control={form.control}
                name="authors"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>AUTEURS</FormLabel>
                    </div>
                    <FormDescription>
                      Sélectionner un ou plusieurs auteurs
                    </FormDescription>
                    <AuthorsSelect
                      value={selectedAuthors}
                      onChange={(selectedAuthors) => {
                        handleAuthorChange(selectedAuthors);
                        // field.onChange(selectedAuthors);
                        // console.log('valeur enregistrée', field.value);
                        // setValue('authors', selectedAuthors);
                      }}
                      addAuthors={addAuthors}
                      authors={authors}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ de notation */}
              <FormField
                name="notation"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>NOTATION</FormLabel>
                    </div>
                    <FormControl>
                      <StarRatingInput value={rate} onChange={setRate} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ de description */}
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={
                        "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                      }
                    >
                      <FormLabel>AVIS</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Ecriz ici un petite description/sinopsis du livre"
                        className="resize-none"
                        {...field}
                        onChange={(e) => {
                          setBookTitle(e.target.value); // Met à jour le state bookTitle
                          field.onChange(e); // Appelle la fonction onChange du champ title du formulaire
                          // setValue('description', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Tu peux rentrer ici la description du livre
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={
                  "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                }
              >
                <FormLabel>CLASSIFICATION</FormLabel>
              </div>
              <div className="grid grid-cols-2 ">
                {/* Champ de type */}
                <FormField
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          // onValueChange={(value) => setValue('type', value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choisir un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {types.map((type) => (
                              <SelectItem
                                key={type.id}
                                value={type.name !== "" ? type.name : "default"}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choisir le type (Lire, manga, BD..)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Champ de catégorie */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorie</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choisir une categorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((type) => (
                              <SelectItem
                                key={type.id}
                                value={type.name !== "" ? type.name : "default"}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choisir la categorie du document (SF, roman, fantaisie)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={
                  "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                }
              >
                <FormLabel>EN BREF...</FormLabel>
              </div>
              <div className="grid grid-cols-2">
                {/* Champ de statut avec radio buttons */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <RadioGroup
                        // onValueChange={(value) =>
                        //     setValue('status', value === 'true')
                        // }
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        value={field.value ? "true" : "false"}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="present" />
                          <Label htmlFor="present">Présent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="emprunte" />
                          <Label htmlFor="emprunte">Emprunté</Label>
                        </div>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Champ de coup de cœur */}
                <FormField
                  control={form.control}
                  name="favorite"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="favorite"
                          checked={field.value}
                          // onCheckedChange={(isChecked) =>
                          //     setValue(
                          //         'favorite',
                          //         typeof isChecked === 'boolean'
                          //             ? isChecked
                          //             : false
                          //     )
                          // }
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <Label
                          htmlFor="favorite"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Coup de coeur
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bouton de soumission du formulaire */}
              <Button type="submit">Ajouter Livre</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default BookForm;
