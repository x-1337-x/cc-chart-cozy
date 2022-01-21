const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
	try {
		let { email, password, repeatPassword } = req.body;

		if (!email || !password || !repeatPassword || password !== repeatPassword) {
			res.sendStatus(403).send('Check your data');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.query(`insert into Users(email, password) values($1, $2)`, [
			email,
			hashedPassword,
		]);

		res.send('User has been added');
		return;
	} catch (error) {
		next(error);
	}
});

userRouter.post('/login', async (req, res, next) => {
	try {
		let { email, password } = req.body;

		if (!email || !password) {
			res.sendStatus(403).send('Check your data');
			return;
		}

		const queryResult = await db.query(`select * from users where email=$1`, [
			email,
		]);
		const user = queryResult.rows[0];

		if (!user) {
			res.sendStatus(403).send('Check your data');
			return;
		}

		const match = await bcrypt.compare(password, user.password);

		if (match) {
			const token = jwt.sign(
				{ user_id: user.user_id },
				process.env.JWT_SECRET,
				{ expiresIn: '6h' }
			);

			res.json({ token });
			return;
		} else {
			res.sendStatus(403).send('Check your data');
			return;
		}
	} catch (error) {
		next(error);
	}
});

// userRouter.get('/getUsers', async (req, res, next) => {
// 	try {
// 		let users = await db.query(`select * from Users`);
// 		res.send(users);
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = userRouter;
