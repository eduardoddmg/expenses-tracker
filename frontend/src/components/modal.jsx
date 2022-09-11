import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

export const Modal = ({ size, isOpen, onClose, children }) => {
  return (
    <>
      <ModalChakra size={size || "lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>{children}</ModalBody>
        </ModalContent>
      </ModalChakra>
    </>
  );
};
