const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

/* Middlewares*/
app.use(express.static(path.join(__dirname + '/public')));

/* DB */
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

/* Endpoints */
app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) =>{
  res.json(db.filter( client => client.id == req.params.id ));
});


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});