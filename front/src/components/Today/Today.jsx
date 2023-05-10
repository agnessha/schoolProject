import React, { useEffect } from "react";
import "../../App.css";
import { connect } from "react-redux";
import { month, today} from "../../jsDate/date";
import { ArrowDownIcon } from "@chakra-ui/icons";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {
    Flex,
    Spacer,
    Tooltip,
    Box,
} from "@chakra-ui/react";
import Note from "./Notes/Notes";
import {TodayDelete} from "./TodayDelete";
import {
    getNotesThunkCreator,
    sendNoteThunkCreator,
    deleteNotesThunkCreator,
    deleteNoteThunkCreator,
    updateNoteThunkCreator
} from "../../redux/NotesReducer";
import {EditorComponent} from "./Editor/Editor";
import {createUser} from "../../services/api";




const Today = (props) => {

    useEffect(() => {
        console.log(props)
        props.getNotes(props.user)
    }, []);

    function deleteNote(currentId) {
        props.deleteNote(props.user, currentId);
    }

    function deleteAllNotes() {
        props.deleteNotes(props.user, props.notes);
    }
    function updateNote(noteId) {
        props.updateNote(noteId, props.user.id);
    }



    return (
        <div className={"today" + " " + "big"}>
            <Box>
                <div className="todayInner">
                    <div className="todayInnerHeader">
                        <Flex>
                            <div className="todayInnerDate">
                                <span className="todayBold">Today</span>
                                {today} {month}
                            </div>
                            <Spacer/>
                            <Tooltip label="Delete all notes!">
                                <TodayDelete deleteNotes={deleteAllNotes}/>
                            </Tooltip>
                            <EditorComponent user={props.user} sendNote={props.sendNote}/>
                        </Flex>
                    </div>
                    <div className="todayInnerNotes">
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{350: 1, 500: 2, 900: 2}}
                        >
                            <Masonry gutter="15px">
                                {props.notes.map((n) => {
                                    return (
                                        <Note
                                            note={n}
                                            deleteNote={deleteNote}
                                            updateNote={updateNote}
                                        />
                                    );
                                })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                </div>
            </Box>
        </div>
    );
};

let mapStateToProps = (state) => {

    return {
        notes: state.notes.notes,
        user: state.user.user
    };
};
let mapDispatchToProps = (dispatch) => {
    return {

        getNotes: (user) => {dispatch(getNotesThunkCreator(user))},
        sendNote: (note, user) => {dispatch(sendNoteThunkCreator(note, user))},
        deleteNotes: (user, notes) => {dispatch(deleteNotesThunkCreator(user, notes))},
        deleteNote: (user, note) => {dispatch(deleteNoteThunkCreator(user, note))},
        updateNote: (noteId, userId) => {dispatch(updateNoteThunkCreator(noteId, userId))}
    }

}

const TodayCon = connect(mapStateToProps, mapDispatchToProps)(Today);

export default TodayCon;