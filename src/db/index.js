const { Pool } = require('pg');
const DBconfig = {
	ssl: {
		rejectUnauthorized: false,
	},
};

const pool = new Pool(DBconfig);

module.exports = {
	query: (text, params) => pool.query(text, params),
};
