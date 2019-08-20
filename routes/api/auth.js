const express = require('express')

const router = express.Router();
const User = require('../../models/User')
const auth = require('../../middleware/auth');

const {check, validationResult}  = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route GET 	api/auth
// @desc Test 	route
// @access 		Public
router.get('/', auth, async (req, res) => {

	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	}catch (e) {
		res.status(500).send('Server error');
	}

});

// @route POST 	api/auth
// @desc Test 	Authenticate user & get token
// @access 		Public
router.post(
	'/',
	[
		check('email', 'Email is not valid!!!').isEmail(),
		check('password', 'Password is required!!!').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}

		const {email, password} = req.body;

		try {
			// check if user exist
			let user = await User.findOne({email: email});
			if(!user){
				return res
					.status(400)
					.json({errors:[{msg: 'Invalid credentials!!!'}]})
			}


			const isMatch = await bcrypt.compare(password, user.password);

			if(!isMatch){
				return res
					.status(400)
					.json({errors:[{msg: 'Invalid credentials!!!'}]})
			}

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