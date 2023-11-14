const express = require('express');
const router = express.Router();
const mealtypeController = require('../Controllers/mealtypeController');

router.get('/getAllMealtypes', mealtypeController.getAllMealtypes);

module.exports = router;