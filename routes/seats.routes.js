const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) =>{
  res.json(db.seats.filter( seat => seat.id == req.params.id ));
});

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  db.seats.map(seat => {
    if ( seat.id == req.params.id ) {
      seat.day = req.body.day;
      seat.seat = req.body.seat;
      seat.client = req.body.client;
      seat.email = req.body.email;
    };
  });
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.map((seat, index) => {
    if ( seat.id == req.params.id ) {
      db.seats.splice(index, 1);
    }
  })
  res.json({ message: 'OK' });
});

module.exports = router;