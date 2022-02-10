const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const auth = require('../middleware/auth');

router.post("/addStaff",staffController.addstaff);
router.post("/login",staffController.login);

router.put("/:id",auth,staffController.updateStaff);

module.exports = router;