const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = mongoose.model('User');

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = new User({ email, password });
		await user.save();

		const token = jwt.sign({ userId: user._id }, 'secret123');
		res.send({ token });
	} catch (error) {
		return res.status(422).send(error.message);
	};
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: 'must provide email and password' });
	};

	const user = User.findOne({ email });

	if (!user) {
		return res.status(404).send({ message: "Email not found" });
	};

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'secret123');
		res.send({ token });
	} catch (error) {
		return res.status(422).send({ message: "Invalid PassWord or email" });
	};
})

module.exports = router;