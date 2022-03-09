const mongoose = require('mongoose')
const customerMsgSchema = require('../schemas/customermsg')

const CustomerMsg = mongoose.model('CustomerMsg',customerMsgSchema)

module.exports = CustomerMsg