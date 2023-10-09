const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

//router.get();

router.post('/', usersController.add);

// router.delete();

// router.put();

module.exports = router;