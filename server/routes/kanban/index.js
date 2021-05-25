const express = require('express');
const router = express.Router();
const protected = require('../../middleware/auth');
const cardRouter = require('./card');

router.use(protected);

router.use('/card', cardRouter);

module.exports = router;
