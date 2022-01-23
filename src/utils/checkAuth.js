const jwt = require('jsonwebtoken');
const db = require('../db');

const checkAuth = async (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers.token;

	if (!token) {
		res.status(403).send('No token was provided');
		return;
	}

	try {
		let { user_id } = await jwt.verify(token, process.env.JWT_SECRET);
		if (!user_id) {
			res.sendStatus(403);
			return;
		}

		let queryResult = await db.query(`select * from Users where user_id=$1`, [
			user_id,
		]);
		let user = queryResult.rows[0];

		if (!user) {
			res.sendStatus(403);
			return;
		} else {
			res.locals.user_id = user_id;
			next();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { checkAuth };
