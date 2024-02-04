const { addMsg, getMsg } = require("../controller/messageController");


const router = require("express").Router();

router.post("/addmsg/", addMsg);
router.post("/getmsg/", getMsg);



module.exports = router;