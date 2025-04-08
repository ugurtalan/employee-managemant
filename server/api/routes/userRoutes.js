const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);
router.post('/records', userController.userRecords);
router.post('/records/add',userController.userRecordsAdd);
router.get('/records/analyze',userController.userAnalyze);
module.exports = router;
