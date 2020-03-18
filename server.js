const express = require('express');
const path = require('path');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();

/* Middlewares*/
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});