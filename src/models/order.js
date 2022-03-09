const mongoose = require('mongoose')
const orderSchema = require('../schemas/order')

orderSchema.set('toJSON',{virtuals:true})
orderSchema.set('toObject',{virtuals:true})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order