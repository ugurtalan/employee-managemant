const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/login', adminController.adminLogin); // admin login post route'ı
router.get('/workers',adminController.adminWorkers);
router.post('/register',adminController.adminRegister);
module.exports = router;