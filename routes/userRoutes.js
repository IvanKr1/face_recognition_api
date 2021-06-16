const express = require('express');
const router = express.Router(); 
const User = require("../controllers/userController")

router.get("/users", User.getAllUsers)
router.post("/register", User.registerUser)
router.get("/profile/:id", User.getSingleUser)
router.put("/image", User.updateEntries)

module.exports = router