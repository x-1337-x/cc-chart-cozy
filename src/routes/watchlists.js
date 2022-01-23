const express = require('express');
const db = require('../db');
const checkAuth = require('../utils/checkAuth');
const watchlistRouter = express.Router();

watchlistRouter.use(checkAuth);

watchlistRouter.route('/watchlist').get(async (req, res, next) => {
	try {
		let queryResult = await db.query(
			`select * from watchlists where user_id = $1`,
			[res.locals.user_id]
		);
		let votes = queryResult.rows;
		res.json(votes);
		return;
	} catch (error) {
		next(error);
	}
});

watchlistRouter
	.route('/watchlist/:coin_id')
	.post(async (req, res, next) => {
		try {
			let queryResult = await db.query(
				`insert into watchlists ("user_id", "coin_id") values ($1, $2) returning user_id, coin_id`,
				[res.locals.user_id, req.params.coin_id]
			);
			res.send(queryResult.rows);
		} catch (error) {
			next(error);
		}
	})
	.delete(async (req, res, next) => {
		try {
			let queryResult = await db.query(
				`delete from watchlists where user_id=$1 and coin_id=$2 returning user_id, coin_id`,
				[res.locals.user_id, req.params.coin_id]
			);
			res.send(queryResult.rows);
		} catch (error) {
			next(error);
		}
	});

module.exports = watchlistRouter;
