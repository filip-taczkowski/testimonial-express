const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

/* Middlewares*/
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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