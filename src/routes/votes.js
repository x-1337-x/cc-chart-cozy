const express = require('express');
const db = require('../db');
const checkAuth = require('../utils/checkAuth');
const votesRouter = express.Router();

votesRouter.use(checkAuth);

votesRouter.route('/votes').get(async (req, res, next) => {
	try {
		let queryResult = await db.query(`select * from votes where user_id = $1`, [
			res.locals.user_id,
		]);
		let votes = queryResult.rows;
		res.json(votes);
		return;
	} catch (error) {
		next(error);
	}
});

votesRouter.route('/votes/:coin_id').post(async (req, res, next) => {
	try {
		let queryResult = await db.query(
			`insert into votes ("user_id", "coin_id", "date") values ($1, $2, $3) returning user_id, coin_id, date`,
			[res.locals.user_id, req.params.coin_id, new Date()]
		);
		res.send(queryResult.rows);
	} catch (error) {
		next(error);
	}
});

module.exports = votesRouter;
