const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const userController = require("../controllers/userController");

//Search User
router.get("/search/:name", verifyToken, userController.search);

//Follow
router.put("/follow", verifyToken, userController.follow);

module.exports = router;
