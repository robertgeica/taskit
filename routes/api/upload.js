const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');

const fs = require('fs');

// file upload api
router.post('/', (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' });
	}
	// accessing the file
	const myFile = req.files.file;
	//  mv() method places the file inside public directory
	myFile.mv(`${process.cwd()}/public/${myFile.name}`, function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({ msg: 'Error occured' });
		}
		// returing the response with file path and name
		return res.send({ name: myFile.name, path: `/${myFile.name}` });
	});
});

router.get('/', (req, res) => {
	let myFiles = [];

	fs.readdir('public', (err, files) => {
		// console.log('all files', files);
	
		files.forEach((file) => {
			const newObj = {
				name: file,
				path: `/${file}`
			};
			myFiles.push(newObj);
		});

		if (err) {
			console.log('err is', err);
			return res.status(500).send({ msg: 'error getting files' });
		} else {
			return res.send(myFiles);
		}
	});

	// console.log(myFiles);
});

module.exports = router;
