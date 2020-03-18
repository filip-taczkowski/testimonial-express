const express = require('express');
const path = require('path');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();

/* Middlewares*/
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* Endpoints */
app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) =>{
  res.json(db.filter( client => client.id == req.params.id ));
});

app.post('/testimonials', (req, res) => {
  const newClient = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.push(newClient);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  db.map(client => {
    if ( client.id == req.params.id ) {
      client.author = req.body.author;
      client.text = req.body.text;
    };
  });
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db.map((client, index) => {
    if ( client.id == req.params.id ) {
      db.splice(index, 1);
    }
  })
  res.json({ message: 'OK' });
})

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});