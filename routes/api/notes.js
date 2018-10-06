const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Note model
const Note = require("../../models/Note");

// Validation
const validateNoteInput = require("../../validation/note");

// @route   GET api/notes/test
// @desc    Tests notes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Notes Works" }));

// @route   GET api/notes/all
// @desc    Get all notes
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find()
      .sort({ date: -1 })
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json({ nonotesfound: "No notes found" }));
  }
);

// @route   GET api/notes
// @desc    Get only logged in user notes
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(notes => {
        let empty;
        isEmpty(notes)
          ? res.json({ empty: true, error: "No notes found" })
          : res.json({ empty: false, notes: notes });
      })
      .catch(err => res.status(404).json({ nonotesfound: "No notes found" }));
  }
);

// @route   GET api/notes/:id
// @desc    Get notes by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => res.json(note))
      .catch(err =>
        res.status(404).json({ nonotefound: "No note found with that ID" })
      );
  }
);

// @route   POST api/notes
// @desc    Create note
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const noteFields = {};
    noteFields.user = req.user.id;
    noteFields.text = req.body.text;
    if (req.body.title) noteFields.title = req.body.title;
    if (typeof req.body.tags !== "undefined") {
      noteFields.tags = req.body.tags.split(",");
    }

    new Note(noteFields).save().then(note => res.json(note));
  }
);

// @route   PUT api/notes/:id
// @desc    Edit note
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const noteFields = {};
    if (req.body.text) noteFields.text = req.body.text;
    if (req.body.title) noteFields.title = req.body.title;
    if (typeof req.body.tags !== "undefined") {
      noteFields.tags = req.body.tags.split(",");
    }

    Note.findOneAndUpdate(
      { _id: req.params.id },
      { $set: noteFields },
      { new: true }
    ).then(note => res.json(note));
  }
);

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        // Check for note owner
        if (note.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        note.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ notenotfound: "No note found" }));
  }
);

module.exports = router;
