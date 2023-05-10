import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3003/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': "*",

    }
});






function loginWithGoogle(token) {

    return instance.post('auth/login', {
        token
    }, {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        params: {token: token}
    });
}

async function sendNote(note, userId) {
    try {
        const response = await instance.post('notes' , {
            userId: userId,
            title: note.title,
            _id: note.id,
            text: note.text,
            date: note.date,
            normalDate: note.normalDate,
            completed: note.completed,
            color: note.color,
            time: Date.now()
        });
    } catch (error) {
        console.log(error);
    }
}

async function getNotes(userId) {
    let notes;
    try {
        const response = await instance.get('notes', { params: { userId: userId } });
        notes = response.data.sort((a, b) => b.time - a.time);
    } catch (error) {
        console.log(error);
    }
    if (!notes) {
        return [];
    }
    return notes;

}

async function deleteNotes(userId, notes) {
    try {
        await instance.post('notes/deleteNotes', { userId: userId })
    } catch (e) {
        console.log(e)
    }
    return []
}

async function deleteNote(userId, noteId) {
    try {
        await instance.post('notes/deleteNote', {
            noteId: noteId
        })
    } catch (e) {
        console.log(e)
    }
}

async function updateNote(noteId) {
    try {
        await instance.post('notes/updateNote', {
            noteId: noteId
        })
    } catch (e) {
        console.log(e)
    }
}



export { loginWithGoogle, sendNote, getNotes, deleteNotes, deleteNote, updateNote};