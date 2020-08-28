const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const fs = require('fs');
const sgMail = require('@sendgrid/mail');

// connect db
connectDB();

// apply middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: false }));
app.use(express.static('public')); //to access the files in public folder

// routes
app.use('/auth', require('./routes/api/auth'));
app.use('/register', require('./routes/api/register'));
app.use('/profile', require('./routes/api/profile'));
app.use('/card', require('./routes/api/card'));
// app.use('/company', require('./routes/api/company'));


app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server running on port', PORT);
});
