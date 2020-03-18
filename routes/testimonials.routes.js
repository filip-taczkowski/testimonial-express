const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.length)]);
});

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) =>{
  res.json(db.filter( client => client.id == req.params.id ));
});

router.route('/testimonials').post((req, res) => {
  const newClient = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.push(newClient);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  db.map(client => {
    if ( client.id == req.params.id ) {
      client.author = req.body.author;
      client.text = req.body.text;
    };
  });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  db.map((client, index) => {
    if ( client.id == req.params.id ) {
      db.splice(index, 1);
    }
  })
  res.json({ message: 'OK' });
});

module.exports = router;