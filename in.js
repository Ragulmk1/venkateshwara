const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feedback', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });
  newContact.save()
    .then(() => {
      console.log('Form submitted successfully');
      res.send('Form submitted successfully');
    })
    .catch(err => {
      console.error('Error submitting form:', err);
      res.status(500).send('Error submitting form');
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
