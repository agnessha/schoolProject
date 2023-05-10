import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Tooltip,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {v4 as uuidv4} from "uuid";
import {calendarDate, month, today} from "../../../jsDate/date";


export function EditorComponent(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const emptyNote = {
        title: "",
        text: "",
        id: uuidv4(),
        date: today + " " + month,
        normalDate: calendarDate,
        completed: false,
        start: new Date(),
        end: new Date(),
        color: ''

    };

    const [note, setNote] = useState(emptyNote);

    function checkInputs() {
        if (note.title.length > 0 && editorState.getCurrentContent().getPlainText().length > 0) {
            return false
        } else {
            return true
        }
    }

    let warning = checkInputs();

    function saveNote() {
        props.sendNote(note, props.user);
        setNote(emptyNote);
        setEditorState(EditorState.createEmpty());

    }

    function handleChange(editorState) {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(
            rawContentState,
        );
        setNote(prevState => ({...prevState, text: markup}));
    }

    return (
        <div>
            <div className="addNote">
                <Tooltip label="Create a new note!">
                    <AddIcon color="white" cursor={"pointer"} onClick={onOpen}/>
                </Tooltip>
                <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>New note</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Text paddingBottom="10px" paddingTop="10px" fontSize='lg'>Title:</Text>
                            <Input
                                value={note.title}
                                onChange={(event) => {
                                    setNote(prevState => ({...prevState, title: event.target.value}))
                                }}
                            />
                            <Text paddingBottom="10px" paddingTop="10px" fontSize='lg'>Text:</Text>
                            <Editor toolbar={{options: ['fontSize', 'fontFamily', 'list', 'textAlign'],}}
                                    editorState={editorState}
                                    onEditorStateChange={editorState => {
                                        setEditorState(editorState);
                                        handleChange(editorState);
                                    }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                disabled={warning}
                                colorScheme="gray"
                                mr={3}
                                onClick={() => {
                                    saveNote();
                                    onClose();
                                }}
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )

}

