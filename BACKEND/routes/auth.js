const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/', [
    body('name', "Name character length must be greater than 5").isLength({ min: 5 }),
    body('email', "Enter valid email address").isEmail(),
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).catch(err =>
            res.json({ errors: "Email address must be unique", message: err.message }))
    })


module.exports = router;