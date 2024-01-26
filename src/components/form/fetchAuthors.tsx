import axios from "axios";

interface Author {
  id?: number;
  name: string;
  value?: string;
}

const AddAuthors: React.FC<{
  inputValue: string;
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}> = ({ inputValue, setAuthors }) => {
  const addAuthors = async () => {
    try {
      if (inputValue.trim() === "") {
        console.error("Le nom de l'auteur ne peut pas être vide.");
        return;
      }

      const response = await axios.post("/api/addAuthors", {
        name: inputValue.trim(),
      });

      if (
        response.data.error &&
        response.data.error.includes("unique constraint failed")
      ) {
        console.error("L'auteur avec ce nom existe déjà.");
      } else {
        setAuthors((prevAuthors) => [...prevAuthors, response.data]);
        console.log("Auteur ajouté avec succès :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'auteurs :", error);
    }
  };

  return null; // As this is not rendering anything, you can return null
};

export default AddAuthors;
