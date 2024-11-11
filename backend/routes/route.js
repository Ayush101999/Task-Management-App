const express = require("express");
const router = express.Router();
const Note = require("../models/notesSchema");
const { body, validationResult } = require("express-validator");
let success = "true";

/* fetch all notes/tasks from the database */
router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
});

/* Add a new note/task to the database */
router.post("/addnote", async (req, res) => {
  const { title, status, desc, date, priority } = req.body;
  let exists = await Note.findOne({ title: req.body.title });
  if (exists) {
    return res
      .status(400)
      .json({ success: "error", errors: "Task Already Exists" });
  }
  /* create a tasks/notes using req.body details */
  try {
    let note = await Note.create({
      title: title,
      status: status,
      desc: desc,
      date: date,
      priority: priority,
    });
    res.send(note);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
});

/* Update a note/task in the database */
router.put("/updatenote/:id", async (req, res) => {
  const { title, status, desc, date, priority } = req.body;
  /* create a new note object */
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (status) {
      newNote.status = status;
    }
    if (desc) {
      newNote.desc = desc;
    }
    if (date) {
      newNote.date = date;
    }
    if (priority) {
      newNote.priority = priority;
    }

    /* find the note which needs to be update */

    let note = await Note.findById(req.params.id);
    console.log(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }

    /* everthing is fine lets update the note */
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
});

/* Delete a note/task from the database */
router.delete("/deletenote/:id", async (req, res) => {
  /* find the note which needs to be delete */
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }

    /* everthing is fine lets delete the note */
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Sucessfully deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;