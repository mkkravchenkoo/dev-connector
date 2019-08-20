const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const {check, validationResult}  = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../../models/User')


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
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}

		const {name, email, password} = req.body;

		try {
			// check if user exist
			let user = await User.findOne({email: email});
			if(user){
				return res.status(400).json({errors:[{msg: 'User already exist!!!'}]})
			}

			//get user gravatar
			const avatar = gravatar.url(email,{s:200,r:'pg',d:'mm'});

			user = new User({
				name,
				email,
				avatar,
				password
			});

			//encrypt password

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);


			await user.save();

			// return jwt

			const payload = {
				user:{
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{expiresIn: 360000},
				(err, token) => {
					if(err) throw err;
					res.json({token})
				}
			)

		}catch (e) {
			console.error(e.message);
			res.status(500).send('Server error')
		}
	});

module.exports = router