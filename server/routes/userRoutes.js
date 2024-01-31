const { register, login, setAvatar } = require("../controller/userController.js");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("setavatar", setAvatar);
module.exports = router;
