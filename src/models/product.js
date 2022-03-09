const mongoose = require('mongoose')
const productSchema = require('../schemas/product')

productSchema.set('toJSON',{virtuals:true})
productSchema.set('toObject',{virtuals:true})


const Product = mongoose.model('Product',productSchema)

module.exports = Product