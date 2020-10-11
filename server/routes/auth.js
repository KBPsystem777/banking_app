const express = require("express")
const bcrypt = require("bcryptjs")
const { pool } = require("../db/connect")
const {
  validateUser,
  isInvalidField,
  generateAuthToken,
} = require("../utils/common")
const authMiddleware = require("../middleware/auth")

const Router = express.Router()

Router.post("/signqup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body
    const validFieldsToUpdate = ["first_name", "last_name", "email", "password"]
    const receivedFields = Object.keys(req.body)
    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    )
    if (isInvalidFieldProvided) {
      return res.status(400).send({
        signup_error: "Invalid Field",
      })
    }
    const result = await pool.query(
      `select count (*) as count from bank_user where email=$1`,
      [email]
    )
    const count = result.rows[0].count
    if (count > 0) {
      return res.status(400).send({
        signup_error: "User with this email address already exists",
      })
    }
    const hashedPassword = await bcrypt.hash(password, 8)
    await pool.query(
      `insert into bank_user(first_name, last_name, email, password
   ) values($1, $2, $3, $4)`,
      [first_name, last_name, email, hashedPassword]
    )
    res.status(201).send()
  } catch (error) {
    res.status(400).send({
      signup_error: "Error while signing up. Please try again",
    })
  }
})

Router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await validateUser(email, password)
    if (!user) {
      res.status(400).send({
        signin_error: "Email and password doesnt matches",
      })
    }
    const token = await generateAuthToken(user)
    const result = await pool.query(
      "insert into token(access_token, userid) values($1, $2) returning *",
      [token, user.userid]
    )
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: "Error while signing in, try again",
      })
    }
    user.token = result.rows[0].access_token
    res.send(user)
  } catch (error) {
    res.status(400).send({
      signin_error: `Email/password doens't matches`,
    })
  }
})

Router.post("/logout", authMiddleware, async (req, res) => {
  try {
    const { userid, access_token } = req.user
    await pool.query("delete from tokens where userid=$1 and access_token=$2", [
      userid,
      access_token,
    ])
    res.send()
  } catch (err) {
    res.status(400).send({
      logout_error: "Error while logging out. Please try again",
    })
  }
})
