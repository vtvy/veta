const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const userController = require("../controllers/userController");

//Search User
router.get("/search/:name", verifyToken, userController.search);

//Follow
router.put("/follow", verifyToken, userController.follow);

//Get user information
router.get("/profile/:id", verifyToken, userController.getUserInformationByID);

module.exports = router;
