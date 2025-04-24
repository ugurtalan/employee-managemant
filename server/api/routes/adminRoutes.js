const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/login', adminController.adminLogin); 
router.get('/workers',adminController.adminWorkers);
router.post('/register',adminController.adminRegister);
router.post('/assignments',adminController.adminAssignTable);
router.post('/assignments/add',adminController.adminAddAssign);
router.post('/assignments/delete',adminController.adminDeleteAssign);
module.exports = router;