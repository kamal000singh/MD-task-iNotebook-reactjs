const mongoose = require('mongoose');
const conn = require('../db/db');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    tag: {
        type: 'string',
        required: true,
        default: 'General',
    },
    date: {
        type: 'date',
        default: Date.now,
    }
})


module.exports = mongoose.model("note", NotesSchema);