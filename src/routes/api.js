const express = require('express');
const userRouter = require('./user');
const coinsRouter = require('./coins');
const apiRouter = express.Router();

apiRouter.use('/api', userRouter);
apiRouter.use('/api', coinsRouter);

module.exports = apiRouter;
