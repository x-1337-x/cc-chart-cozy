const express = require('express');
const userRouter = require('./user');
const coinsRouter = require('./coins');
const votesRouter = require('./votes');
const watchlistRouter = require('./watchlists');
const apiRouter = express.Router();

apiRouter.use('/api', userRouter);
apiRouter.use('/api', coinsRouter);
apiRouter.use('/api', votesRouter);
apiRouter.use('/api', watchlistRouter);

module.exports = apiRouter;
