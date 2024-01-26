import { useState } from "react";
import axios from "axios";

import { Progress } from "@/components/ui/progress";

interface SearchCoverProps {
  bookTitle: string;
  onSearchResult: (coverUrl: string) => void;
}

const SearchCover: React.FC<SearchCoverProps> = ({
  bookTitle,
  onSearchResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //State pour vérifier qu'il y a une coverUrl definie
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  //State pour vérifier qu'il y a une externalCoverUrl
  const [externalCoverUrl, setExternalCoverUrl] = useState<string | null>(null);

  const defaultCoverUrl = "/images/default-placeholder.png";

  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      // Appel à l'API Google pour récupérer la couverture
      const response = await axios.get<string>("/api/getBookCover", {
        params: { bookTitle },
      });

      if (response.data.length > 0) {
        onSearchResult(response.data);
        setCoverUrl(response.data);
        setError(null);
      } else {
        onSearchResult(defaultCoverUrl);
        setCoverUrl("");
        setError(
          `Aucun résultat trouvé pour la recherche actuelle depuis l'API.`,
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la recherche de la couverture du livre",
        error,
      );
      setCoverUrl("");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour valider l'ajout par lien externe
  //   const handleExternalImageSubmit = () => {
  //     // Vérifie si l'URL de l'image est une URL valide
  //     const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(externalCoverUrl);

  //     if (isValidUrl) {
  //       onSearchResult(externalCoverUrl);
  //       setError(null);
  //     } else {
  //       setError(
  //         "L'URL de l'image n'est pas valide. Veuillez saisir une URL correcte.",
  //       );
  //     }
  //   };

  return (
    <>
      <button onClick={handleSearch} disabled={loading}>
        Rechercher Couverture
      </button>
      {loading && <Progress value={70} />}

      {/* Couverture par défaut */}
      {!loading && !coverUrl && (
        <img
          className="book-cover"
          src={defaultCoverUrl}
          alt="Couverture du livre par défaut"
        />
      )}

      {/* Couverture par source externe */}
      {/* {!loading && !coverUrl && imageUrl && (
        <img className="book-cover" src={imageUrl} alt="Couverture du livre" />
      )} */}

      {/* On affiche la couverture de l'API */}
      {loading && <p>Chargement en cours...</p>}
      {coverUrl && !loading && (
        <img className="book-cover" src={coverUrl} alt="Couverture du livre" />
      )}
    </>
  );
};

export default SearchCover;
