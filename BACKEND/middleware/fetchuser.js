const jwt = require('jsonwebtoken');
require("dotenv").config();

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(404).send({ error: "Invalid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(400).send({ error: "Invalid token" });
    }
}

module.exports = fetchuser;