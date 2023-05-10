import {Request, Response} from "express";
import {Note} from "../models/NoteModel";
import {HTTP_STATUSES} from "../index";


const getNotes = ( async (req: Request, res: Response) => {
    const notes = await Note.find({userId: req.query.userId})
    res.send(notes);
})

const createNote = ( async (req: Request, res: Response) => {
    console.log(req.body)
    const note = new Note({
        _id:  req.body._id,
        userId: req.body.userId,
        completed: req.body.completed,
        date: req.body.date,
        normalDate: req.body.normalDate ,
        text: req.body.text,
        time: req.body.time,
        title: req.body.title
    })
    await note.save();
    res.status(HTTP_STATUSES.CREATED_201);

})

const deleteNote = ( async (req: Request, res: Response) => {
    await Note.deleteOne({_id : req.body.noteId})
    res.status(HTTP_STATUSES.OK_200)
})

const deleteNotes = ( async (req: Request, res: Response) => {
    await Note.deleteMany({userId: req.body.userId})
    res.status(HTTP_STATUSES.NO_CONTENT_204).send({title: "notes are deleted"})
})

const updateNote = ( async (req: Request, res: Response) => {
    const note = await Note.findById(req.body.noteId)
    console.log(note)
    const filter = { _id: req.body.noteId };
    let status = !note.completed
    const update = { completed: status };
    let updatedNote = await Note.findOneAndUpdate(filter, update);
    updatedNote = await Note.findById(req.body.noteId)
    console.log(updatedNote)
})

module.exports = {
    getNotes,
    createNote,
    deleteNote,
    deleteNotes,
    updateNote
}