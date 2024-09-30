const { Router } = require ("express")

const authRouter = Router()
const authController = require("../controllers/authController")

authRouter.post("/log-in", authController.postLogin)

authRouter.post("/create-account", authController.postCreateAccount)















module.exports = authRouter