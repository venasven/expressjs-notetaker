const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/', (req, res) =>
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve notes' });
    })
);

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json')
      .then(() => {
        const response = {
          status: 'success',
          body: newNote,
        };
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to save note' });
      });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});
module.exports = notes;