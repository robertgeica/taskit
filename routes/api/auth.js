const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');

// @route           GET /auth
// @description     Test route
// @access          Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route           POST /auth
// @description     Authenticate user & get token
// @access          Public
router.post(
	'/',
	async (req, res) => {
		
		const { email, password } = req.body;

		try {
			// Check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}

			// Match password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}

			// Return JWT
			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;