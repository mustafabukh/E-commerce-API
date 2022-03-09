const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    customer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    products:[{
        type:mongoose.SchemaTypes.ObjectId
    }],
    state:{
        type:String,
        required:true,
        default:'received'
    },
    cost:{
        type:String,
        required:true,
        default:0
    }

})

module.exports = productSchema