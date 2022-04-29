// SERVER.JS used to initialize server creation
// dependencies
const express = require('express');

// assigning express() to app allows for chaining of methods
const app = express();

// initial PORT variable, using Heroku's environment variable OR our local 3001
const PORT = process.env.PORT || 3001;

// middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ensure that all files in 'public' are readily available
app.use(express.static('public'));

// point to route files

// listen method for requests to server
app.listen(PORT, () => {
    // confirmation console.log
    console.log(`Server now listening on ${PORT}`);
});