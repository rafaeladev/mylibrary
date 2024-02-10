"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { Search, RefreshCw, Check } from "lucide-react";

//======== Shadcn ui components ==========//
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { Progress } from "@/components/ui/progress";

import { Textarea } from "@/components/ui/textarea";

//======== Shadcn ui components ==========//

import { useSession } from "next-auth/react";

// Form components
import TypeSelect from "./TypeSelect";
import CategorySelect from "./CategorySelect";
import SearchCover from "./SearchCover";
import AuthorsSelect from "./AuthorsSelect";
import StarRatingInput from "./StarRatingInput";
import SuccessModal from "../SuccessModal";

//Interface
interface Author {
  id?: number;
  name: string;
  value?: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  favorite: boolean;
  authors: string[];
  type: string;
  category: string;
  status: boolean;
  rate: number;
}

interface NewFormProps {
  selectedBook?: Book | null;
}

// Controle du formulaire
const formSchema = z.object({
  coverShow: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  // imgUrl: z.string().min(10, {
  //   message: "imgUrl must be at least 10 characters.",
  // }),
  imgUrl: z.string(),
  authors: z.string().array().nonempty(),
  rate: z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().min(0).max(5, {
      message: "Description must be at least 50 characters.",
    }),
  ),
  description: z.string().min(5, {
    message: "Description must be at least 50 characters.",
  }),
  type: z.string({
    required_error: "Please select a type.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  status: z.boolean({
    required_error: "You need to select a status.",
  }),
  favorite: z.boolean({
    required_error: "You need to select a favorite.",
  }),
});

function NewForm({ selectedBook }: NewFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverShow: "",
      title: "",
      imgUrl: "",
      authors: [],
      rate: 0,
      description: "",
      type: undefined,
      category: undefined,
      status: false,
      favorite: false,
    },
  });
  //=============================================================
  // 2. Define a submit handler.

  const { data: session } = useSession();
  const id = session?.user?.id;

  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // Message submit :
  const [successMessage, setSuccessMessage] = useState("");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Modifier un livre
    if (selectedBook) {
      handleSaveBook();
      return setSuccessMessage("Le livre a été modifié avec succès!");
    }

    // Prisma pour créer une nouvelle entrée dans la table Book
    try {
      setIsEdition(false);
      setIsLoading(true);
      form.setValue("rate", rate);

      const response = await fetch("/api/createBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          imgUrl: coverUrl,
          authors: selectedAuthors.map((value) => value.value),
          rate: rate,
          description: form.getValues("description"),
          type: form.getValues("type"),
          category: form.getValues("category"),
          status: form.getValues("status"),
          favorite: form.getValues("favorite"),
          id: id,
        }),
      });

      if (response.ok) {
        console.log("Le livre a été enregistré avec succès.");
        // const responseData = await response.json();
        setSuccessMessage("Le livre a été sauvegardé avec succès!");
        setSuccessModalOpen(true);
        // Réinitialiser le formulaire après un certain délai
        setTimeout(() => {
          form.reset({
            title: "",
            authors: [],
            rate: 0,
            description: "",
            type: undefined,
            category: undefined,
            status: false,
            favorite: false,
            imgUrl: "",
          });
          setSelectedAuthors([]); // Réinitialiser la liste des auteurs sélectionnés
          setRate(0); // Réinitialiser la note
          setCoverUrl("");
          setCoverShow("");
        }, 1500);
        return "Le livre a été enregistré avec succès.";
      } else {
        console.error(
          "Erreur lors de la création du livre :",
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du livre :", error);
    } finally {
      setIsLoading(false);
    }
  }

  //=============================================================
  //3. Handle cover search
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [coverShow, setCoverShow] = useState<string>("");
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const defaultCoverUrl = "/default-placeholder.png";
  const catImage = "/images/cat2.svg";
  // Fonction pour chercher couverture
  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      // Appel à l'API Google pour récupérer la couverture
      const bookTitle = form.getValues("title");
      const response = await axios.get<string>("/api/getBookCover", {
        params: { bookTitle },
      });

      if (response.data.length > 0) {
        setCoverUrl(response.data);
        setCoverShow(response.data);
        setError(null);
        form.setValue("imgUrl", response.data);
      } else {
        setCoverUrl("");
        setCoverShow("");
        setError(
          `Aucun résultat trouvé pour la recherche actuelle depuis l'API.`,
        );
        form.setValue("imgUrl", defaultCoverUrl);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la recherche de la couverture du livre",
        error,
      );
      setCoverUrl("");
      setCoverShow("");
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
    const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(coverUrl);

    if (isValidUrl) {
      // Met à jour l'état coverUrl avec l'URL validée
      setCoverUrl(coverUrl);
      setCoverShow(coverUrl);
      setError(null);
    } else {
      setError("Veuillez entrer une URL valide.");
    }
  };

  //=============================================================
  //4. Rate management
  const [rate, setRate] = useState(0);
  //=============================================================
  //5. authors selection management
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  //=============================================================
  // Fonction pour chercher la liste d'auteurs dans la BD
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get<Author[]>("/api/getAuthors");
        // Tri des auteurs par ordre alphabétique
        const sortedAuthors = response.data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setAuthors(sortedAuthors);
      } catch (error) {
        console.error("Erreur lors de la récupération des auteurs :", error);
      } finally {
      }
    };

    fetchAuthors();

    return () => {
      setSuccessMessage("");
    };
  }, []);

  // Fonction pour ajouter des nouveaux auteurs à la BD
  const addAuthors = async (inputValue: any) => {
    try {
      if (inputValue !== "") {
        const response = await axios.post("/api/addAuthors", {
          name: inputValue,
        });

        if (
          response.data.error &&
          response.data.error.includes("unique constraint failed")
        ) {
          console.error("L'auteur avec ce nom existe déjà.");
        } else {
          setAuthors((prevAuthors) => {
            const newAuthors = [...prevAuthors, response.data];

            return newAuthors;
          });
        }
      } else {
        console.error("Le nom de l'auteur ne peut pas être vide.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'auteurs :", error);
    }
  };

  // Fonction pour changer la selection des auteurs
  const handleAuthorChange = useCallback(
    (newAuthors: Author[]) => {
      const authorNames = newAuthors.map((author) => author.value);
      form.setValue("authors", authorNames as [string, ...string[]]);
      setSelectedAuthors(newAuthors);
    },
    [setSelectedAuthors, form],
  );
  //=============================================================
  //6. Edit mode management
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isEdition, setIsEdition] = useState(false);
  // Définissez la fonction pour générer les valeurs par défaut
  const getDefaultFormValues = () => {
    if (selectedBook) {
      setRate(selectedBook.rate);
      setIsEdition(true);
      const authorsChange = selectedBook.authors.map((author) => ({
        value: author,
        name: author,
        label: author,
      }));
      handleAuthorChange(authorsChange);
      setCoverUrl(selectedBook.imgUrl);
      setCoverShow(selectedBook.imgUrl);
      return {
        coverShow: selectedBook.imgUrl,
        title: selectedBook.title,
        imgUrl: selectedBook.imgUrl,
        authors: authorsChange.map((auteur_book) => auteur_book.name),
        rate: selectedBook.rate,
        description: selectedBook.description,
        type: selectedBook.type || "",
        category: selectedBook.category || "",
        status: selectedBook.status,
        favorite: selectedBook.favorite,
      };
    } else {
      return {
        coverShow: "",
        title: "",
        imgUrl: "",
        authors: [],
        rate: 0,
        description: "",
        type: "",
        category: "",
        status: false,
        favorite: false,
      };
    }
  };

  //Fonction pour enregisterr la modification
  const handleSaveBook = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/updateBook", {
        method: "PUT", // ou "PATCH" en fonction de votre API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedBook?.id,
          title: form.getValues("title"),
          imgUrl: coverUrl,
          authors: selectedAuthors.map((value) => value.name),
          rate: rate,
          description: form.getValues("description"),
          type: form.getValues("type"),
          category: form.getValues("category"),
          status: form.getValues("status"),
          favorite: form.getValues("favorite"),
        }),
      });

      if (response.ok) {
        console.log("Le livre a été mis à jour avec succès.");
        setSuccessModalOpen(true);
      } else {
        console.error(
          "Erreur lors de la mise à jour du livre :",
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du livre :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mettez à jour les valeurs par défaut lorsque selectedBook change
  useEffect(() => {
    const newDefaultValues = getDefaultFormValues();
    form.reset({
      ...newDefaultValues,
    });
  }, [selectedBook]);
  //=============================================================
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-24 grid grid-cols-1 text-left sm:grid-cols-3"
        >
          <div className="mx-auto">
            {/* Champ de la couverture */}
            <FormField
              control={form.control}
              name="coverShow"
              render={() => (
                <FormItem>
                  <div
                    className={
                      "relative after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                    }
                  >
                    <FormLabel htmlFor="coverShow">aperçu</FormLabel>
                  </div>
                  <div className="relative border-8 border-solid border-mc-beigeClair">
                    {loading && <Progress value={70} />}
                    <figure className="border-2 border-solid border-mc-gray">
                      {/* Couverture par défaut */}
                      {!loading && !coverShow && (
                        <img
                          src={defaultCoverUrl}
                          alt="Couverture du livre par défaut"
                          className="book-cover"
                          width={"200"}
                          height={"289"}
                        />
                      )}

                      {/* On affiche la couverture de l'API */}
                      {loading && <p>Chargement en cours...</p>}
                      {coverShow && !loading && (
                        <img
                          src={coverShow}
                          alt="Couverture du livre"
                          className="book-cover"
                          width={"200"}
                          height={"289"}
                        />
                      )}
                    </figure>
                    <figure className="absolute -left-20 -top-1/2 -z-30 w-16 sm:-left-28 sm:-top-20 sm:w-28">
                      <Image
                        src={catImage}
                        width={114}
                        height={213}
                        alt="Chat"
                      />
                    </figure>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 mt-0">
            {/* Champ de titre et couverture */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={
                      "relative mt-8 after:absolute after:right-0  after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-[''] sm:mt-0"
                    }
                  >
                    <FormLabel htmlFor="title">Titre et couverture</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Titre du livre"
                      className="my-auto pb-6 pt-10 text-left font-serif text-2.5xl sm:text-3xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Champ de recherche de couverture */}
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <p className="mt-6">Image de couverture</p>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="URL de l'image"
                      {...field}
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                    />
                    <Button
                      className={buttonVariants({
                        size: "sm",
                      })}
                      onClick={handleSearch}
                    >
                      <Search />
                    </Button>
                    {/* Bouton pour l'ajout par lien externe */}
                    <Button
                      className={buttonVariants({
                        size: "sm",
                        variant: "destructive",
                      })}
                      onClick={handleExternalImageSubmit}
                    >
                      <RefreshCw />
                    </Button>
                    {/* Bouton pour valider l'ajout de l'image */}
                    {/* <Button
                      className={buttonVariants({
                        size: "sm",
                        variant: "secondary",
                      })}
                      onClick={handleExternalImageSubmit}
                    >
                      <Check />
                    </Button> */}
                  </div>
                  <FormDescription>
                    {error && <p className="pb-4 text-mc-rose">{error}</p>}
                    {`Recherchez automatiquement ou rentrez manuaellement l'image
                    de couverture`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Champ des auteurs */}
            <FormField
              control={form.control}
              name="authors"
              render={() => (
                <FormItem>
                  <div
                    className={
                      "relative mt-10 after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                    }
                  >
                    <FormLabel htmlFor="authors">Auteur/Autrice(s)</FormLabel>
                  </div>
                  <FormControl>
                    <AuthorsSelect
                      value={selectedAuthors}
                      onChange={(selectedAuthors) => {
                        handleAuthorChange(selectedAuthors);
                      }}
                      addAuthors={addAuthors}
                      authors={authors}
                    />
                  </FormControl>
                  <FormDescription>
                    Selectionnez un auteur/autrice(s) pour le livre
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ de notation */}
            <FormField
              control={form.control}
              name="rate"
              render={() => (
                <FormItem>
                  <div
                    className={
                      "relative mt-10 after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                    }
                  >
                    <FormLabel htmlFor="rate">Notation</FormLabel>
                  </div>
                  <FormControl>
                    <StarRatingInput value={rate} onChange={setRate} />
                  </FormControl>
                  <FormDescription>
                    Cliquez sur les étoiles pour noter le livre
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Champ de description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={
                      "relative mt-10 after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
                    }
                  >
                    <FormLabel htmlFor="description">Avis</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Ecrivez ici un petite description/sinopsis du livre"
                      className="custom-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Notation*/}
            <div
              className={
                "relative mt-10 after:absolute  after:right-0 after:top-1/2 after:-z-50 after:h-px after:w-full after:bg-mc-gray after:content-['']"
              }
            >
              <p className="mb-2 w-fit bg-mc-white pr-2">CLASSIFICATION</p>
            </div>
            <div className="grid-col-1 grid gap-8 sm:grid-cols-2">
              {/* Champ de type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="type">Type</FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                selectedBook
                                  ? selectedBook.type
                                  : "Choisir un type"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <TypeSelect />
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Type : BD, Livre, Manga...
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Champ de category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Catégorie</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                selectedBook
                                  ? selectedBook.category
                                  : "Choisir une catégorie"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <CategorySelect />
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      <div className="pb-10">
                        Catégorie : SF, Roman, Fantaisie...
                      </div>
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
              <p className="mb-2 w-fit bg-mc-white pr-2 ">EN BREF</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              {/* Champ de status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormControl>
                      <RadioGroup
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
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ de coup de coeur */}
              <FormField
                control={form.control}
                name="favorite"
                render={({ field }) => (
                  <FormItem className="flex align-middle">
                    <FormLabel
                      htmlFor="favorite"
                      className="mt-4 flex flex-col justify-end font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:justify-start"
                    >
                      Coup de coeur
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="favorite"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center gap-6 pt-10 sm:justify-start">
              {selectedBook ? (
                <>
                  <Button
                    type="submit"
                    className={buttonVariants({
                      variant: "secondary",
                      size: "lg",
                    })}
                  >
                    Sauvegarder
                  </Button>
                  <Link href={`/book/${selectedBook.id}`}>
                    <button
                      className={buttonVariants({
                        size: "lg",
                        variant: "destructive",
                      })}
                    >
                      Anuller
                    </button>
                  </Link>
                </>
              ) : (
                <Button
                  type="submit"
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Ajouter le livre
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => setSuccessModalOpen(false)}
          successMessage={successMessage}
          isOpen={isSuccessModalOpen}
          isEdition={isEdition}
        />
      )}
    </>
  );
}
export default NewForm;
