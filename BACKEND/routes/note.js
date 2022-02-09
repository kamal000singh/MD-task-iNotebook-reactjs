const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        if (!notes) {
            res.status(404);
        }
        res.json(notes);
    } catch (error) {
        res.status(error.status || 500).json({ errorMessage: "Internal server error" })
    }
})

router.post('/addnote', fetchuser, [
    body('title', "title character length must be greater than 3").isLength({ min: 3 }),
    body('description', "description must be at least 5 characters").isLength({ min: 5 }),],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Note({ title, description, tag, user: req.user.id });
            const saveNote = await note.save();
            res.json(saveNote)
        } catch (error) {
            res.status(error.status || 500).json({ errorMessage: "Internal server error" })
        }
    })

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const updateNote = {};
        if (title) { updateNote.title = title }
        if (description) { updateNote.description = description }
        if (tag) { updateNote.tag = tag }
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(404).send("Token Invalid") }
        saveNote = await Note.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
        res.json(saveNote)
    } catch (error) {
        res.status(error.status || 500).json({ errorMessage: "Internal server error" })
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(404).send("Token Invalid") }
        saveNote = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Delete node successfully' })
    } catch (error) {
        res.status(error.status || 500).json({ errorMessage: "Internal server error" })
    }
})
module.exports = router;