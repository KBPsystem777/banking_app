const jwt = require("jsonwebtoken")
const { pool } = require("../db/connect")
const { query } = require("express")

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorozation").split(" ")[1]
    const decode = jwt.verify(token, process.env.secret)
    const result = await pool.query(
      "select b.userid, b.first_name, b.last_name,b.email, t.access_token from bank_user b inner join tokens t on b.userid=t.userid where t.access_token=$1 and t.userid=$2",
      [token, decode.userid]
    )
    const user = result.rows[0]
    if (user) {
      req.user = user
      req.token = token
      next()
    } else {
      throw new Error("Error while authentication")
    }
  } catch (error) {
    res.status(400).send({
      auth_error: "Authentication failed",
    })
  }
}

module.exports = authMiddleware
