const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');


notes.get('/', (req, res) =>
  readFromFile('./db.json').then((data) => res.json(JSON.parse(data)))
);


notes.post('/', (req, res) => {
 
  const { title, text } = req.body;


  if (title && text) {
  
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting ');
  }
});

module.exports = notes;
