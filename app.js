const express = require("express")
const productRouter = require("./routers/productRouter")
const app = express()
app.use(express.json())
app.use(productRouter)
module.exports = app