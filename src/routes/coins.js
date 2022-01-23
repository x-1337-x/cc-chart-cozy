const express = require('express');
const db = require('../db');
const coinsRouter = express.Router();

coinsRouter
	.route('/coins')
	.get(async (req, res, next) => {
		try {
			let queryResult = await db.query(`select * from Coins`);
			let coins = queryResult.rows;
			res.json(coins);
			return;
		} catch (error) {
			next(error);
		}
	})
	.post(async (req, res, next) => {
		try {
			let { name, symbol, description } = req.body;
			let queryResult = await db.query(
				`insert into coins ("name", "symbol", "description") values ($1, $2, $3) returning *`,
				[name, symbol, description]
			);
			let coin = queryResult.rows[0];
			res.send(coin);
		} catch (error) {
			next(error);
		}
	});

coinsRouter
	.route('/coins/:id')
	.get(async (req, res, next) => {
		try {
			let queryResult = await db.query(`select * from Coins where coin_id=$1`, [
				req.params.id,
			]);
			let coin = queryResult.rows[0];
			console.log(queryResult);
			res.json(coin);
			return;
		} catch (error) {
			next(error);
		}
	})
	.put(async (req, res, next) => {
		try {
			let id = req.params.id;
			let { name, symbol, description } = req.body;
			let queryResult = await db.query(
				`update coins set name=$1, symbol=$2, description=$3 where coin_id = $4`,
				[name, symbol, description, id]
			);
			res.send(queryResult);
			return;
		} catch (error) {
			next(error);
		}
	})
	.delete(async (req, res, next) => {
		try {
			let id = req.params.id;
			let queryResult = await db.query(`delete from Coins where coin_id = $1`, [
				id,
			]);
			console.log(queryResult);
			res.send(queryResult);
			return;
		} catch (error) {
			next(error);
		}
	});

module.exports = coinsRouter;
