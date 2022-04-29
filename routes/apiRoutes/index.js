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
let notes = require('../../db/db.json');


// GET request for reading saved notes as JSON
// omit /api since it is declared in the middleware from server.js
router.get('/notes', (req, res) => {
    res.json(notes);
});

// POST request for saving new note to req.body, add to db.json, and return new note to client
router.post('/notes', (req, res) => {
    
    const note = req.body;
    
    let newNote = {
        title: note.title,
        text: note.text,
        id: uniqid()
    };
    
    // parse new note data
    res.json(newNote);
    
    console.log(notes);

    // push new note to notes array (db.json)
    notes.push(newNote);

    
    // fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes), (err, data) => {
    //     if (err) {
    //         console.log('ERROR');
    //     }
    //     return res.json(notes);
    // });

    console.log(notes);

});

// export router module
module.exports = router;