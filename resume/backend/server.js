require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./schemas/Userschema');

const app = express();
const port = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Define your routes and middleware here...
app.get('/users', (req, res) => {
	User.find()
	  .then((users) => {
		 res.json(users);
	  })
	  .catch((error) => {
		 console.log('Error:', error);
		 res.status(500).json({ message: 'Error getting users' });
	  });
 });

 app.post('/users/new', (req, res) => {
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	 });
	 
	 // Save the user to the database
	 newUser.save()
	 .then(() => {
      console.log('User saved to database');
      res.status(200).send('User saved to database');
    })
		.catch((err) => console.log(err));
});

