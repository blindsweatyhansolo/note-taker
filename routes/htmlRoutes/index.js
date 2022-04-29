// dependencies
const path = require('path');
// because 'app' is declared for use in server.js, we use router instead
const router = require('express').Router();

// GET route for index.html, '/' points to homepage (root page)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// GET route for notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// GET route for wildcards (any path that doesn't exist, defaults to homepage)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// export router module
module.exports = router;