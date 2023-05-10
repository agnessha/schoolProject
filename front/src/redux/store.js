import {applyMiddleware, combineReducers, createStore} from 'redux'
import notesReducer from "./NotesReducer";
import thunk  from 'redux-thunk'
import userReducer from "./UserReducer";


let reducers = combineReducers({
    notes: notesReducer,
    user: userReducer,
})

let store = createStore(reducers , applyMiddleware(thunk))

window.store = store

export default store;