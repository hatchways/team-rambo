const express = require('express');
const { getCard } = require('../../controllers/kanban/card');
const router = express.Router();

router.get('/:cardId', getCard);

module.exports = router;
