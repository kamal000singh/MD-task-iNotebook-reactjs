const express = require('express');
const app = express();
const conn = require('./db/db');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})