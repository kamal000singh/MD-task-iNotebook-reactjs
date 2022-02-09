const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.post('/login', [
    body('email', "Enter valid email address").isEmail(),
    body('password', "password cannot be blank").exists(),],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "Please try to login with valid Credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with valid Credentials" });
            }
            else {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
                res.json({ jwtToken })
            }
        } catch (error) {
            res.status(error.status || 500).json({ errorStatus: error.status, errorMessage: "Internal server error" })
        }
    })

router.post('/fetchuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(error.status || 500).json({ errorStatus: error.status, errorMessage: "Internal server error" })
    }
})

router.post('/createuser', [
    body('name', "Name character length must be greater than 5").isLength({ min: 5 }),
    body('email', "Enter valid email address").isEmail(),
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errorMessage: "Sorry this email id already exist in the database." });
            }
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })
            res.json({ user })
        } catch (error) {
            res.status(error.status || 500).json({ errorMessage: "Some error occurred" })
        }
    })


module.exports = router;