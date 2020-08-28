const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route           POST /register
// @description     Register User
// @access          Public
router.post(
	'/',
	async (req, res) => {

		const { email, password } = req.body;

		try {
			// Check if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists.' });
			}

			user = new User({
				email,
				password
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt); // hash password

			await user.save(); // save user to db

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;