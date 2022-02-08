const mongoose = require('mongoose');
const conn = require('../db/db');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    date: {
        type: 'date',
        default: Date.now,
    }
})
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;