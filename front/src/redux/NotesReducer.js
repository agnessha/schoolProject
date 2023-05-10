import {deleteNotes, getNotes, sendNote, deleteNote, updateNote} from "../services/api";

let defaultState = {
    notes: []
}

const notesReducer = (state=defaultState , action) => {
    switch (action.type) {
        case "ADD_NOTES": {
            return {
                ...state,
                notes: action.notes,
            };
        }
        case "ADD_NOTE": {
            return {
                ...state,
                notes: [action.note, ...state.notes],
            };
        }
        case "DELETE_NOTE": {
            let newNotes = state.notes.filter(n => action.noteId !== n._id)
            return {
                ...state,
                notes: newNotes
            }
        }
        case "UPDATE_NOTE": {

            let updatedNoteInd = state.notes.findIndex((n => n._id === action.noteId))
            debugger
            state.notes[updatedNoteInd].completed = !state.notes[updatedNoteInd].completed
            debugger
            return {
                ...state,
            }
        }
        default:
            return {
                ...state
            }
    }
}

const addNotes = (notes) => {
    return {
        type: 'ADD_NOTES',
        notes: notes
    }
}
const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        note: note
    }
}
const deleteStateNote = (noteId) => {
    return {
        type: 'DELETE_NOTE',
        noteId: noteId
    }
}
const updateNoteLocal = (noteId) => {
    return {
        type: 'UPDATE_NOTE',
        noteId: noteId
    }
}


export const getNotesThunkCreator = (user) => (dispatch) => {
    getNotes(user.id).then((result) => {
        dispatch(addNotes(result))
    })
}
export const sendNoteThunkCreator = (note, user) => (dispatch) => {
    sendNote(note, user.id).then(dispatch(addNote(note)))


}
export const deleteNotesThunkCreator = (user, notes) => (dispatch) => {
    deleteNotes(user.id, notes).then((result) => {
        dispatch(addNotes(result))
    })
}
export const deleteNoteThunkCreator = (user, noteId) => (dispatch) => {
    deleteNote(user.id, noteId).then(dispatch(deleteStateNote(noteId)))

}
export const updateNoteThunkCreator = (noteId, userId) => (dispatch) => {
    debugger
    updateNote(noteId).then(dispatch(updateNoteLocal(noteId)))
}


export default notesReducer;