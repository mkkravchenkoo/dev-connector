const express = require('express');
const {check, validationResult}  = require('express-validator');

const router = express.Router();


// @route POST 	api/users
// @desc Test 	Register user
// @access 		Public
router.post(
	'/',
	[
		check('name', 'Name is required!!!').not().isEmpty(),
		check('email', 'Email is not valid!!!').isEmail(),
		check('password', 'Please enter password with 6 or more password!!!').isLength({min: 6}),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}
		res.send('user route')
	});

module.exports = router