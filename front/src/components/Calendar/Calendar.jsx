import React, { useState, useEffect } from "react";
import '../../App.css'
import {connect} from "react-redux";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Flex, Badge, Box,

} from '@chakra-ui/react'
import {getNotesThunkCreator} from "../../redux/NotesReducer";
import {month, today} from "../../jsDate/date";
import DOMPurify from "dompurify";


function CalendarComponent(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        props.getNotes(props.user)
    },[])

    const [event, setEvent] = useState({
        title: '',
        text: '',
        data: ''
    })

    const createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }
    }


    return (
        <div className="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: ''
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                themeSystem="Simplex"
                slotMinWidth='40px'
                eventClick={
                    function(arg){
                        onOpen();
                        setEvent({
                            title: arg.event.title,
                            text: arg.event.extendedProps.text,
                            data: arg.event.extendedProps.screenDate
                        })

                    }
                }
                events={Array.isArray(props.notes) ? props.notes.map((n) => {
                    return {title: n.title,text: n.text, date: n.normalDate, screenDate: n.date}
                }) : {title: 'dsdsdsd', date: '2022-04-02'}}

            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex>
                            <Badge borderRadius='full' mr='2' px='2'
                                   display={today + ' ' + month === event.data ? 'flex' : 'none'}
                                   backgroundColor='#7B1D9A'
                                   color="white"
                            >
                                {today + ' ' + month === event.data ? 'Today' : ''}
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                            >
                                {event.data}
                            </Box>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin="0 0 30px">
                        <Box>
                            {event.title}
                        </Box>
                        <Box dangerouslySetInnerHTML={createMarkup(event.text)} >

                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )

}


let mapStateToProps = (state) => {
    return {
        notes: state.notes.notes,
        user: state.user.user
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getNotes: (user) => {dispatch(getNotesThunkCreator(user))},
    }

}
const CalendarCon = connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)

export default CalendarCon;