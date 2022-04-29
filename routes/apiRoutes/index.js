// dependencies
const path = require('path');
const fs = require('fs');
// because 'app' is declared for use in server.js, we use router instead
const router = require('express').Router();
// npm package for generating unique ids using UNIQID
const uniqid = require('uniqid');
let notes = require('../../db/db');


// GET request for reading saved notes as JSON
// omit /api since it is declared in the middleware from server.js
router.get('/notes', (req, res) => {
    res.json(notes);
});

// POST request for saving new note to req.body, add to db.json, and return new note to client


// export router module
module.exports = router;