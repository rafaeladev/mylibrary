import React from "react";
import Modal from "./ui/Modal";
import { ModalContent } from "./ui/Modal";
import { ModalFooter } from "./ui/Modal";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface SuccessModalProps {
  onClose: () => void;
  successMessage: string;
  isOpen: boolean;
  isEdition?: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  onClose,
  successMessage,
  isOpen,
  isEdition,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalContent>
        <h2 className="my-4 text-mc-green">{successMessage}</h2>
        <ModalFooter>
          {isEdition ? (
            <Link href="/">
              <Button
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Fermer
              </Button>
            </Link>
          ) : (
            <Button
              onClick={onClose}
              className={buttonVariants({
                variant: "destructive",
              })}
            >
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
