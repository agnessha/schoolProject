const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
    userId: String,
    _id: String,
    completed: Boolean,
    date: String,
    normalDate: String,
    text: String,
    time: Number,
    title: String
})



export const Note = model('Note', noteSchema);
