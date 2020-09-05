const express = require('express');
const router = express.Router();
let Card = require('../../models/Card');
let Company = require('../../models/Company');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /card
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const card = await Card.find(query);

		res.send(card);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

router.get('/alloc', auth, async (req, res) => {
	try {
		
		// console.log(req.user);
		const user = await User.findById(req.user.id).select('-password');

		let myTasks = [];
		let cards = await Card.find({}, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				result.map((card) => {
					card.cardTasks.map((task) => {
						if (task.allocatedTo == user.email) {
							const task2 = {
								task,
								alocat:true
							}
							myTasks.push(task2);
						}
					});
				});
			};
		});
		res.send(myTasks);
		
		// console.log('card', cards);
	} catch (error) {
		console.log(error);
	}
});

// @route           GET /card/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const card = await Card.findById(id);

		if (card.userId !== req.user.id) {
			console.log('not allowed to delete this card');
		}

		res.json(card);
	} catch (error) {
		res.status(400).send('Error getting the card.');
	}
});

// @route           POST /card
// @description     Add card
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let card = await new Card(req.body);
		card.userId = req.user.id;
		card.save();
		console.log(req.body);
		console.log(card);

		res.status(200).json({ card: 'Added new card successfully!' });
	} catch (error) {
		res.status(400).send('Adding new card failed.');
	}
});

// @route           DELETE /card/:id
// @description     Delete card
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const card = await Card.findOne({ _id: id, userId });

		if (card.userId !== userId) {
			console.log('not allowed to delete this card');
		}

		const cards = await Card.findByIdAndRemove({ _id: id });
		res.send(card);
	} catch (error) {
		res.status(400).send('Error deleting card.');
	}
});

// @route           POST /card/:id
// @description     Update card task
router.post('/:id', auth, async (req, res) => {
	console.log(req.body);
	try {
		let card = await Card.findById(req.params.id);

		if (card.userId !== req.user.id) {
			console.log('not allowed to update this card');
		}

		if (!card) res.status(404).send('No card to update.');

		card.card = req.body.card;
		card.cardTasks = req.body.cardTasks;

		await card.save();
		res.json('card updated successfully.');
	} catch (error) {
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;
