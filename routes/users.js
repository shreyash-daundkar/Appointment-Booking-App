const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.display);

router.post('/', usersController.add);

router.delete('/:id', usersController.delete);

// router.put();

module.exports = router;