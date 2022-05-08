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
    // confirmation log
    console.log(`${req.method} request received to read notes.`);

    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json(notes);
    });
});

// POST request for saving new note to req.body, add to db.json, and return new note to client
router.post('/notes', (req, res) => {
    // confirmation log
    console.log(`${req.method} request received to add new note.`);
    
    // new note object, uses uniqid() to create random id
    let newNote = {
        title: note.title,
        text: note.text,
        id: uniqid()
    };
    
    // push new note to notes array (db.json)
    notes.push(newNote);

    // stringify notes in array, set as variable
    const stringNote = JSON.stringify(notes);
    // res.json(notes);

    // add stringified note to db.json using writeFile
    fs.writeFile(path.join(__dirname, '../../db/db.json'), stringNote, (err) => {
        if (err) {
            console.log(err)
        } else {
            // confirmation log
            console.log(`New note successfully saved.`);
            return res.json(notes);
        }
    });
});

// // DELETE request to remove note with id
// router.delete('/notes/:id', (req, res) => {
//     // confirmation log
//     console.log(`${req.method} request received to delete note.`);

//     // grab id from request, save as new variable
//     let noteId = req.params.id;

//     // read the current db.json file to compare grabbed id against saved notes ids, then re-write file without deleted note
//     fs.readFile(path.join('../../db/db.json'), 'utf-8', (err, data) => {
//         // save parsed data from db.json as variable
//         let updatedNotes = JSON.parse(data).filter((note) => {
//             // return note ids that don't match noteId from request
//             return note.id !== noteId;
//         });
//         notes = updatedNotes;

//         // stringify notes in updatedNotes array, set as variable
//         const stringNote = JSON.stringify(updatedNotes);

//         // add updated stringified notes to db.json using writeFile
//         fs.writeFile(path.join(__dirname, '../../db/db.json'), stringNote, (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 // confirmation log
//                 console.log(`Note successfully deleted.`)
//             }
//         });
//         res.json(stringNote);
//     });
// });

router.delete("/notes/:id", (req, res) => {
    let noteID = req.params.id;
    fs.readFile("db/db.json", "utf8", function (err, data) {
      let updatedNotes = JSON.parse(data).filter((note) => {
        console.log("note.id", note.id);
        console.log("noteID", noteID);
        return note.id !== noteID;
      });
      notes = updatedNotes;
      const stringifyNote = JSON.stringify(updatedNotes);
      fs.writeFile("db/db.json", stringifyNote, (err) => {
        if (err) console.log(err);
        else {
          console.log("Note successfully deleted from db.json");
        }
      });
      res.json(stringifyNote);
    });
  });


// export router module
module.exports = router;