const express = require("express")
require('dotenv').config()
const app = express();
const cors = require("cors")

const authRouter = require("./routes/authRoutes")
// const tempRouter = require("./routes/tempRoutes")
const msgRouter = require("./routes/msgRoutes")

app.use(cors())

app.use(express.json())


app.use("/auth", authRouter)
// app.use("/temp", tempRouter)  
app.use("/msg", msgRouter)  


const PORT = process.env.PORT || 5000

app.listen(PORT, () => `Sever started On Port: ${PORT}` );