const express = require('express');
const router = express.Router();
const { getCard } = require('../../controllers/kanban/card');

router.get('/:cardId', getCard);

module.exports = router;
