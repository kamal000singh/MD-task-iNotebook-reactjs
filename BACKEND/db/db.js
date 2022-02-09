const mongoose = require('mongoose');
require('dotenv').config();

const dbconn = `mongodb+srv://MDtask:${process.env.MONGODB_PASSWORD}@cluster0.z7ney.mongodb.net/iNotebook?retryWrites=true&w=majority`

const conn = mongoose.connect(dbconn)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));



module.exports = conn;