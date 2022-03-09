const express = require('express')
const sellerRouter = require('./routers/seller')
const customerRouter = require('./routers/customer')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')

const app = express()

require('./db/mongoose')

app.use(express.json())

app.use(customerRouter)
app.use(sellerRouter)
app.use(productRouter)
app.use(orderRouter)

module.exports = app