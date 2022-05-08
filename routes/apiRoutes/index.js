// dependencies
// because 'app' is declared for use in server.js, we use router instead
const router = require('express').Router();
const express = require('express');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const path = require('path');
const fs = require('fs');
// npm package for generating unique ids using UNIQID
const uniqid = require('uniqid');
const notes = require('../../db/db.json');


// GET request for reading saved notes as JSON
// omit /api since it is declared in the middleware from server.js
router.get('/notes', (req, res) => {
    console.log(`${req.method} request received to read notes`);
    // fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         let notes = data;
    //     }
    // });
    res.json(notes);
});

// POST request for saving new note to req.body, add to db.json, and return new note to client
router.post('/notes', (req, res) => {
    console.log(`${req.method} request received to add new note.`);
    
    const note = req.body;
    
    let newNote = {
        title: note.title,
        text: note.text,
        id: uniqid()
    };
    
    // parse new note data
    // res.json(newNote);
    // push new note to notes array (db.json)
    // notes.push(newNote);

    // obtain existing notes before writing new file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // convert to json object
            const parsedNotes = JSON.parse(data);

            // push new note to array
            parsedNotes.push(newNote);

            // write updated notes back to file
            fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(parsedNotes, null, 2), (writeErr) => {
                    writeErr ? console.log(writeErr) : console.log('Notes successfully updated.');
                    return res.json(parsedNotes);
                }
            );
        };
    });
});

// DELETE request to remove note with id


// export router module
module.exports = router;