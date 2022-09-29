require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const connectDB = require("./db/connectDB")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const accountRouter = require("./routes/accountRouter")

const authRouter = require("./routes/authRouter")

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api", accountRouter)

try {
  connectDB()
  app.listen(port,() => console.log(`Server is listening to port ${port}`))
} catch (err) {
  console.log(err)
}

