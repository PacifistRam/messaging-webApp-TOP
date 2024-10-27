const { Router } = require ("express")

const msgRouter = Router()
const {authenticateToken } = require("../middleware/jwtAuth")

const msgController = require("../controllers/msgController")

// create message
msgRouter.post("/create-msg", authenticateToken, msgController.createMessage)

// get conversation
msgRouter.get("/conversation/:receiverId", authenticateToken,  msgController.getConversation)

// get all Conversed users for user
msgRouter.get("/conversation-list", authenticateToken, msgController.getAllConversedUserForUserId)

// get all users
msgRouter.get("/all-users", authenticateToken, msgController.getUsers)




module.exports = msgRouter