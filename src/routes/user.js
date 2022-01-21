const exress = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const userRouter = exress.Router();

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

userRouter.get('/getUsers', async (req, res, next) => {
	try {
		let users = await db.query(`select * from Users`);
		res.send(users);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;
