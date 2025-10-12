const express = require("express");
const { placedOrderController } = require("../controller/ModelController");
const router = express.Router();
router.post("/placeorder", placedOrderController);
module.exports = router;