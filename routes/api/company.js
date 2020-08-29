const express = require('express');
const router = express.Router();
let Company = require('../../models/Company');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /company
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const company = await Company.find(query);

		res.send(company);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /company/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const company = await Company.findById(id);

		if (company.userId !== req.user.id) {
			console.log('not allowed to view this company');
		}

		res.json(company);
	} catch (error) {
		res.status(400).send('Error getting the company.');
	}
});

// @route           POST /company
// @description     Add company
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let company = await new Company(req.body);
		company.userId = req.user.id;
		company.save();
		console.log(company);

		res.status(200).json({ company: 'Added new company successfully!' });
	} catch (error) {
		res.status(400).send('Adding new company failed.');
	}
});

// @route           DELETE /company/:id
// @description     Delete company
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const company = await Company.findOne({ _id: id, userId });

		if (company.userId !== userId) {
			console.log('not allowed to delete this company');
		}

		await Company.findByIdAndRemove({ _id: id });
		res.send(company);
	} catch (error) {
		res.status(400).send('Error deleting company.');
	}
});

// @route           POST /company/:id
// @description     Update card task
router.post('/:id', auth, async (req, res) => {
	try {
		let company = await Company.findById(req.params.id);
		if (company.userId !== req.user.id) {
			console.log('not allowed to update this company');
		}

		if (!company) res.status(404).send('No company to update.');

		company.companyName = req.body.companyName;
    company.adress = req.body.adress;
		company.departaments = req.body.departaments;
    company.labelStatus = req.body.labelStatus;

		await company.save();
		res.json('card updated successfully.');
	} catch (error) {
		res.status(400).send('Error editing the week.');
	}
});


router.get('/:id/find', async (req, res) => {

	let user = await User.find({}, (err, result) => {
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	}).select('-password');
})


module.exports = router;