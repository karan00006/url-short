const express = require('express');
const { generateURLid, redirect } = require('../controllers/url');
const router = express.Router();

router.post('/', generateURLid);

router.get('/:shortid', redirect);

module.exports = router;