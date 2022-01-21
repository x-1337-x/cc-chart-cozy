const express = require('express');
require('dotenv').config();
const cors = require('cors');
const apiRouter = require('./routes/api');

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/', apiRouter);

server.get('/', (req, res) => {
	res.sendStatus(200);
});

server.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
