const mongoose = require('mongoose')
const Customer = require('../models/customer')
const sellerMsgSchema = require('../schemas/sellermsg')

const SellerMsg = mongoose.model('SellerMsg',sellerMsgSchema)

module.exports = SellerMsg