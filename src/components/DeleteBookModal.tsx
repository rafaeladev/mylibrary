// DeleteBookModal.tsx
import { useState } from "react";
import Modal from "./ui/Modal";
import { ModalContent } from "./ui/Modal";
import { ModalFooter } from "./ui/Modal";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";

import { Progress } from "@/components/ui/progress";

interface DeleteBookModalProps {
  bookId: number;
  onClose: () => void;
  isOpen: boolean;
  // router: any;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  bookId,
  onClose,
  isOpen,
  // router,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Effectuer la suppression via une requête API
      console.log("URL requete  API:", bookId);

      await axios.delete(`/api/deleteBook?bookId=${bookId}`);
      setSuccessMessageVisible(true);
      // Fermeture le modal après la suppression
      setTimeout(() => {
        onClose();
        setSuccessMessageVisible(false);
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalContent>
        {isSuccessMessageVisible ? (
          <p>Livre supprimé avec succès !</p>
        ) : (
          <>
            <p>Voulez-vous vraiment supprimer ce livre ?</p>
            {isLoading && <Progress value={70} />}
          </>
        )}
      </ModalContent>
      <ModalFooter>
        {!isSuccessMessageVisible && (
          <Button
            className={buttonVariants({
              variant: "destructive",
            })}
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        )}
        {!isSuccessMessageVisible && <Button onClick={onClose}>Annuler</Button>}
      </ModalFooter>
    </Modal>
  );
};

export default DeleteBookModal;
