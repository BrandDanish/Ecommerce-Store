const express = require("express");
const {MessageController} = require("../controller/ContactController");
const router = express.Router();
router.post("/contact", MessageController);
module.exports = router;
