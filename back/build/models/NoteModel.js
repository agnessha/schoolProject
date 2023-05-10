"use strict";
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var schema = new Schema({
    id: String,
    completed: Boolean,
    date: String,
    normalDate: String,
    text: String,
    time: Number,
    title: String
});
module.exports = model('Note', schema);
