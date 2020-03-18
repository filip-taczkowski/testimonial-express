const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) =>{
  res.json(db.concerts.filter( concert => concert.id == req.params.id ));
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts.map(concert => {
    if ( concert.id == req.params.id ) {
      concert.performer = req.body.performer;
      concert.genre = req.body.genre;
      concert.price = req.body.price;
      concert.day = req.body.day;
      concert.image = req.body.image;
    };
  });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.map((concert, index) => {
    if ( concert.id == req.params.id ) {
      db.concerts.splice(index, 1);
    }
  })
  res.json({ message: 'OK' });
});

module.exports = router;