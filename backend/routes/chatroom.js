const router = require("express").Router();
const { catchErrors } = require("../errorhandlers/errorhandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get("/",auth,catchErrors(chatroomController.getAllChatrooms))
router.post("/", auth, catchErrors(chatroomController.createChatroom));

module.exports = router;