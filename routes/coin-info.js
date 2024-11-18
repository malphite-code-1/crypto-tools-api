const express = require('express');
const coinInfoRouter = express.Router();
const coinInfoController = require('../controllers/coin-info');

coinInfoRouter.get('/:id', coinInfoController.getInfo);
coinInfoRouter.post('/', coinInfoController.getInfos);

module.exports = coinInfoRouter;