import React from 'react'
import '../../../App.css'
import {month, today} from "../../../jsDate/date";
import {DeleteIcon} from '@chakra-ui/icons'
import {
    Spacer,
    Box,
    Badge,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Checkbox,
    Flex,
    Container} from "@chakra-ui/react";
import DOMPurify from "dompurify";




function Note(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='notes' onClick={onOpen}>
        <Box  borderWidth='1px' borderColor='#7B1D9A' borderRadius='lg' overflow='hidden' >
            <Box p='6' bg='#ffffff'>
                <Box display='flex' alignItems='baseline'>
                    <Badge
                        backgroundColor='#7B1D9A'
                        color="white"
                        borderRadius='full' mr='2' px='2' display={today + ' ' + month === props.note.date ? 'flex' : 'none'} >
                        {today + ' ' + month === props.note.date ? 'Today' : ''}
                    </Badge>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                    >
                        {props.note.date}
                    </Box>
                    <Spacer />
                    <Box>

                            <Checkbox
                                size='md'
                                padding='7px 10px'
                                colorScheme='pink'
                                isChecked={props.note.completed}
                                defaultChecked={props.note.completed}
                                onClick={() => {

                                }}
                                onChange={() => {
                                    onClose()
                                    props.updateNote(props.note._id);
                            }}/>

                        <Modal isOpen={isOpen} onClose={onClose} >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton />
                                <ModalHeader>
                                    <Flex>
                                    <Badge borderRadius='full' mr='2' px='2'
                                           display={today + ' ' + month === props.note.date ? 'flex' : 'none'}
                                           backgroundColor='#7B1D9A'
                                            color="white"
                                    >
                                        {today + ' ' + month === props.note.date ? 'Today' : ''}
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                    >
                                        {props.note.date }
                                    </Box>
                                    </Flex>
                                </ModalHeader>

                                <ModalBody margin='0 0 0 10px' paddingTop='0'>
                                    <Text textAlgin='center ' fontSize="18px" paddingBottom="20px" as='b'>
                                        {props.note.title}
                                    </Text>
                                    <Box
                                        dangerouslySetInnerHTML={createMarkup(props.note.text)}
                                        margin='10px 0 10px 0'>
                                    </Box>

                                    <Box margin='5px 0 5px' cursor='pointer' onClick={() => {
                                        props.deleteNote(props.note._id)
                                        onClose();
                                    }}>
                                        <Flex>
                                            <DeleteIcon margin='auto 5px auto 0' w={4} h={4} color="gray.500"/>
                                            <Text color='gray.500'
                                                  fontWeight='semibold'
                                                  letterSpacing='wide'>
                                                Delete this note
                                            </Text>
                                        </Flex>
                                    </Box>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Box>

                <Container paddingTop='15px'>
                    <Box>
                        {props.note.title}
                    </Box>
                    <Box dangerouslySetInnerHTML={createMarkup(props.note.text)} >
                    </Box>
                    <Spacer />
                </Container>
            </Box>
        </Box>
        </div>
    )
}


export default Note;