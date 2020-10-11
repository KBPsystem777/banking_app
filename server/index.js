const express = require("express")
const cors = require("cors")
const authRoute = require("./routes/auth")
require("dotenv").config()
require("events").EventEmitter.defaultMaxListeners = 15

const app = express()
const PORT = process.env.PORT || 1993

app.use(express.json())
app.use(cors())
app.use(authRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
