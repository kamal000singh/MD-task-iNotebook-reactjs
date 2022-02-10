const express = require('express');
const cors = require('cors')
const app = express();
const conn = require('./db/db');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/note", require("./routes/note"));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})