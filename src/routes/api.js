const express = require('express');
const userRouter = require('./user');
const apiRouter = express.Router();

apiRouter.use('/api', userRouter);

module.exports = apiRouter;
