const exress = require('express');
const db = require('../db');
const userRouter = exress.Router();

userRouter.post('/register', (req, res, next) => {
	try {
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
