const { Router } = require ("express")
const tempRouter = Router()
const tempController = require("../controllers/tempController")

const {authenticateToken } = require("../middleware/jwtAuth")
 
tempRouter.get("/", tempController.getAllUsers)
tempRouter.get("/users-msgs", authenticateToken,tempController.getAllUsersMsgs)

tempRouter.get("/conversation", tempController.getConversationUsers)

tempRouter.get("/msgs-user", tempController.getAllMsgsOfUserId)

// get all users conversed with current user
tempRouter.get("/allConvo-user", tempController.getAllConversedUserForUserId)






module.exports = tempRouter