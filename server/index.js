const express = require("express")
const cors = require("cors")
const authRoute = require("./routes/auth")
const profileRoute = require("./routes/profile")
require("dotenv").config()
// require("events").EventEmitter.defaultMaxListeners = 15

const app = express()
const PORT = process.env.PORT || 1993

app.use(express.json())
app.use(cors())
app.use(authRoute)
app.use(profileRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
