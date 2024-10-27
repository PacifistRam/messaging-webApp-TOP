const { Router } = require ("express")

const authRouter = Router()
const authController = require("../controllers/authController")

const { authenticateToken } = require("../middleware/jwtAuth")

authRouter.post("/log-in", authController.postLogin)

authRouter.get("/verify-user", authenticateToken, authController.getVerifyUser)

authRouter.post("/create-account", authController.postCreateAccount)















module.exports = authRouter