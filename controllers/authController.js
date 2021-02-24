const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password, gender } = req.body;
			let newUsername = username.toLowerCase().replace(/ /g, '');

			const user_name = await Users.findOne({ username: newUsername });
			if (user_name) return res.status(400).json({ msg: 'This username already exist' });

			const user_email = await Users.findOne({ email });
			if (user_email) return res.status(400).json({ msg: 'This email already exist' });

			if (password.length < 6) return res.status(400).json({ msg: 'Password must 6 characters' });

			const hashPassword = await bcrypt.hash(password, 12);

			const newUser = new Users({ fullname, username: newUsername, email, password: hashPassword, gender });

			const access_token = createAccessToken({ id: newUser._id });
			const refresh_token = createRefreshToken({ id: newUser._id });

			res.cookie('refreshToken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 days to expires
			});

			await newUser.save();

			res.json({
				msg: 'Register Success!',
				access_token,
				user: {
					...newUser._doc,
					password,
				},
			});
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await Users.findOne({ email }).populate('followers following', '-password');

			if (!user) return res.status(400).json({ msg: 'This email does not exist.' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect.' });

			const access_token = createAccessToken({ id: user._id });
			const refresh_token = createRefreshToken({ id: user._id });

			res.cookie('refreshToken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 days to expires
			});

			res.json({
				msg: 'Login Success!',
				access_token,
				user: {
					...user._doc,
					password,
				},
			});
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},

	logout: async (req, res) => {
		try {
			res.clearCookie('refreshToken', { path: '/api/refresh_token' });
			return res.json({ msg: 'Logout success!' });
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},

	generateAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshToken;
			if (!rf_token) return res.status(400).json({ msg: 'Please login now.' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (error, result) => {
				if (error) return res.status(400).json({ msg: 'Please login now.' });

				const user = await Users.findById(result.id).select('-password').populate('followers following', '-password');

				if (!user) return res.status(400).json({ msg: 'This does not exist.' });

				const access_token = createAccessToken({ id: result.id });

				res.json({ access_token, user });
			});
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
};

const createAccessToken = (paylaod) => {
	return jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

const createRefreshToken = (paylaod) => {
	return jwt.sign(paylaod, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

module.exports = authController;
