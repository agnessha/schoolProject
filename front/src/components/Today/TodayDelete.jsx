import React from "react";
import "../../App.css";
import { DeleteIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure,
} from "@chakra-ui/react"

export function TodayDelete(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <div>
            <DeleteIcon color='white' margin="6px 15px 4px" cursor="pointer" onClick={() => {
                onOpen();
            }} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />

                    <ModalFooter>
                        <Button
                            colorScheme="gray"
                            mr={3}
                            onClick={() => {
                                props.deleteNotes();
                                onClose();
                            }}
                        >
                            Delete all notes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>

    )
}